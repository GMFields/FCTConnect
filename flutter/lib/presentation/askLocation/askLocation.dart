import 'dart:convert';

import 'package:discipulos_flutter/presentation/askLocation/Answered.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class AskLocationApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _AskLocationAppState();
  }
}

Future<List<String>> getAskedLocations() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }
  print("token: " + token);
  final tokenObj = jsonDecode(token);
  final username = tokenObj['username'];

  final url = Uri.parse(
    'http://helical-ascent-385614.oa.r.appspot.com/rest/aasklocation/getAsk/',
  ).replace(
    queryParameters: {
      'tokenObj': token,
      'username': username,
    },
  );
  print("url: " + url.toString());

  final response = await http.get(url);

  if (response.statusCode == 200) {
    List<dynamic> responseBody = jsonDecode(response.body);
    List<String> stringList = List<String>.from(responseBody);
    return stringList;
  } else {
    throw Exception('Failed to fetch asked locations');
  }
}

class _AskLocationAppState extends State<AskLocationApp> {
  Map<String, String> locationRequests = {};

  @override
  void initState() {
    super.initState();
    fetchLocationRequests();
  }

  Future<void> fetchLocationRequests() async {
    try {
      List<String> fetchedLocationRequests = await getAskedLocations();
      setState(() {
        locationRequests = Map.fromIterable(
          fetchedLocationRequests,
          key: (request) => request,
          value: (_) => '',
        );
      });
    } catch (error) {
      // Handle the error appropriately, e.g., show an error message
      print('Error fetching location requests: $error');
    }
  }

  void showPopup(String username, String locationRequest) {
    TextEditingController textFieldController = TextEditingController();
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Pedido de localização'),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(height: 16),
              TextField(
                controller: textFieldController,
                onChanged: (value) {
                  setState(() {
                    locationRequests[locationRequest] = value;
                  });
                },
                decoration: InputDecoration(
                  labelText: 'Onde estás?',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                sendLocation(username, locationRequests[locationRequest]!);
                locationRequests.remove(username);
                setState(() {});

                // Remove the request from locationRequests
                //print("existe? " + locationRequests[locationRequest]!);
                //locationRequests.remove(locationRequest);

                //print("existe? " + locationRequests[locationRequest]!);
                // Close the dialog
                Navigator.of(context).pop();
              },
              child: Text('Enviar'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    TextEditingController textFieldController = TextEditingController();
    return Scaffold(
      appBar: AppBar(
        title: Text('Pedidos de localização'),
        actions: [
          IconButton(
            icon: Icon(Icons.add),
            onPressed: () {
              showDialog(
                context: context,
                builder: (BuildContext context) {
                  return AlertDialog(
                    title: Text('Pedir localização'),
                    content: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        SizedBox(height: 16),
                        TextField(
                          controller: textFieldController,
                          decoration: InputDecoration(
                            labelText: 'username',
                            border: OutlineInputBorder(),
                          ),
                        ),
                      ],
                    ),
                    actions: [
                      TextButton(
                        onPressed: () {
                          // Perform an action when the "Add" button is pressed
                          // For example, add a new location request
                          String username = textFieldController.text;
                          askLocation(username);
                          // Close the dialog
                          Navigator.of(context).pop();
                        },
                        child: Text('Pedir'),
                      ),
                    ],
                  );
                },
              );

              // Perform an action when the button is pressed
              // For example, show a dialog or navigate to another screen
            },
          ),
          IconButton(
            icon: Icon(Icons.swap_calls),
            onPressed: () {
              Navigator.pop(context);
              Navigator.of(context).push(MaterialPageRoute(
                  builder: ((context) => AnsweredLocationApp())));
              // Perform an action when the button is pressed
              // For example, refresh the location requests
              // ...
            },
          )
        ],
      ),
      body: ListView(
        children: locationRequests.keys.map((locationRequest) {
          return ListTile(
            title: Text(locationRequest),
            onTap: () {
              showPopup(locationRequest, locationRequests[locationRequest]!);
            },
          );
        }).toList(),
      ),
    );
  }

  Future<void> sendLocation(String username, String location) async {
    print("olaaaaaa");
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
      'http://helical-ascent-385614.oa.r.appspot.com/rest/aasklocation/answer/',
    ).replace(
      queryParameters: {
        'tokenObj': token,
        'username': username,
      },
    );

    final headers = {
      'Content-Type': 'application/json',
    };

    final bodyEvent = jsonEncode({
      'answer': location,
    });

    final response = await http.post(url, headers: headers, body: bodyEvent);
  }

  Future<void> askLocation(String username) async {
    print("olaaaaaa");
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
      'http://helical-ascent-385614.oa.r.appspot.com/rest/aasklocation/ask/',
    ).replace(
      queryParameters: {
        'tokenObj': token,
        'username': username,
      },
    );

    final response = await http.post(url);
  }
}

void main() {
  runApp(AskLocationApp());
}

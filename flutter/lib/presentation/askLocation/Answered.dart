import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import 'askLocation.dart';

class AnsweredLocationApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _AnsweredLocationAppState();
  }
}

Future<Map<String, String>> getAnsweredLocations() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }
  print("token: " + token);
  final tokenObj = jsonDecode(token);
  final username = tokenObj['username'];

  final url = Uri.parse(
    'http://helical-ascent-385614.oa.r.appspot.com/rest/aasklocation/getAnswer/',
  ).replace(
    queryParameters: {
      'tokenObj': token,
      'username': username,
    },
  );
  print("url: " + url.toString());

  final response = await http.get(url);

  if (response.statusCode == 200) {
    Map<String, dynamic> responseBody = jsonDecode(response.body);
    Map<String, String> modifiedResponse = {};
    var loc;
    var user;
    responseBody.forEach((key, value) {
      if (key == 'location') {
        loc = value;
        // Add "location" to the value and store it
        //modifiedResponse['location'] = '$value';
      } else {
        user = key;
        // Add the non-location value to the key as is
        //modifiedResponse[key] = value.toString();
      }
      modifiedResponse[user] = loc.toString();
    });

    return modifiedResponse;
  } else {
    throw Exception('Failed to fetch asked locations');
  }
}

class _AnsweredLocationAppState extends State<AnsweredLocationApp> {
  Map<String, String> locationRequests = {};
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

  @override
  void initState() {
    super.initState();
    fetchLocationRequests();
  }

  Future<void> fetchLocationRequests() async {
    try {
      locationRequests = await getAnsweredLocations();
      setState(() {});
    } catch (error) {
      // Handle the error appropriately, e.g., show an error message
      print('Error fetching location requests: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    TextEditingController textFieldController = TextEditingController();
    return Scaffold(
      appBar: AppBar(
        backgroundColor: kPrimaryColor,
        title: const Text('Pedidos respondidos'),
        actions: [
          IconButton(
            icon: const Icon(Icons.swap_calls),
            onPressed: () {
              Navigator.pop(context);
              Navigator.of(context).push(
                  MaterialPageRoute(builder: ((context) => AskLocationApp())));
              // ...
            },
          )
        ],
      ),
      body: ListView(
        children: locationRequests.keys.map((locationRequest) {
          final location = locationRequests[locationRequest];
          return ListTile(
            title: Text(
                'A resposta ao pedido de localização feita a $locationRequest é: $location',
                style: const TextStyle(
                    fontSize: 20,
                    fontFamily: 'Roboto',
                    fontWeight: FontWeight.bold)),
          );
        }).toList(),
      ),
    );
  }
}

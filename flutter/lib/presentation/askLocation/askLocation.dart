import 'dart:convert';

import 'package:discipulos_flutter/presentation/askLocation/User.dart';
import 'package:flutter/material.dart';

import '../../constants/constants.dart';
import '../anomaly/anomaly.dart';
import '../anomaly/new_anomaly.dart';
import '../welcome/widgets/navigation_drawer.dart';
import 'package:http/http.dart' as http;

class AskLocationApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _AskLocationAppState();
  }
}

late List<dynamic> users;

Future<void> getUsers() async {
  /*final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }
    */
  final response = await http.get(Uri.parse(
      "https://helical-ascent-385614.oa.r.appspot.com/rest/anomaly/list") /*.replace(queryParameters: {'tokenObj': token})*/);

  if (response.statusCode == 200) {
    final List<dynamic> anomalyList = jsonDecode(response.body);
    users = anomalyList.map((json) {
      return User(
        user_name: json['user_name'],
        user_email: json['user_email'],
        user_state: json['user_state'],
      );
    }).toList();
  } else {
    throw Exception('Failed to fetch anomalies');
  }
}

class _AskLocationAppState extends State<AskLocationApp> {
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
        future: getUsers(),
        builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator(); // Display a loading indicator while waiting for the response
          } else if (snapshot.hasError) {
            return Text(
                'Error: ${snapshot.error}'); // Handle any errors that occurred during the request
          } else {
            return Scaffold(
              drawer: const CustomNavigationDrawer(),
              appBar: AppBar(
                title: const Text(
                  'Notify',
                  style: TextStyle(
                    color: Color.fromARGB(255, 0, 0, 0),
                    fontSize: 20,
                    fontFamily: 'RobotoSlab',
                  ),
                ),
                backgroundColor: const Color.fromARGB(255, 237, 237, 237),
                iconTheme: const IconThemeData(color: Colors.black),
              ),
              body: Column(
                children: [
                  Expanded(
                    child: ListView.separated(
                      itemCount: users.length,
                      separatorBuilder: (context, index) => const Divider(),
                      itemBuilder: (context, index) {
                        final anomaly = users[index];
                        final solvedText = anomaly.isSolved ? 'Sim' : 'Não';
                        final textStyle = TextStyle(
                          fontSize: 16.0,
                          fontWeight: FontWeight.bold,
                          color: anomaly.isSolved ? Colors.green : Colors.red,
                        );

                        return GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) =>
                                    AnomalyDetailPage(anomaly: anomaly),
                              ),
                            );
                          },
                          child: Container(
                            padding: const EdgeInsets.all(16.0),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(8.0),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black.withOpacity(0.1),
                                  blurRadius: 3.0,
                                  offset: const Offset(0, 2),
                                ),
                              ],
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  'Autor: ${anomaly.creator}',
                                  style: const TextStyle(
                                    fontSize: 18.0,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                const SizedBox(height: 8.0),
                                Row(
                                  children: [
                                    const Text(
                                      'Resolvido? ',
                                      style: TextStyle(
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    Text(
                                      solvedText,
                                      style: textStyle,
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(16.0),
                    child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => AddAnomalyPage()),
                        );
                      },
                      style: ElevatedButton.styleFrom(
                        backgroundColor: const Color.fromARGB(255, 255, 196, 0),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(30.0),
                        ),
                      ),
                      child: Text('Adicionar anomalia', style: kLabelStyle),
                    ),
                  ),
                ],
              ),
            );
          }
        });
  }
}

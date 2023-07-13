import 'package:discipulos_flutter/presentation/askLocation/askLocation.dart';
import 'package:flutter/material.dart';

import '../../application/auth.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
        future: Authentication.fetchAuthenticateGAE(
            "jose.couve@gmail.com", "Password123!"),
        builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator(); // Display a loading indicator while waiting for the response
          } else if (snapshot.hasError) {
            return Text(
                'Error: ${snapshot.error}'); // Handle any errors that occurred during the request
          } else {
            return MaterialApp(
              title: 'Flutter Demo',
              debugShowCheckedModeBanner: false,
              theme: ThemeData(
                  primaryColor: const Color.fromARGB(255, 43, 89, 196),
                  fontFamily: 'Montserratcd'),
              home: AskLocationApp(),
            );
          }
        });
  }
}

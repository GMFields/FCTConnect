import 'package:discipulos_flutter/presentation/askLocation/askLocation.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
          primaryColor: const Color.fromARGB(255, 43, 89, 196),
          fontFamily: 'Montserratcd'),
      home: AskLocationApp(),
    );
  }
}

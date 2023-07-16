import 'package:flutter/material.dart';

const kHintTextStyle = TextStyle(
  color: Colors.black26,
  fontFamily: 'RobotoSlab',

);

const kLabelStyle = TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.bold,
  fontFamily: 'RobotoSlab',
);  

final kBoxDecorationStyle = BoxDecoration(
  color:  Color.fromARGB(190, 215, 214, 235),
  borderRadius: BorderRadius.circular(10.0),
  boxShadow: const [
    BoxShadow(
      color: Colors.black12,
      blurRadius: 6.0,
      offset: Offset(0, 2),
    ),
  ],
);

const titleTextStyle = TextStyle(
  color: Colors.black,
  fontSize: 10.0,
  fontWeight: FontWeight.bold,
  fontFamily: 'RobotoSlab',
);
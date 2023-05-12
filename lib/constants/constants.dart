import 'package:flutter/material.dart';

final kHintTextStyle = const TextStyle(
  color: Colors.black26,
  fontFamily: 'RobotoSlab',
);

final kLabelStyle = const TextStyle(
  color: Colors.black,
  fontWeight: FontWeight.bold,
  fontFamily: 'RobotoSlab',
);  

final kBoxDecorationStyle = BoxDecoration(
  color: Colors.white,
  borderRadius: BorderRadius.circular(10.0),
  boxShadow: [
    const BoxShadow(
      color: Colors.black12,
      blurRadius: 6.0,
      offset: Offset(0, 2),
    ),
  ],
);
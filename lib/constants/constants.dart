import 'package:flutter/material.dart';

final kHintTextStyle = const TextStyle(
  color: Colors.white54,
  fontFamily: 'RobotoSlab',
);

final kLabelStyle = const TextStyle(
  color: Colors.white,
  fontWeight: FontWeight.bold,
  fontFamily: 'RobotoSlab',
);  

final kBoxDecorationStyle = BoxDecoration(
  color: Color.lerp(
    const Color(0xFFBBE1FA),
    const Color(0xFF3282B8),
    0.4),
  borderRadius: BorderRadius.circular(10.0),
  boxShadow: [
    const BoxShadow(
      color: Colors.black12,
      blurRadius: 6.0,
      offset: Offset(0, 2),
    ),
  ],
);
import 'package:discipulos_flutter/presentation/login/login_page.dart';
import 'package:path/path.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter/material.dart';
import 'dart:convert';



class TokenExpirationObserver extends RouteObserver<PageRoute<dynamic>> {
  Map<String, dynamic>? token;


Future<Map<String, dynamic>?> getTokenFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? tokenString = prefs.getString('token');
    if (tokenString != null) {
      return jsonDecode(tokenString);
    }
    return null;
  }


  @override
  void didPush(Route<dynamic> route, Route<dynamic>? previousRoute) {
    super.didPush(route, previousRoute);
    _checkTokenExpiration();
  }

  void _checkTokenExpiration() {
    if (isTokenExpired()) {
      redirectToLogin();
    }
  }

bool isTokenExpired() {
  final int expirationTimestamp = token?['token_expirationdata'];
  final DateTime expirationTime =
      DateTime.fromMillisecondsSinceEpoch(expirationTimestamp);
  final DateTime currentTime = DateTime.now();

  return expirationTime.isBefore(currentTime);
}


  void redirectToLogin() {
    Navigator.pushReplacement(
      context as BuildContext,
      MaterialPageRoute(builder: (BuildContext context) => Login()),
    );
  }
}

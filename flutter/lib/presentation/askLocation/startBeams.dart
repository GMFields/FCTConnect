import 'package:flutter/material.dart';
import 'package:pusher_beams/pusher_beams.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class Beams {
  Beams() {
    initialize();
  }

  void initialize() async {
    WidgetsFlutterBinding.ensureInitialized();
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    Map<String, dynamic> tokenData = json.decode(token);
    var username = tokenData['username'] ?? '';

    await PusherBeams.instance
        .start('a5dd11d2-e829-4a6b-bb1b-4bbd9b4862a4')
        .then((value) => PusherBeams.instance
            .addDeviceInterest("debug-hello")
            .then((value) => PusherBeams.instance
                .addDeviceInterest(username)
                .then((value) => PusherBeams.instance.addDeviceInterest(
                    "general")))); // Supply your own instanceId

    PusherBeams.instance.onMessageReceivedInTheForeground((data) {
      if (data["title"] == "Location Request" ||
          data["title"] == "Location Answer") {
        isLocationUnread = true;
      }
      if (data["title"] == "New Post Added" ||
          data["title"] == "New Reply Added") {
        isPostsUnread = true;
      }
    });
  }
}

bool isLocationUnread = false;
bool isPostsUnread = false;

import 'package:flutter/material.dart';
import 'package:pusher_beams/pusher_beams.dart';

class Beams {
  Beams() {
    initialize();
  }

  void initialize() async {
    WidgetsFlutterBinding.ensureInitialized();

    await PusherBeams.instance.start(
        'a5dd11d2-e829-4a6b-bb1b-4bbd9b4862a4'); // Supply your own instanceId

    PusherBeams.instance.addDeviceInterest("debug-hello");
    //PusherBeams.instance.removeDeviceInterest("debug-hello");
    print(PusherBeams.instance.getDeviceInterests());
  }
}

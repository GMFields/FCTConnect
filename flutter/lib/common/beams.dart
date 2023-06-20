import 'package:flutter/cupertino.dart';
import 'package:pusher_beams/pusher_beams.dart';

void main(List<String> args) {
  print("a");
  initPusherBeams();
}

void initPusherBeams() async {
  WidgetsFlutterBinding.ensureInitialized();
  PusherBeams.instance.start('a5dd11d2-e829-4a6b-bb1b-4bbd9b4862a4').then(
      (value) => PusherBeams.instance
          .addDeviceInterest("debug-hello")
          .then((value) => print("Registered!")));
}

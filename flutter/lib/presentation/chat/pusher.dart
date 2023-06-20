import 'package:flutter/material.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';


class PusherClass {
  String app_id = "1606850";
  String API_KEY = "863de6ade90e73639f5e";
  String secret = "ff606b79d556ed99f074";
  String API_CLUSTER = "eu";

  Future<void> initializeAndConnect() async {

    PusherChannelsFlutter pusher = PusherChannelsFlutter.getInstance();

    await pusher.init(apiKey: API_KEY, cluster: API_CLUSTER);

    pusher.connect();

    final myChannel = await pusher.subscribe(channelName: "server-channel", onEvent: onEvent);

  } 

  void onEvent(PusherEvent event) {
  print("onEvent: $event");
  }

}
import 'dart:convert';

import 'dart:async';

import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';
import 'package:http/http.dart' as http;

class Chat {
  PusherChannelsFlutter pusher = PusherChannelsFlutter.getInstance();

  Chat() {
    try {
      pusher.init(
          apiKey: "863de6ade90e73639f5e",
          cluster: "eu",
          onConnectionStateChange: onConnectionStateChange,
          onError: onError,
          onSubscriptionSucceeded: onSubscriptionSucceeded,
          onEvent: onEvent,
          onSubscriptionError: onSubscriptionError,
          onDecryptionFailure: onDecryptionFailure,
          onMemberAdded: onMemberAdded,
          onMemberRemoved: onMemberRemoved,
          onSubscriptionCount: onSubscriptionCount,
          onAuthorizer: onAuthorizer);
      pusher.connect();
      pusher.subscribe(channelName: "server-channel");
    } catch (e) {
      print("ERROR: $e");
    }
  }

  Future<dynamic> onAuthorizer(
      String channelName, String socketId, dynamic options) async {
    final url = Uri.parse(
        'http://localhost:8080/rest/chat/auth?socket_id=$socketId&channel=$channelName');

    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    var json = jsonDecode(response.body);
    print(json);
    return json;
  }

  void onConnectionStateChange(dynamic currentState, dynamic previousState) {
    print("Connection: $currentState");
  }

  void onError(String message, int? code, dynamic e) {
    print("onError: $message code: $code exception: $e");
  }

  void onEvent(PusherEvent event) {
    print("onEvent: $event");

    if (event.eventName == "main") {
      //pusher.subscribe(channelName: event.data);
      print(event.data);
    }
  }

  void onSubscriptionSucceeded(String channelName, dynamic data) {
    print("onSubscriptionSucceeded: $channelName data: $data");
    final me = pusher.getChannel(channelName)?.me;
    print("Me: $me");
  }

  void onSubscriptionError(String message, dynamic e) {
    print("onSubscriptionError: $message Exception: $e");
  }

  void onDecryptionFailure(String event, String reason) {
    print("onDecryptionFailure: $event reason: $reason");
  }

  void onMemberAdded(String channelName, PusherMember member) {
    print("onMemberAdded: $channelName user: $member");
  }

  void onMemberRemoved(String channelName, PusherMember member) {
    print("onMemberRemoved: $channelName user: $member");
  }

  void onSubscriptionCount(String channelName, int subscriptionCount) {
    print(
        "onSubscriptionCount: $channelName subscriptionCount: $subscriptionCount");
  }

  Future<List> getOnlineUser() async {
    final url = Uri.parse('http://localhost:8080/rest/chat/online');

    final response = await http.get(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    var json = jsonDecode(response.body);
    print(json);
    return json;
  }

  Future<void> setOnline(String user) async {
    final url = Uri.parse('http://localhost:8080/rest/chat/new');

    final response = await http.post(
      url.replace(queryParameters: {'name': user}),
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    //var json = jsonDecode(response.body);
    print(response.body);
  }
}

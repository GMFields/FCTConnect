import 'package:flutter/material.dart';
import 'package:pusher_channels_flutter/pusher_channels_flutter.dart';

class ChatPage extends StatefulWidget {
  const ChatPage({Key? key}) : super(key: key);

  static const String routeName = '/chat';

  @override
  _ChatPageState createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  final PusherClass pusherClass = PusherClass();

  @override
  void initState() {
    super.initState();
    connectToPusher();
  }

  void connectToPusher() async {
    await pusherClass.initializeAndConnect();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chat'),
      ),
      body: Center(
        child: Text('Chat'),
      ),
    );
  }
}

class PusherClass {
  String app_id = "1606850";
  String API_KEY = "863de6ade90e73639f5e";
  String secret = "ff606b79d556ed99f074";
  String API_CLUSTER = "eu";

  Future<void> initializeAndConnect() async {
    PusherChannelsFlutter pusher = PusherChannelsFlutter.getInstance();
    print('Pusher instance: $pusher');

    await pusher.init(apiKey: API_KEY, cluster: API_CLUSTER);

    pusher.connect();

    final myChannel =
        await pusher.subscribe(channelName: "server-channel", onEvent: onEvent);
  }

  void onEvent(PusherEvent event) {
    print("onEvent: $event");
    // Handle the event here
  }
}

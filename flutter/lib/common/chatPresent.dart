import 'dart:convert';

import 'package:discipulos_flutter/common/chat.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class OnlineUsersPage extends StatefulWidget {
  @override
  _OnlineUsersPageState createState() => _OnlineUsersPageState();
}

class _OnlineUsersPageState extends State<OnlineUsersPage> {
  List onlineUsers = [];

  @override
  void initState() {
    Chat chat = Chat();
    chat.setOnline("Rita");
    getOnlineUser();
    super.initState();
  }

  Future<void> getOnlineUser() async {
    final url = Uri.parse('http://localhost:8080/rest/chat/online');

    final response = await http.get(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    print(response.statusCode);
    if (response.statusCode == 200) {
      final List<dynamic> anomalyList = jsonDecode(response.body);
      onlineUsers = anomalyList;
      print(onlineUsers);
    } else {
      throw Exception('Failed to fetch anomalies');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Online Users'),
      ),
      body: ListView.builder(
        itemCount: onlineUsers.length,
        itemBuilder: (context, index) {
          final user = onlineUsers[index];
          return ListTile(
            title: Text(user),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ChatPage(user: user),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class ChatPage extends StatelessWidget {
  final String user;

  ChatPage({required this.user});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Chat with $user'),
      ),
      body: Center(
        child: Text('Chat display for $user'),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    home: OnlineUsersPage(),
  ));
}

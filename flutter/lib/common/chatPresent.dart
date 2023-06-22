import 'package:discipulos_flutter/common/chat.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: OnlineUsersPage(),
  ));
}

class OnlineUsersPage extends StatefulWidget {
  @override
  _OnlineUsersPageState createState() => _OnlineUsersPageState();
}

Chat chat = Chat();

class _OnlineUsersPageState extends State<OnlineUsersPage> {
  List<String> onlineUsers = chat.getOnlineMembers();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Online Users'),
      ),
      body: GridView.count(
        crossAxisCount: 1, // Adjust the number of columns as needed
        crossAxisSpacing: 8, // Adjust the horizontal spacing
        mainAxisSpacing: 8, // Adjust the vertical spacing
        children: List.generate(onlineUsers.length, (index) {
          String user = onlineUsers[index];
          return Center(
            child: Container(
              width: 200,
              height: 50,
              color: Colors.green, // You can customize the rectangle color
              child: Center(
                child: Text(
                  user,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                  ),
                ),
              ),
            ),
          );
        }),
      ),
    );
  }
}

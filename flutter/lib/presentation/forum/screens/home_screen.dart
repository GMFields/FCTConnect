import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../widgets/popular_topics.dart';
import '../widgets/posts.dart';
import '../widgets/top_bar.dart';

import 'package:uuid/uuid.dart';
import 'package:http/http.dart' as http;

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

var username;

class _HomePageState extends State<HomePage> {
  final TextEditingController _titleController = TextEditingController();
  final TextEditingController _contentController = TextEditingController();

  void _openPostModal() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return Padding(
          padding:
              EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
          child: Container(
            padding: const EdgeInsets.all(20.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  controller: _titleController,
                  decoration: const InputDecoration(
                    hintText: 'Enter title',
                    // Add any desired styling for the input field
                  ),
                ),
                const SizedBox(height: 16.0),
                TextField(
                  controller: _contentController,
                  decoration: const InputDecoration(
                    hintText: 'Enter content',
                    // Add any desired styling for the input field
                  ),
                  maxLines: 4,
                ),
                const SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: () {
                    // Perform the necessary action with the entered data
                    String title = _titleController.text;
                    String content = _contentController.text;

                    postToForum(title, content);

                    // Close the bottom sheet
                    Navigator.pop(context);
                  },
                  child: const Text('Submit'),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Future<void> postToForum(String question, String content) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    print("1");
    print(token);
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    print("2");
    print(token);
    Map<String, dynamic> tokenData = json.decode(token);
    String user_username = tokenData['username'] ?? '';
    print("3");
    print(token);
    var uuid = const Uuid();
    print("4");
    print(token);

    var data = {
      "question": question,
      "content": content,
      "votes": 0,
      "repliesCount": 0,
      "views": 0,
      "created_at": "",
      "author": user_username,
      "id": uuid.v4().toString()
    };

    print("5");
    print(token);

    final response = await http.post(
      Uri.parse(
              "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/addpost")
          .replace(queryParameters: {'tokenObj': token}),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(data),
    );

    if (response.statusCode == 200) {
      print("a");
    } else {
      throw Exception('Failed to add a post');
    }
  }

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
        future: getPosts(),
        builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator(); // Display a loading indicator while waiting for the response
          } else if (snapshot.hasError) {
            return Text(
                'Error: ${snapshot.error}'); // Handle any errors that occurred during the request
          } else {
            return Scaffold(
              appBar: AppBar(
                title: const Text(
                  "Perfil",
                  style: TextStyle(
                    color: Color.fromARGB(255, 0, 0, 0),
                    fontSize: 20,
                    fontFamily: 'RobotoSlab',
                  ),
                ),
                backgroundColor: const Color.fromARGB(255, 237, 237, 237),
                iconTheme: const IconThemeData(color: Colors.black),
              ),
              backgroundColor: Theme.of(context).primaryColor,
              body: SafeArea(
                  child: ListView(
                children: <Widget>[
                  Container(
                    height: 160,
                    width: MediaQuery.of(context).size.width,
                    decoration:
                        BoxDecoration(color: Theme.of(context).primaryColor),
                    child: Padding(
                      padding: EdgeInsets.all(12.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            "Welcome, $username",
                            style: TextStyle(
                                fontSize: 24,
                                color: Colors.white,
                                fontWeight: FontWeight.w600),
                          ),
                          SizedBox(height: 8.0),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Text(
                                "Find Posts that you wanna read.",
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.6),
                                  fontSize: 14.0,
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(20.0),
                                child: ElevatedButton(
                                    onPressed: _openPostModal,
                                    child: const Text('Write a Post')),
                              ),
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                  Container(
                      decoration: const BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.only(
                              topLeft: Radius.circular(35.0),
                              topRight: Radius.circular(35.0))),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          TopBar(),
                          const Padding(
                            padding: EdgeInsets.all(20.0),
                            child: Text(
                              "Popular Topics",
                              style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ),
                          ),
                          PopularTopics(),
                          const Padding(
                            padding: EdgeInsets.only(
                                left: 20.0, top: 20.0, bottom: 10.0),
                            child: Text(
                              "Posts",
                              style: TextStyle(
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                                color: Colors.black,
                              ),
                            ),
                          ),
                          Posts(selectedIndex: 0),
                          Center(
                            child: RawMaterialButton(
                              onPressed: () {
                                getPosts();
                              },
                              elevation: 2.0,
                              fillColor: Colors.blue,
                              child: Icon(
                                Icons.add_circle_outline_outlined,
                                color: Colors.white,
                                size: 30.0,
                              ),
                              padding: EdgeInsets.all(5.0),
                              shape: CircleBorder(),
                            ),
                          )
                        ],
                      ))
                ],
              )),
            );
          }
        });
  }
}

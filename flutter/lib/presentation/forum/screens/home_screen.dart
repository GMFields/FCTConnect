import 'dart:convert';

import 'package:discipulos_flutter/presentation/forum/widgets/bookmarked_posts.dart';
import 'package:discipulos_flutter/presentation/forum/widgets/user_posts.dart';
import 'package:discipulos_flutter/presentation/welcome/widgets/navigation_drawer.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/post_model.dart';
import '../models/error_popup.dart';
import '../widgets/popular_topics.dart';
import '../widgets/posts.dart';
import '../widgets/search_posts.dart';
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
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

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
                    hintText: 'Introduz o titulo',
                  ),
                ),
                const SizedBox(height: 16.0),
                TextField(
                  controller: _contentController,
                  decoration: const InputDecoration(
                    hintText: 'Introduz o conteúdo',
                  ),
                  maxLines: 4,
                ),
                const SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: () {
                    String title = _titleController.text;
                    String content = _contentController.text;

                    postToForum(title, content);
                    Navigator.pop(context);
                  },
                  style: ButtonStyle(
                    backgroundColor:
                        MaterialStateProperty.all<Color>(kPrimaryColor),
                  ),
                  child: const Text('Submeter'),
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

    if (token == null) {
      throw Exception('Token not found in cache');
    }

    Map<String, dynamic> tokenData = json.decode(token);
    String user_username = tokenData['username'] ?? '';

    var uuid = const Uuid();

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
      await prefs.setString('pageCursor', "");
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
            return const CircularProgressIndicator();
          } else if (snapshot.hasError) {
            return Text('Error: ${snapshot.error}');
          } else {
            return Scaffold(
              drawer: const CustomNavigationDrawer(),
              appBar: AppBar(
                title: const Text(
                  "Forum",
                  style: TextStyle(
                    color: Color.fromARGB(255, 255, 255, 255),
                    fontSize: 20,
                    fontFamily: 'RobotoSlab',
                  ),
                ),
                backgroundColor: kPrimaryColor,
                iconTheme: const IconThemeData(
                    color: Color.fromARGB(255, 255, 255, 255)),
                actions: [
                  IconButton(
                    icon: const Icon(Icons.search_outlined),
                    onPressed: () {
                      Navigator.push(context,
                          MaterialPageRoute(builder: (_) => SearchedPosts()));
                    },
                  ),
                  const SizedBox(width: 8.0),
                  IconButton(
                    icon: const Icon(Icons.bookmarks_rounded),
                    onPressed: () async {
                      final prefs = await SharedPreferences.getInstance();
                      await prefs.setString('bookmarksCursor', "");
                      Navigator.push(context,
                          MaterialPageRoute(builder: (_) => BookmarkedPosts()));
                    },
                  ),
                  const SizedBox(width: 8.0),
                  IconButton(
                    icon: const Icon(Icons.person_pin_rounded),
                    onPressed: () async {
                      final prefs = await SharedPreferences.getInstance();
                      await prefs.setString('userPostsCursor', "");
                      Navigator.push(context,
                          MaterialPageRoute(builder: (_) => UserPosts()));
                    },
                  ),
                  const SizedBox(width: 8.0),
                ],
              ),
              //backgroundColor: const Color.fromARGB(199, 40, 64, 183),
              backgroundColor: Color.fromARGB(255, 10, 82, 134),
              body: SafeArea(
                  child: ListView(
                children: <Widget>[
                  Container(
                    height: 160,
                    width: MediaQuery.of(context).size.width,
                    decoration: const BoxDecoration(
                        //color: Color.fromARGB(199, 40, 64, 183)),
                        color: Color.fromARGB(255, 10, 70, 110)),
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(
                            "Bem vindo, $username",
                            style: const TextStyle(
                                fontSize: 24,
                                color: Colors.white,
                                fontWeight: FontWeight.w600),
                          ),
                          const SizedBox(height: 8.0),
                          Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              const Text(
                                "Encontra posts que queiras ver.",
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 14.0,
                                ),
                              ),
                              const SizedBox(height: 14.0),
                              Center(
                                  child: ElevatedButton(
                                      onPressed: _openPostModal,
                                      style: ButtonStyle(
                                          backgroundColor:
                                              MaterialStateProperty.all<Color>(
                                                  kPrimaryColor)),
                                      child: const Text('Adiciona um post'))),
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
                              "Topicos populares",
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
                          const Posts(selectedIndex: 0),
                          Center(
                            child: RawMaterialButton(
                              onPressed: () {
                                setState(() {
                                  getPosts().then((value) => {
                                        if (value == 404)
                                          {
                                            showDialog(
                                              context: context,
                                              builder: (BuildContext context) {
                                                return const ErrorPopup(
                                                  errorMessage:
                                                      "Não há mais posts!",
                                                );
                                              },
                                            )
                                          }
                                      });
                                });
                              },
                              elevation: 2.0,
                              fillColor: kPrimaryColor,
                              padding: const EdgeInsets.all(5.0),
                              shape: const CircleBorder(),
                              child: const Icon(
                                Icons.add_circle_outline_outlined,
                                color: Colors.white,
                                size: 30.0,
                              ),
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

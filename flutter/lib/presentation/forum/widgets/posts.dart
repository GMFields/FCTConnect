import 'dart:async';
import 'dart:convert';

import '../screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/author_model.dart';
import '../models/error_popup.dart';
import '../models/post_model.dart';
import '../models/replies_model.dart';
import '../screens/post_screen.dart';

import 'package:http/http.dart' as http;

class Posts extends StatefulWidget {
  final int selectedIndex;
  const Posts({required this.selectedIndex});

  @override
  _PostsState createState() => _PostsState();
}

late List<dynamic> reserve;

Future<void> bookmarkPost(String id, BuildContext context) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  Map<String, dynamic> tokenData = json.decode(token);
  String user_username = tokenData['username'] ?? '';

  final response = await http.post(Uri.parse(
          "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/addbookmark")
      .replace(queryParameters: {
    'postId': id,
    'username': user_username
  }).replace(queryParameters: {'tokenObj': token}));

  if (response.statusCode == 200) {
    print("bookmarked successfully");
  } else if (response.statusCode == 201) {
    // ignore: use_build_context_synchronously
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return const ErrorPopup(
          errorMessage: "Already Bookmarked",
        );
      },
    );
  }
}

Future<void> likePost(Question question) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  var data = {
    'question': question.question,
    'content': question.content,
    'votes': question.votes + 1,
    'repliesCount': question.repliesCount,
    'views': question.views,
    'created_at': question.created_at,
    'author': question.author.name,
    'id': question.id,
  };

  question.votes += 1;

  final response = await http.post(
      Uri.parse(
              "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/updatepost")
          .replace(queryParameters: {'tokenObj': token}),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data));

  if (response.statusCode == 200) {
    print("liked successfully");
  } else {
    throw Exception('Failed to fetch posts');
  }
}

Future<void> updatePost(Question question) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  var data = {
    'question': question.question,
    'content': question.content,
    'votes': question.votes,
    'repliesCount': question.repliesCount,
    'views': question.views + 1,
    'created_at': question.created_at,
    'author': question.author.name,
    'id': question.id,
  };

  question.views += 1;

  final response = await http.post(
      Uri.parse(
              "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/updatepost")
          .replace(queryParameters: {'tokenObj': token}),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode(data));

  if (response.statusCode == 200) {
    print("updated successfully");
  } else {
    throw Exception('Failed to fetch anomalies');
  }
}

Future<void> getPosts() async {
  final response = await http.get(Uri.parse(
      "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/listpost"));

  if (response.statusCode == 200) {
    print(response.body);
    List<dynamic> postList = jsonDecode(response.body);
    print(postList);

    postList = postList.map((json) {
      return Question(
          question: json['question'],
          content: json['content'],
          votes: json['votes'],
          repliesCount: json['repliesCount'],
          views: json['views'],
          created_at: json['created_at'],
          id: json['id'],
          author: Author(name: json['author'], imageUrl: ''),
          replies: replies);
    }).toList();

    postList.forEach((e) {
      bool equals = false;

      for (int i = 0; i < questions.length; i++) {
        if (questions[i].question == e.question) equals = true;
      }

      if (!equals) questions.add(e);
    });

    reserve = questions;
    getUsername();
  } else {
    throw Exception('Failed to fetch anomalies');
  }
}

getUsername() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  Map<String, dynamic> tokenData = json.decode(token);
  username = tokenData['username'] ?? '';
}

late ImageProvider backgroundImage;
Future<void> loadImage(Question question) async {
  if (question.author.backgroundImage != null) {
    return;
  }

  final response = await http.get(Uri.parse(
      "https://helical-ascent-385614.oa.r.appspot.com/gcs/${question.author.name}_pfp")); // Replace with the actual endpoint URL
  if (response.statusCode == 200) {
    question.author.backgroundImage = MemoryImage(response.bodyBytes);
  } else {
    question.author.backgroundImage = AssetImage('assets/images/VADER.png');
  }
}

class _PostsState extends State<Posts> {
  String _searchQuery = '';

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  void _showSearchBox(BuildContext context) {
    _searchQuery = '';
    reserve = questions;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Search'),
          content: TextField(
            onChanged: (value) {
              _searchQuery = value;
            },
            decoration: InputDecoration(
              hintText: 'Search...',
            ),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                // Perform search based on _searchQuery
                setState(() {
                  _performSearch(_searchQuery, context);
                });
              },
              child: Text('Search'),
            ),
          ],
        );
      },
    );
  }

  void _performSearch(String query, BuildContext context) {
    List<dynamic> filteredItems = questions
        .where(
            (item) => item.question.toLowerCase().contains(query.toLowerCase()))
        .toList();

    questions = filteredItems;
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Center(
        child: IconButton(
          icon: Icon(
            MdiIcons.searchWeb,
            size: 20,
            color: Colors.blue,
          ),
          onPressed: () {
            _showSearchBox(context);
          },
        ),
      ),
      Column(
        children: questions
            .map((question) => FutureBuilder<void>(
                future: loadImage(question),
                builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator(); // Display a loading indicator while waiting for the response
                  } else if (snapshot.hasError) {
                    return Text(
                        'Error: ${snapshot.error}'); // Handle any errors that occurred during the request
                  } else {
                    return GestureDetector(
                      onDoubleTap: () {
                        setState(() {
                          questions = reserve;
                        });
                      },
                      onTap: () {
                        updatePost(question);
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (_) => PostScreen(
                                      question: question,
                                    )));
                      },
                      child: Container(
                        height: 180,
                        margin: const EdgeInsets.all(15.0),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(10.0),
                            boxShadow: [
                              BoxShadow(
                                  color: Colors.black26.withOpacity(0.05),
                                  offset: const Offset(0.0, 6.0),
                                  blurRadius: 10.0,
                                  spreadRadius: 0.10)
                            ]),
                        child: Padding(
                          padding: EdgeInsets.all(15.0),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              SizedBox(
                                height: 70,
                                child: Expanded(
                                  child: Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: <Widget>[
                                      Row(
                                        children: <Widget>[
                                          CircleAvatar(
                                            backgroundImage: question
                                                    .author.backgroundImage ??
                                                AssetImage(
                                                    'assets/images/VADER.png'), // Replace with a placeholder image asset
                                            radius: 22,
                                          ),
                                          Padding(
                                            padding: const EdgeInsets.only(
                                                left: 8.0),
                                            child: Column(
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              mainAxisAlignment:
                                                  MainAxisAlignment.center,
                                              children: <Widget>[
                                                SizedBox(
                                                  width: MediaQuery.of(context)
                                                          .size
                                                          .width *
                                                      0.65,
                                                  child: Text(
                                                    question.question,
                                                    style: const TextStyle(
                                                        fontSize: 18,
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        letterSpacing: .4),
                                                  ),
                                                ),
                                                const SizedBox(height: 2.0),
                                                Row(
                                                  children: <Widget>[
                                                    Text(
                                                      question.author.name,
                                                      style: TextStyle(
                                                          color: Colors.grey
                                                              .withOpacity(
                                                                  0.6)),
                                                    ),
                                                    const SizedBox(width: 15),
                                                    Text(
                                                      question.created_at,
                                                      style: TextStyle(
                                                          color: Colors.grey
                                                              .withOpacity(
                                                                  0.6)),
                                                    ),
                                                    const SizedBox(width: 30),
                                                    MouseRegion(
                                                      cursor: SystemMouseCursors
                                                          .click,
                                                      child: GestureDetector(
                                                        onTap: () {
                                                          bookmarkPost(
                                                              question.id,
                                                              context);
                                                        },
                                                        child: Icon(
                                                          MdiIcons.bookmark,
                                                          color: Colors.grey
                                                              .withOpacity(0.6),
                                                          size: 26,
                                                        ),
                                                      ),
                                                    ),
                                                  ],
                                                )
                                              ],
                                            ),
                                          ),
                                        ],
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                              Container(
                                height: 50,
                                child: Center(
                                  child: Text(
                                    "${question.content.length <= 80 ? question.content : question.content.substring(0, 80)}..",
                                    style: TextStyle(
                                      color: Colors.grey.withOpacity(0.8),
                                      fontSize: 16,
                                      letterSpacing: 0.3,
                                    ),
                                  ),
                                ),
                              ),
                              SizedBox(height: 5),
                              Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: <Widget>[
                                  Row(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.center,
                                    children: <Widget>[
                                      MouseRegion(
                                        cursor: SystemMouseCursors.click,
                                        child: GestureDetector(
                                          onTap: () {
                                            likePost(question);
                                          },
                                          child: Icon(
                                            MdiIcons.thumbUp,
                                            color: Colors.grey.withOpacity(0.6),
                                            size: 22,
                                          ),
                                        ),
                                      ),
                                      SizedBox(width: 4.0),
                                      Text(
                                        "${question.votes} votes",
                                        style: TextStyle(
                                            fontSize: 14,
                                            color: Colors.grey.withOpacity(0.6),
                                            fontWeight: FontWeight.w600),
                                      )
                                    ],
                                  ),
                                  Row(
                                    children: <Widget>[
                                      Icon(
                                        MdiIcons.email,
                                        color: Colors.grey.withOpacity(0.6),
                                        size: 16,
                                      ),
                                      SizedBox(width: 4.0),
                                      Text(
                                        "${question.repliesCount} replies",
                                        style: TextStyle(
                                            fontSize: 14,
                                            color:
                                                Colors.grey.withOpacity(0.6)),
                                      )
                                    ],
                                  ),
                                  Row(
                                    children: <Widget>[
                                      Icon(
                                        MdiIcons.eye,
                                        color: Colors.grey.withOpacity(0.6),
                                        size: 18,
                                      ),
                                      SizedBox(width: 4.0),
                                      Text(
                                        "${question.views} views",
                                        style: TextStyle(
                                            fontSize: 14,
                                            color:
                                                Colors.grey.withOpacity(0.6)),
                                      )
                                    ],
                                  )
                                ],
                              )
                            ],
                          ),
                        ),
                      ),
                    );
                  }
                }))
            .toList(),
      )
    ]);
  }
}

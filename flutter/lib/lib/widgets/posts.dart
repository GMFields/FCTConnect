import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

import '../models/author_model.dart';
import '../models/post_model.dart';
import '../models/replies_model.dart';
import '../screens/post_screen.dart';

import 'package:http/http.dart' as http;

class Posts extends StatefulWidget {
  @override
  _PostsState createState() => _PostsState();
}

Future<void> getPosts() async {
  /*final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }*/

  final response = await http.get(Uri.parse(
      "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/listpost") /*.replace(queryParameters: {'tokenObj': token})*/);

  if (response.statusCode == 200) {
    final List<dynamic> postList = jsonDecode(response.body);
    print(postList);
    questions = postList.map((json) {
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
    print(questions);
  } else {
    throw Exception('Failed to fetch anomalies');
  }
}

Future<void> bookmarkPost(String id) async {
  /*final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }*/

  /*Map<String, dynamic> tokenData = json.decode(token);
  String user_username = tokenData['username'] ?? '';*/

  final response = await http.post(Uri.parse(
          "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/addbookmark")
      .replace(queryParameters: {
    'postId': id,
    'username': 'jao'
  }) /*.replace(queryParameters: {'tokenObj': token})*/);

  if (response.statusCode == 200) {
    print("bookmarked successfully");
  } else {
    throw Exception('Failed to bookmark');
  }
}

class _PostsState extends State<Posts> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getPosts();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
        children: questions
            .map((question) => GestureDetector(
                  onTap: () {
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
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: <Widget>[
                                Row(
                                  children: <Widget>[
                                    CircleAvatar(
                                      backgroundImage:
                                          AssetImage(question.author.imageUrl),
                                      radius: 22,
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.only(left: 8.0),
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
                                                  fontWeight: FontWeight.bold,
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
                                                        .withOpacity(0.6)),
                                              ),
                                              const SizedBox(width: 15),
                                              Text(
                                                question.created_at,
                                                style: TextStyle(
                                                    color: Colors.grey
                                                        .withOpacity(0.6)),
                                              )
                                            ],
                                          )
                                        ],
                                      ),
                                    ),
                                  ],
                                ),
                                GestureDetector(
                                  onTap: () {
                                    bookmarkPost(question.id);
                                  },
                                  child: Icon(
                                    MdiIcons.bookmark,
                                    color: Colors.grey.withOpacity(0.6),
                                    size: 26,
                                  ),
                                )
                              ],
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
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: <Widget>[
                              Row(
                                crossAxisAlignment: CrossAxisAlignment.center,
                                children: <Widget>[
                                  Icon(
                                    MdiIcons.thumbUp,
                                    color: Colors.grey.withOpacity(0.6),
                                    size: 22,
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
                                        color: Colors.grey.withOpacity(0.6)),
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
                                        color: Colors.grey.withOpacity(0.6)),
                                  )
                                ],
                              )
                            ],
                          )
                        ],
                      ),
                    ),
                  ),
                ))
            .toList());
  }
}

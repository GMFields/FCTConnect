import 'dart:convert';

import '../widgets/posts.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/author_model.dart';
import '../models/error_popup.dart';
import '../models/post_model.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

import 'package:http/http.dart' as http;

import '../models/replies_model.dart';

class PostScreen extends StatefulWidget {
  final Question question;
  const PostScreen({required this.question});
  _PostScreenState createState() => _PostScreenState();
}

class _PostScreenState extends State<PostScreen> {
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
                  controller: _contentController,
                  decoration: const InputDecoration(
                    hintText: 'Escreve a tua resposta',
                  ),
                  maxLines: 4,
                ),
                const SizedBox(height: 16.0),
                ElevatedButton(
                  onPressed: () {
                    String content = _contentController.text;
                    postReply(content);
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

  Future<void> postReply(String content) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    Map<String, dynamic> tokenData = json.decode(token);
    String user_username = tokenData['username'] ?? '';

    var data = {
      "author": user_username,
      "content": content,
      "votes": 0,
      "id": widget.question.id,
    };

    final response = await http.post(
        Uri.parse(
                "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/addreply")
            .replace(queryParameters: {'tokenObj': token}),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(data));

    if (response.statusCode == 200) {
      var data = {
        'question': widget.question.question,
        'content': widget.question.content,
        'votes': widget.question.votes,
        'repliesCount': widget.question.repliesCount + 1,
        'views': widget.question.views,
        'created_at': widget.question.created_at,
        'author': widget.question.author.name,
        'id': widget.question.id,
      };

      widget.question.repliesCount += 1;

      updatePost(data);
    } else {
      throw Exception('Failed to post reply');
    }
  }

  Future<void> updatePost(var data) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

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

  Future<void> getReplies() async {
    if (widget.question.replies.isNotEmpty) {
      return;
    }

    final response = await http.get(
      Uri.parse(
              "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/listreply")
          .replace(queryParameters: {'parentId': widget.question.id}),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode == 200) {
      final List<dynamic> postList = jsonDecode(response.body);
      print(postList);
      widget.question.replies = postList.map((json) {
        return Reply(
          author: Author(name: json['author'], imageUrl: ''),
          content: json['content'],
          likes: json['likes'],
        );
      }).toList();
      print(widget.question.replies);
    } else if (response.statusCode == 404) {
      print("no replies");
    }
  }

  Future<void> likePost() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    var data = {
      'question': widget.question.question,
      'content': widget.question.content,
      'votes': widget.question.votes + 1,
      'repliesCount': widget.question.repliesCount,
      'views': widget.question.views,
      'created_at': widget.question.created_at,
      'author': widget.question.author.name,
      'id': widget.question.id,
    };

    widget.question.votes += 1;

    final response = await http.post(
        Uri.parse(
                "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/updatepost")
            .replace(queryParameters: {'tokenObj': token}),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data));

    if (response.statusCode == 200) {
      print("liked successfully");
    } else {
      throw Exception('Failed to fetch anomalies');
    }
  }

  Future<void> likeReply(Question question, Reply reply) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    var data = {
      "author": reply.author,
      "content": reply.content,
      "votes": reply.likes + 1,
      "id": question.id,
    };

    reply.likes += 1;

    final response = await http.post(
        Uri.parse(
                "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/addreply")
            .replace(queryParameters: {'tokenObj': token}),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode(data));

    if (response.statusCode == 200) {
      print("liked successfully");
    } else {
      throw Exception('Failed to fetch anomalies');
    }
  }

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

  loadImages(Question question) async {
    loadImage(question);
    for (int i = 0; i < question.replies.length; i++) {
      if (question.replies[i].author.backgroundImage != null) {
        continue;
      }

      final response = await http.get(Uri.parse(
          "https://helical-ascent-385614.oa.r.appspot.com/gcs/${question.replies[i].author.name}_pfp")); // Replace with the actual endpoint URL
      if (response.statusCode == 200) {
        question.replies[i].author.backgroundImage =
            MemoryImage(response.bodyBytes);
      } else {
        question.replies[i].author.backgroundImage =
            AssetImage('assets/images/VADER.png');
      }
    }
  }

  late Future<void> _fetchPostsFuture;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _fetchPostsFuture = getReplies();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<void>(
        future: _fetchPostsFuture,
        builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return CircularProgressIndicator(); // Display a loading indicator while waiting for the response
          } else if (snapshot.hasError) {
            return Text(
                'Error: ${snapshot.error}'); // Handle any errors that occurred during the request
          } else {
            return FutureBuilder<void>(
                future: loadImages(widget.question),
                builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
                  } else {
                    return Scaffold(
                      backgroundColor: Colors.white,
                      body: SafeArea(
                        child: ListView(
                          children: <Widget>[
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 5.0, horizontal: 5.0),
                              child: Row(
                                children: <Widget>[
                                  IconButton(
                                      onPressed: () => Navigator.pop(context),
                                      icon: Icon(
                                        MdiIcons.arrowLeft,
                                        size: 20,
                                        color: Color.fromARGB(255, 0, 0, 0),
                                      )),
                                  const SizedBox(width: 5.0),
                                  const Text(
                                    "Ver postagens",
                                    style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.w600),
                                  )
                                ],
                              ),
                            ),
                            Container(
                              margin:
                                  const EdgeInsets.symmetric(horizontal: 15.0),
                              decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.circular(10.0),
                                  boxShadow: [
                                    BoxShadow(
                                        color: Colors.black26.withOpacity(0.05),
                                        offset: Offset(0.0, 6.0),
                                        blurRadius: 10.0,
                                        spreadRadius: 0.10)
                                  ]),
                              child: Padding(
                                padding: const EdgeInsets.all(15.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Container(
                                      height: 60,
                                      color: Colors.white,
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: <Widget>[
                                          Row(
                                            children: <Widget>[
                                              CircleAvatar(
                                                backgroundImage: widget
                                                        .question
                                                        .author
                                                        .backgroundImage ??
                                                    AssetImage(
                                                        'assets/images/VADER.png'),
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
                                                    Text(
                                                      widget
                                                          .question.author.name,
                                                      style: const TextStyle(
                                                          fontSize: 16,
                                                          fontWeight:
                                                              FontWeight.bold,
                                                          letterSpacing: .4),
                                                    ),
                                                    const SizedBox(height: 2.0),
                                                    Text(
                                                      widget
                                                          .question.created_at,
                                                      style: const TextStyle(
                                                          color: Colors.grey),
                                                    )
                                                  ],
                                                ),
                                              )
                                            ],
                                          ),
                                          MouseRegion(
                                            cursor: SystemMouseCursors.click,
                                            child: GestureDetector(
                                              onTap: () {
                                                bookmarkPost(widget.question.id,
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
                                      ),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 15.0),
                                      child: Text(
                                        widget.question.question,
                                        style: TextStyle(
                                          fontSize: 24,
                                          color: Colors.black.withOpacity(0.8),
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                    Text(
                                      widget.question.content,
                                      style: TextStyle(
                                          color: Colors.black.withOpacity(0.4),
                                          fontSize: 17,
                                          letterSpacing: .2),
                                    ),
                                    Padding(
                                      padding: const EdgeInsets.symmetric(
                                          vertical: 10.0),
                                      child: Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.start,
                                        children: <Widget>[
                                          Row(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: <Widget>[
                                              MouseRegion(
                                                cursor:
                                                    SystemMouseCursors.click,
                                                child: GestureDetector(
                                                  onTap: () {
                                                    likePost();
                                                  },
                                                  child: Icon(
                                                    MdiIcons.thumbUp,
                                                    color: Colors.grey
                                                        .withOpacity(0.5),
                                                    size: 22,
                                                  ),
                                                ),
                                              ),
                                              const SizedBox(width: 4.0),
                                              Text(
                                                "${widget.question.votes} votes",
                                                style: TextStyle(
                                                  fontSize: 14,
                                                  color: Colors.grey
                                                      .withOpacity(0.5),
                                                ),
                                              )
                                            ],
                                          ),
                                          const SizedBox(width: 15.0),
                                          Row(
                                            children: <Widget>[
                                              Icon(
                                                MdiIcons.eye,
                                                color: Colors.grey
                                                    .withOpacity(0.5),
                                                size: 18,
                                              ),
                                              const SizedBox(width: 4.0),
                                              Text(
                                                "${widget.question.views} views",
                                                style: TextStyle(
                                                  fontSize: 14,
                                                  color: Colors.grey
                                                      .withOpacity(0.5),
                                                  fontWeight: FontWeight.w600,
                                                ),
                                              )
                                            ],
                                          )
                                        ],
                                      ),
                                    )
                                  ],
                                ),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.all(20.0),
                              child: ElevatedButton(
                                  onPressed: _openPostModal,
                                  style: ButtonStyle(
                                    backgroundColor:
                                        MaterialStateProperty.all<Color>(
                                            kPrimaryColor),
                                  ),
                                  child: const Text('Escreve uma resposta')),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(
                                  left: 15.0, top: 20.0, bottom: 10.0),
                              child: Text(
                                "Respostas (${widget.question.replies.length})",
                                style: const TextStyle(
                                  fontSize: 22,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black,
                                ),
                              ),
                            ),
                            Column(
                              children: widget.question.replies
                                  .map((reply) => Container(
                                      margin: const EdgeInsets.only(
                                          left: 15.0, right: 15.0, top: 20.0),
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius:
                                            BorderRadius.circular(10.0),
                                        boxShadow: [
                                          BoxShadow(
                                              color: Colors.black26
                                                  .withOpacity(0.03),
                                              offset: const Offset(0.0, 6.0),
                                              blurRadius: 10.0,
                                              spreadRadius: 0.10)
                                        ],
                                      ),
                                      child: Padding(
                                        padding: const EdgeInsets.all(15.0),
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          children: <Widget>[
                                            Container(
                                              height: 60,
                                              color: Colors.white,
                                              child: Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment
                                                        .spaceBetween,
                                                children: <Widget>[
                                                  Row(
                                                    children: <Widget>[
                                                      CircleAvatar(
                                                        backgroundImage: reply
                                                                .author
                                                                .backgroundImage ??
                                                            AssetImage(
                                                                'assets/images/VADER.png'),
                                                        radius: 18,
                                                      ),
                                                      Padding(
                                                        padding:
                                                            const EdgeInsets
                                                                    .only(
                                                                left: 8.0),
                                                        child: Column(
                                                          crossAxisAlignment:
                                                              CrossAxisAlignment
                                                                  .start,
                                                          mainAxisAlignment:
                                                              MainAxisAlignment
                                                                  .center,
                                                          children: <Widget>[
                                                            Text(
                                                              reply.author.name,
                                                              style: const TextStyle(
                                                                  fontSize: 16,
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .w600,
                                                                  letterSpacing:
                                                                      .4),
                                                            ),
                                                            const SizedBox(
                                                                height: 2.0),
                                                            Text(
                                                              widget.question
                                                                  .created_at,
                                                              style: TextStyle(
                                                                  color: Colors
                                                                      .grey
                                                                      .withOpacity(
                                                                          0.4)),
                                                            )
                                                          ],
                                                        ),
                                                      )
                                                    ],
                                                  ),
                                                ],
                                              ),
                                            ),
                                            Padding(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                      vertical: 15.0),
                                              child: Text(
                                                reply.content,
                                                style: TextStyle(
                                                  color: Colors.black
                                                      .withOpacity(0.25),
                                                  fontSize: 16,
                                                ),
                                              ),
                                            ),
                                            Row(
                                              mainAxisAlignment:
                                                  MainAxisAlignment.start,
                                              children: <Widget>[
                                                MouseRegion(
                                                  cursor:
                                                      SystemMouseCursors.click,
                                                  child: GestureDetector(
                                                    onTap: () {
                                                      likeReply(widget.question,
                                                          reply);
                                                    },
                                                    child: Icon(
                                                      MdiIcons.thumbUp,
                                                      color: Colors.grey
                                                          .withOpacity(0.5),
                                                      size: 20,
                                                    ),
                                                  ),
                                                ),
                                                const SizedBox(width: 5.0),
                                                Text(
                                                  "${reply.likes}",
                                                  style: TextStyle(
                                                      color: Colors.grey
                                                          .withOpacity(0.5)),
                                                )
                                              ],
                                            )
                                          ],
                                        ),
                                      )))
                                  .toList(),
                            )
                          ],
                        ),
                      ),
                    );
                  }
                });
          }
        });
  }
}

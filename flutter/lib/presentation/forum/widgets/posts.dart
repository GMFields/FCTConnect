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

  print("aaaa");
  print(user_username);

  final response = await http.post(Uri.parse(
          "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/addbookmark")
      .replace(queryParameters: {
    'postId': id,
    'username': user_username,
    'tokenObj': token
  }));

  if (response.statusCode == 200) {
    print("bookmarked successfully");
    await prefs.setString('bookmarksCursor', "");
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

Future<int> getPosts() async {
  final prefs = await SharedPreferences.getInstance();
  final cursor = prefs.getString('pageCursor');

  final response = await http.get(
    Uri.parse(
            "https://helical-ascent-385614.oa.r.appspot.com/rest/forum/listpost")
        .replace(queryParameters: {'cursorObj': cursor}),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
  );

  if (response.statusCode == 200) {
    print("${response.body.split("]")[0]}]");
    setupQuestions("${response.body.split("]")[0]}]");

    String? body = prefs.getString('questions') ?? "";

    print("${response.body.split("]")[0].replaceFirst("[", "")}]"
        .contains("${body.replaceFirst("]", "")}"));

    await prefs.setString('questions',
        "${body.replaceFirst("]", "")}${response.body.split("]")[0].replaceFirst("[", "")}]");

    await prefs.setString('pageCursor',
        response.body.split('"bytes":')[1].replaceFirst(',"hash":0}}', ""));

    reserve = questions;
    await getUsername();
    return 200;
  } else if (response.statusCode == 404) {
    String? body = prefs.getString('questions');
    print(body);
    body = "[${body?.replaceAll("},", "}").replaceAll("}", "},")}]"
        .replaceAll(",]", "]")
        .replaceAll("]]", "]");
    setupQuestions(body);
    await getUsername();

    return 404;
  } else {
    throw Exception('Failed to fetch anomalies');
  }
}

void setupQuestions(String body) {
  print(body);
  List<dynamic> postList = jsonDecode(body);

  postList = (postList.map((json) {
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
  }).toList());
  postList.forEach((e) {
    bool equals = false;

    for (int i = 0; i < questions.length; i++) {
      if (questions[i].question == e.question) equals = true;
    }

    if (!equals) questions.add(e);
  });
  questions.sort(((a, b) => a.created_at.compareTo(b.created_at)));
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
      "https://helical-ascent-385614.oa.r.appspot.com/gcs/${question.author.name}_pfp"));
  if (response.statusCode == 200) {
    question.author.backgroundImage = MemoryImage(response.bodyBytes);
  } else {
    question.author.backgroundImage =
        const AssetImage('assets/images/VADER.png');
  }
}

class _PostsState extends State<Posts> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Center(
        child: IconButton(
            onPressed: () {
              setState(() {
                questions = reserve;
              });
            },
            icon: Icon(MdiIcons.refresh, size: 20, color: Colors.blue)),
      ),
      Column(
        children: questions
            .map((question) => FutureBuilder<void>(
                future: loadImage(question),
                builder: (BuildContext context, AsyncSnapshot<void> snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const CircularProgressIndicator();
                  } else if (snapshot.hasError) {
                    return Text('Error: ${snapshot.error}');
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
                          padding: const EdgeInsets.all(15.0),
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
                                                const AssetImage(
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
                                                SizedBox(
                                                  width: MediaQuery.of(context)
                                                          .size
                                                          .width *
                                                      0.65,
                                                  child: Text(
                                                    '${question.question.length <= 15 ? question.question : question.question.substring(0, 20)}..',
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
                                                      '${question.created_at.substring(4, 16)}',
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
                              const SizedBox(height: 5),
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
                                      const SizedBox(width: 4.0),
                                      Text(
                                        "${question.votes} votos",
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
                                      const SizedBox(width: 4.0),
                                      Text(
                                        "${question.repliesCount} respostas",
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
                                      const SizedBox(width: 4.0),
                                      Text(
                                        "${question.views} visualizações",
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

import 'dart:convert';

import 'package:discipulos_flutter/presentation/forum/widgets/posts.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

import '../models/author_model.dart';
import '../models/post_model.dart';
import '../models/replies_model.dart';
import '../screens/post_screen.dart';

class SearchedPosts extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SearchedPostsState();
  }
}

Future<List<dynamic>> getSearchedPosts(String substring) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  final url = Uri.parse(
    'http://helical-ascent-385614.oa.r.appspot.com/rest/forum/listsearched',
  ).replace(
    queryParameters: {'tokenObj': token, 'substring': substring},
  );
  print("url: " + url.toString());

  final response = await http.get(url);

  if (response.statusCode == 200) {
    print(response.body);
    List<dynamic> modifiedResponse = await setupBookmarks(response.body);

    return modifiedResponse;
  } else if (response.statusCode == 404) {
    print("a");
    return [];
  } else {
    throw Exception('Failed to fetch asked locations');
  }
}

Future<List> setupBookmarks(String body) async {
  List<dynamic> postList = jsonDecode(body);
  List<dynamic> newList = [];
  print(body);

  await Future.wait(postList.map((json) async {
    Question question = Question(
      question: json['question'],
      content: json['content'],
      votes: json['votes'],
      repliesCount: json['repliesCount'],
      views: json['views'],
      created_at: json['created_at'],
      id: json['id'],
      author: Author(name: json['author'], imageUrl: ''),
      replies: replies,
    );

    bool equals = false;

    for (int i = 0; i < newList.length; i++) {
      if (newList[i].question == question.question) {
        equals = true;
        break;
      }
    }

    if (!equals) {
      newList.add(question);
      await loadImage(question);
    }
  }).toList());

  newList.sort((a, b) => a.created_at.compareTo(b.created_at));
  return newList;
}

Future<void> loadImage(Question question) async {
  if (question.author.backgroundImage != null) {
    return;
  }

  final response = await http.get(Uri.parse(
      "https://helical-ascent-385614.oa.r.appspot.com/gcs/${question.author.name}_pfp"));
  if (response.statusCode == 200) {
    question.author.backgroundImage = MemoryImage(response.bodyBytes);
  } else {
    print("aaaaaa");
    question.author.backgroundImage = null;
  }
}

class _SearchedPostsState extends State<SearchedPosts> {
  List<dynamic> searchedPosts = [];
  final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  TextEditingController _searchController = TextEditingController();
  String _searchText = "";

  @override
  void initState() {
    super.initState();
  }

  Future<void> performSearch(String substring) async {
    try {
      searchedPosts = await getSearchedPosts(substring);
      setState(() {});
    } catch (error) {
      // Handle the error appropriately, e.g., show an error message
      print('Error fetching location requests: $error');
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: kPrimaryColor,
          title: TextField(
            controller: _searchController,
            onChanged: (value) {
              setState(() {
                _searchText = value;
              });
            },
            onEditingComplete: () async {
              await performSearch(_searchText);
              // ignore: use_build_context_synchronously
              FocusScope.of(context).unfocus();
            },
            style: TextStyle(color: Colors.white),
            decoration: const InputDecoration(
              hintText: 'Procurar Posts',
              hintStyle: TextStyle(color: Colors.white),
            ),
          ),
        ),
        body: RefreshIndicator(
          color: Colors
              .blue, // Customize the color of the pull-to-refresh indicator
          backgroundColor: Colors
              .white, // Customize the background color of the pull-to-refresh indicator
          onRefresh: () async {
            setState(() {
              performSearch(
                  _searchText); // Update your data source with the new data
            });
          },
          child: ListView(
            children: searchedPosts
                .map((question) => GestureDetector(
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
                    ))
                .toList(),
          ),
          // Your list items go here
        ));
  }
}

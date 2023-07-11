import 'package:flutter/material.dart';

import '../models/post_model.dart';
import '../screens/post_screen.dart';

class PopularTopics extends StatefulWidget {
  @override
  _PopularTopics createState() => _PopularTopics();
}

List<dynamic> contents = [];

double ratio(int votes, int nReplies, int views) {
  double votesWeight = 0.4;
  double nRepliessWeight = 0.4;
  double viewsWeight = 0.2;

  return (votes * votesWeight) +
      (nReplies * nRepliessWeight) +
      (views * viewsWeight);
}

Future<void> loadPosts() async {
  contents = questions;
  contents.sort((a, b) => ratio(b.votes, b.repliesCount, b.views)
      .compareTo(ratio(a.votes, a.repliesCount, a.views)));
}

class _PopularTopics extends State {
  List<Color> colors = [
    Colors.purple,
    Colors.blueAccent,
    Colors.greenAccent,
    Colors.redAccent
  ];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    loadPosts();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        height: 170,
        child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: contents.length > 4 ? 4 : contents.length,
            itemBuilder: (BuildContext context, int index) {
              return Container(
                padding: EdgeInsets.all(10.0),
                margin: EdgeInsets.only(left: 20.0),
                height: 180,
                width: 170,
                decoration: BoxDecoration(
                  color: colors[index],
                  borderRadius: BorderRadius.circular(24.0),
                ),
                child: Padding(
                  padding: EdgeInsets.all(15.0),
                  child: GestureDetector(
                    onDoubleTap: () {
                      setState(() {
                        loadPosts();
                      });
                    },
                    onTap: () {
                      Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (_) => PostScreen(
                                    question: contents[index],
                                  )));
                    },
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(
                          contents[index].author.name,
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 22,
                              fontWeight: FontWeight.w600,
                              letterSpacing: 1.2),
                        ),
                        const SizedBox(height: 10),
                        Text(
                          "${contents[index].question.length <= 50 ? contents[index].question : contents[index].question.substring(0, 50)}..",
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 18,
                              letterSpacing: .7),
                        ),
                        const SizedBox(height: 10),
                        const SizedBox(height: 10),
                        Text(
                          contents.isEmpty
                              ? ""
                              : ratio(
                                      contents[index].votes,
                                      contents[index].repliesCount,
                                      contents[index].views)
                                  .toStringAsFixed(2),
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 14,
                              letterSpacing: .7),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }));
  }
}

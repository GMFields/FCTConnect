import 'package:path/path.dart';

import '../models/post_model.dart';
import 'package:flutter/material.dart';

class TopBar extends StatefulWidget {
  @override
  _TopBarState createState() => _TopBarState();
}

class _TopBarState extends State<TopBar> {
  void sortByContent(int index) {
    setState(() {
      switch (index) {
        case 0:
          {
            questions.sort(((a, b) => a.created_at.compareTo(b.created_at)));
          }
          break;

        case 1:
          {
            questions.sort(((a, b) => b.votes.compareTo(a.votes)));
          }
          break;

        case 2:
          {
            questions.sort(((a, b) => b.views.compareTo(a.views)));
          }
          break;

        case 3:
          {
            questions
                .sort(((a, b) => b.repliesCount.compareTo(a.repliesCount)));
          }
          break;
      }
    });
  }

  final List<String> contents = [
    "Mais recentes",
    "Popular",
    "Tendências",
    "Cativante",
  ];

  int _selectedIndex = 0;

  @override
  Widget build(context) {
    return Container(
      height: 90,
      padding: const EdgeInsets.only(top: 40, bottom: 15),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: contents.length,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              _selectedIndex = index;
              sortByContent(_selectedIndex);
            },
            child: Container(
              margin: const EdgeInsets.only(left: 20.0),
              decoration: BoxDecoration(
                  color: _selectedIndex == index
                      ? Theme.of(context).primaryColor.withOpacity(0.25)
                      : Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(10.0)),
              child: Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  contents[index],
                  style: TextStyle(
                      fontSize: 16.0,
                      color: _selectedIndex == index
                          ? Theme.of(context).primaryColor
                          : Colors.black38,
                      fontWeight: FontWeight.w600),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}

import 'package:discipulos_flutter/lib/models/post_model.dart';
import 'package:flutter/material.dart';

class TopBar extends StatefulWidget {
  @override
  _TopBarState createState() => _TopBarState();
}

void sortByContent(int index) {
  switch (index) {
    case 0:
      {
        print(index);
        questions.sort(((a, b) => b.created_at.compareTo(a.created_at)));
        questions.forEach((element) {
          print(element.created_at);
        });
      }
      break;

    case 1:
      {
        print(index);
        questions.sort(((a, b) => b.votes.compareTo(a.votes)));
        questions.forEach((element) {
          print(element.votes);
        });
      }
      break;

    case 2:
      {
        print(index);
        questions.sort(((a, b) => b.views.compareTo(a.views)));
        questions.forEach((element) {
          print(element.views);
        });
      }
      break;

    case 3:
      {
        print(index);
        questions.sort(((a, b) => b.repliesCount.compareTo(a.repliesCount)));
        questions.forEach((element) {
          print(element.repliesCount);
        });
      }
      break;
  }
}

class _TopBarState extends State<TopBar> {
  final List<String> contents = [
    "Latest",
    "Popular",
    "Trending",
    "Engaging",
  ];

  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 90,
      padding: EdgeInsets.only(top: 40, bottom: 15),
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: contents.length,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              setState(() {
                _selectedIndex = index;
                sortByContent(_selectedIndex);
              });
            },
            child: Container(
              margin: EdgeInsets.only(left: 20.0),
              decoration: BoxDecoration(
                  color: _selectedIndex == index
                      ? Theme.of(context).primaryColor.withOpacity(0.25)
                      : Colors.grey.withOpacity(0.2),
                  borderRadius: BorderRadius.circular(10.0)),
              child: Padding(
                padding: EdgeInsets.all(8.0),
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

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:xml2json/xml2json.dart';
import 'package:http/http.dart' as http;

import 'widgets/navigation_drawer.dart';

class Welcome extends StatefulWidget {
  const Welcome({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _WelcomeState createState() => _WelcomeState();
}

class _WelcomeState extends State<Welcome> {
  final Xml2Json xml2json = Xml2Json();
  List<dynamic> topStories = [];
  bool isLoading = true;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    NewsTopStories();
  }

  @override
  void initState() {
    super.initState();
  }

  Future<void> NewsTopStories() async {
    final url = Uri.parse('https://www.fct.unl.pt/noticias/rss.xml');
    final response = await http.get(url);

    if (response.statusCode == 200) {
      xml2json.parse(response.body.toString());
      var jsondata = xml2json.toGData();

      if (jsondata != null) {
        var data = json.decode(jsondata);
        setState(() {
          topStories = data['rss']['channel']['item'];
          isLoading = false; // Update the loading state
        });
      } else {
        print('Failed to convert XML to JSON');
      }
    } else {
      print('HTTP request failed with status: ${response.statusCode}');
    }
  }

  void _openNewsLink(String link) async {
    final url = Uri.parse(link);
    if (await canLaunchUrl(url)) {
      await launchUrl(url);
    } else {
      throw 'Could not launch $link';
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(70.0),
        child: Builder(
          builder: (context) {
            return AppBar(
              title: const Text(
                "",
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 24.0,
                  fontWeight: FontWeight.bold,
                  fontFamily: 'RobotoSlab',
                ),
              ),
              centerTitle: true,
              iconTheme: const IconThemeData(color: Colors.black),
              leading: IconButton(
                icon: const Icon(
                  Icons.menu_open_outlined, // Replace with your desired icon
                ),
                onPressed: () {
                  Scaffold.of(context).openDrawer();
                },
              ),
              flexibleSpace: Stack(
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage('assets/images/FCT.png'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Container(
                    color: Colors.white.withOpacity(0.4),
                  ),
                ],
              ),
            );
          },
        ),
      ),
      backgroundColor: const Color(0xFFEDEDED),
      body: isLoading
          ? const Center(
              child: CircularProgressIndicator(), // Circular progress indicator
            )
          : SingleChildScrollView(
              child: Column(
                children: [
                  ListView.builder(
                    shrinkWrap: true,
                    controller: ScrollController(),
                    itemCount: topStories.length,
                    itemBuilder: (BuildContext context, int index) {
                      return GestureDetector(
                        onTap: () {
                          _openNewsLink(topStories[index]['link']['\$t']);
                        },
                        child: Container(
                          decoration: const BoxDecoration(
                            color: Colors.white,
                            boxShadow: [
                              BoxShadow(
                                blurRadius: 2,
                                spreadRadius: 2,
                                color: Colors.black12,
                              ),
                            ],
                          ),
                          child: ListTile(
                            horizontalTitleGap: 10,
                            minVerticalPadding: 10,
                            contentPadding: const EdgeInsets.symmetric(
                              vertical: 10,
                              horizontal: 10,
                            ),
                            title: Text(
                              topStories[index]['title']['\$t'],
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                            ),
                            leading: Image.network(
                              topStories[index]['description']['\$t']
                                  .split('<img')[1]
                                  .split('src="')[1]
                                  .split('"')[0],
                              fit: BoxFit.cover,
                              height: 80,
                              width: 80,
                            ),
                          ),
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
      drawer: const CustomNavigationDrawer(),
    );
  }
}


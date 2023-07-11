import 'package:cached_network_image/cached_network_image.dart';
import 'package:discipulos_flutter/presentation/askLocation/startBeams.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:discipulos_flutter/application/api.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:xml2json/xml2json.dart';
import 'widgets/navigation_drawer.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'dart:typed_data';
import 'dart:convert';

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
  bool _isLoadingImage = false;
  Uint8List? _imageBytes;
  late CloudApi api;
  Map<String, dynamic>? token;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    NewsTopStories();
  }

  @override
  void initState() {
    super.initState();
    initializeApi();
  }

  Future<void> initializeApi() async {
    final json = await rootBundle.loadString('assets/credentials.json');
    setState(() {
      api = CloudApi(json);
    });
    getTokenFromCache().then((value) {
      setState(() {
        token = value;
      });
      _loadImageFromCache();
    });
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
          isLoading = false;
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

  Future<void> _loadImageFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    List<String>? imageBytesStringList = prefs.getStringList('imageBytes');
    if (imageBytesStringList != null) {
      setState(() {
        _imageBytes = Uint8List.fromList(
          imageBytesStringList.map((str) => int.parse(str)).toList(),
        );
      });
    } else {
      await getFromBucket();
    }
  }

  Future<void> getFromBucket() async {
    setState(() {
      _isLoadingImage = true;
    });

    String username = token?['username'];
    String filename = '$username\_pfp';
    Uint8List? bytes = await api.getFile(filename);

    setState(() {
      _imageBytes = bytes;
      _isLoadingImage = false;
    });

    if (_imageBytes != null) {
      await _storeImageInCache(_imageBytes!);
      print('File retrieval successful!');
    } else {
      print('File retrieval failed!');
    }
  }

  Future<void> _storeImageInCache(Uint8List imageBytes) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
        'imageBytes', imageBytes.map((byte) => byte.toString()).toList());
  }

  Future<Map<String, dynamic>?> getTokenFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? tokenString = prefs.getString('token');
    if (tokenString != null) {
      return jsonDecode(tokenString);
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    Beams();
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
                  Icons.menu_open_outlined,
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
              child: CircularProgressIndicator(),
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
                            leading: CachedNetworkImage(
                              imageUrl: topStories[index]['description']['\$t']
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

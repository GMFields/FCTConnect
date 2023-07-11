import 'dart:convert';
import 'dart:ui';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import '../welcome/widgets/navigation_drawer.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:discipulos_flutter/application/api.dart';
import 'package:flutter/services.dart';
import 'searchProfile.dart';
import 'dart:ui' as ui;
import 'package:flutter_image/flutter_image.dart';

class User {
  final String name;
  final String email;
  final String photoUrl;
  final int role;

  User(
      {required this.name,
      required this.email,
      required this.photoUrl,
      required this.role});
}

class SearchApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SearchAppState();
  }
}

class _SearchAppState extends State<SearchApp> {
  TextEditingController _searchController = TextEditingController();
  String _searchText = "";
  List<User> _searchResults = [];
  late CloudApi api;
  late Uint8List? image;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _initializeApi();
    return MaterialApp(
      home: Scaffold(
        drawer: const CustomNavigationDrawer(),
        appBar: AppBar(
          title: TextField(
            controller: _searchController,
            onChanged: (value) {
              setState(() {
                _searchText = value;
              });
            },
            onEditingComplete: () async {
              await performSearch(
                  _searchText); // Call performSearch function when the "tick" button is pressed
              FocusScope.of(context)
                  .unfocus(); // Hide the keyboard after search
            },
            decoration: InputDecoration(
              hintText: 'Search',
            ),
          ),
        ),
        body: Container(
          child: ListView.builder(
            itemCount: _searchResults.length,
            itemBuilder: (context, index) {
              final user = _searchResults[index];
              return GestureDetector(
                onTap: () {
                  openUserProfile(user, _searchText);
                },
                child: Container(
                  padding: EdgeInsets.all(10),
                  margin: EdgeInsets.symmetric(vertical: 5, horizontal: 10),
                  decoration: BoxDecoration(
                    color: Colors.grey[200],
                    borderRadius: BorderRadius.circular(5),
                  ),
                  child: Row(
                    children: [
                      FutureBuilder<Uint8List?>(
                        future: getFromBucket(_searchText),
                        builder: (context, snapshot) {
                          if (snapshot.hasData) {
                            image = snapshot.data;
                            return CircleAvatar(
                              radius: 25,
                              backgroundImage: Image.memory(
                                snapshot.data!,
                              ).image,
                            );
                          } else if (snapshot.hasError) {
                            image = null;
                            print("Error: ${snapshot.error}");
                            return Icon(Icons.person);
                          } else {
                            image = null;
                            return Icon(Icons.person);
                          }
                        },
                      ),
                      SizedBox(width: 10),
                      Text(
                        user.name,
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }

  Future<void> performSearch(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
      'http://helical-ascent-385614.oa.r.appspot.com/rest/search/',
    ).replace(
      queryParameters: {
        'tokenObj': token,
        'username': username,
      },
    );
    print("url: " + url.toString());

    final response = await http.get(url);

    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);

      final user = User(
        name: jsonData['name'],
        email: jsonData['email'],
        photoUrl: "",
        role: jsonData['role'],
      );

      List<User> list = [];
      list.add(user);

      setState(() {
        _searchResults = list;
      });
    } else {
      // Handle other status codes
    }
  }

  Future<Uint8List> loadImageAsset(String assetName) async {
    final ByteData byteData = await rootBundle.load(assetName);
    return byteData.buffer.asUint8List();
  }

  void openUserProfile(User user, String username) async {
    print("open profile");

    Uint8List? imageBytes;
    if (image == null) {
      print("image nulo");
      imageBytes = await loadImageAsset('assets/images/VADER.png');
      print("image nulo");
    }

    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => searchProfile(
              email: user.email,
              image: image ?? imageBytes,
              username: username,
              role: user.role)),
    );

    // Implement the logic to open the user's profile page
    // You can navigate to a new page and pass the user object as arguments
  }

  Future<void> _initializeApi() async {
    final json = await rootBundle.loadString('assets/credentials.json');
    api = CloudApi(json);
  }

  Future<Uint8List?> getFromBucket(String username) async {
    print("passa aqui");

    print("username: " + username);
    String filename = '$username\_pfp';
    Uint8List? bytes = await api.getFile(filename);
    if (bytes == null) {
      print("nulo");
    }
    return bytes;
  }
}

import 'dart:convert';
import 'dart:typed_data';
import 'package:discipulos_flutter/presentation/askLocation/askLocation.dart';
import 'package:discipulos_flutter/presentation/forum/screens/home_screen.dart';
import 'package:discipulos_flutter/presentation/mapas/waypoint.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurants.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:badges/badges.dart' as badges;

import '../../anomaly/anomaly.dart';
import '../../askLocation/startBeams.dart';
import '../../calendar/calendar.dart';
import '../../perfil/profile_page.dart';
import '../welcome.dart';
import '../../search/search.dart';

class CustomNavigationDrawer extends StatefulWidget {
  const CustomNavigationDrawer({Key? key}) : super(key: key);

  @override
  _CustomNavigationDrawerState createState() => _CustomNavigationDrawerState();
}

class _CustomNavigationDrawerState extends State<CustomNavigationDrawer> {
  Uint8List? _imageBytes;
  final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);

  @override
  void initState() {
    super.initState();
    _loadImageFromCache();
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
    }
  }

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            buildHeader(context),
            buildMenuItems(context),
          ],
        ),
      ),
    );
  }

  Future<String?> getTokenFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  Future<String?> getEmailFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('email');
  }

  Widget buildHeader(BuildContext context) {
    return FutureBuilder<String?>(
      future: getTokenFromCache(), // Retrieve the token from the cache
      builder: (context, snapshot) {
        if (snapshot.hasData) {
          String token = snapshot.data!;
          Map<String, dynamic> tokenData = json.decode(token);

          String name = tokenData['username'] ?? '';

          return FutureBuilder<String?>(
            future: getEmailFromCache(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const CircularProgressIndicator();
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              }
              String email = snapshot.data ?? '';

              ImageProvider<Object> imagem;
              if (_imageBytes != null) {
                imagem = MemoryImage(_imageBytes!);
              } else {
                imagem = const AssetImage('assets/images/VADER.png');
              }

              return Container(
                //color: kPrimaryColor,
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      Color.fromARGB(255, 10, 82, 134),
                      Color.fromARGB(255, 10, 82, 134),
                      Color.fromARGB(255, 10, 82, 134)
                    ],
                  ),
                ),
                padding: EdgeInsets.only(
                  top: 16 + MediaQuery.of(context).padding.top,
                  bottom: 16,
                ),
                child: Column(
                  children: [
                    GestureDetector(
                      onTap: () {
                        Navigator.of(context).pushReplacement(MaterialPageRoute(
                            builder: ((context) => const Profile(
                                  email: '',
                                ))));
                      },
                      child: CircleAvatar(
                        radius: 52,
                        backgroundImage: imagem,
                      ),
                    ),
                    const SizedBox(height: 12),
                    Text(
                      name,
                      style: const TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                        color: Color.fromARGB(255, 255, 255, 255),
                      ),
                    ),
                    Text(
                      email,
                      style: const TextStyle(
                        color: Color.fromARGB(255, 255, 255, 255),
                        fontSize: 16,
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        } else if (snapshot.hasError) {
          return Text('Error: ${snapshot.error}');
        } else {
          return const CircularProgressIndicator();
        }
      },
    );
  }

  Widget buildMenuItems(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
          top: 10.0, left: 16.0, right: 16.0, bottom: 8.0),
      child: Wrap(
        runSpacing: 16.0,
        children: [
          ListTile(
            leading: const Icon(Icons.home_outlined),
            title: const Text('Home'),
            onTap: () => Navigator.of(context).pushReplacement(
                MaterialPageRoute(builder: ((context) => const Welcome()))),
          ),
          ListTile(
            leading: const Icon(Icons.person_outline_outlined),
            title: const Text('Perfil'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(MaterialPageRoute(
                  builder: ((context) => const Profile(
                        email: '',
                      ))));
            },
          ),
          ListTile(
            leading: badges.Badge(
              child: const Icon(Icons.forum_outlined),
              badgeContent: const Text(""),
              position: badges.BadgePosition.topStart(),
              showBadge: isPostsUnread,
            ),
            title: const Text('Forum'),
            onTap: () async {
              isPostsUnread = false;
              final prefs = await SharedPreferences.getInstance();
              await prefs.setString('pageCursor', "");
              Navigator.pop(context);
              Navigator.of(context)
                  .push(MaterialPageRoute(builder: ((context) => HomePage())));
            },
          ),
          ListTile(
            leading: const Icon(Icons.calendar_month_outlined),
            title: const Text('Calendário'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(
                  MaterialPageRoute(builder: ((context) => CalendarApp())));
            },
          ),
          ListTile(
            leading: const Icon(Icons.restaurant_outlined),
            title: const Text('Restauração'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(MaterialPageRoute(
                  builder: ((context) => const RestaurantListPage())));
            },
          ),
          ListTile(
            leading: const Icon(Icons.search),
            title: const Text('Procurar'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context)
                  .push(MaterialPageRoute(builder: ((context) => SearchApp())));
            },
          ),
          ListTile(
            leading: badges.Badge(
              child: const Icon(
                  Icons.location_on_outlined), // Replace with your widget
              badgeContent: const Text(""),
              position: badges.BadgePosition.topStart(),
              showBadge: isLocationUnread,
            ),
            title: const Text('Pedir localização'),
            onTap: () {
              isLocationUnread = false;
              Navigator.pop(context);
              Navigator.of(context).push(
                  MaterialPageRoute(builder: ((context) => AskLocationApp())));
            },
          ),
          const Divider(color: Colors.black54),
          ListTile(
            leading: const Icon(Icons.dangerous_outlined),
            title: const Text('Anomalias'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(MaterialPageRoute(
                  builder: ((context) => const AnomalyListPage())));
            },
          ),
          ListTile(
            leading: const Icon(Icons.map_outlined),
            title: const Text('Mapa'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(
                  MaterialPageRoute(builder: ((context) => const MapScreen())));
            },
          ),
        ],
      ),
    );
  }
}

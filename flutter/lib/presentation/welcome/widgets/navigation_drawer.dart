import 'dart:convert';

import 'package:discipulos_flutter/presentation/chat/chatPage.dart';
import 'package:discipulos_flutter/presentation/mapas/waypoint.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../anomaly/anomaly.dart';
import '../../calendar/calendar.dart';
import '../../perfil/profile_page.dart';
import '../welcome.dart';

class CustomNavigationDrawer extends StatelessWidget {
  const CustomNavigationDrawer({Key? key}) : super(key: key);

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
          String email = '';

          return FutureBuilder<String?>(
            future: getEmailFromCache(),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return CircularProgressIndicator();
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              }

              String email =
                  snapshot.data ?? ''; // Use empty string if email is null

              return Container(
                color: Color.fromARGB(255, 237, 237, 237),
                padding: EdgeInsets.only(
                  top: 16 + MediaQuery.of(context).padding.top,
                  bottom: 16,
                ),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 52,
                      backgroundImage: AssetImage('assets/images/VADER.png'),
                    ),
                    SizedBox(height: 12),
                    Text(
                      name,
                      style: TextStyle(
                        fontSize: 24,
                        fontWeight: FontWeight.w600,
                        color: Color.fromARGB(255, 0, 0, 0),
                      ),
                    ),
                    Text(
                      email,
                      style: TextStyle(
                        color: Color.fromARGB(255, 0, 0, 0),
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
          return CircularProgressIndicator();
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
            leading: const Icon(Icons.chat_outlined),
            title: const Text('Chat'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context)
                  .push(MaterialPageRoute(builder: ((context) => ChatPage())));
            },
          ),
          ListTile(
            leading: const Icon(Icons.calendar_month_outlined),
            title: const Text('Calendar'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(MaterialPageRoute(
                  builder: ((context) => GoogleSignInButton())));
            },
          ),
          const Divider(color: Colors.black54),
          ListTile(
            leading: const Icon(Icons.dangerous_outlined),
            title: const Text('Anomalias'),
            onTap: () {
              Navigator.pop(context);
              Navigator.of(context).push(
                  MaterialPageRoute(builder: ((context) => AnomalyListPage())));
            },
          ),
          ListTile(
            leading: const Icon(Icons.account_tree_outlined),
            title: const Text('Settings'),
            onTap: () {},
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

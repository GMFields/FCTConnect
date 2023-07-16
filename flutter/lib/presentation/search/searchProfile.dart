import 'dart:convert';
import 'dart:typed_data';

import 'package:discipulos_flutter/application/api.dart';
import 'package:discipulos_flutter/presentation/search/sharedCalendar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/constants.dart';

class searchProfile extends StatefulWidget {
  final String email;
  final Uint8List? image;
  final String username;
  final int role;

  const searchProfile(
      {Key? key,
      required this.email,
      Uint8List? image,
      required this.username,
      required this.role})
      : image = image ?? null,
        super(key: key);

  @override
  _searchProfile createState() => _searchProfile();
}

class _searchProfile extends State<searchProfile> {
  Map<String, dynamic>? token;
  String? email;
  Uint8List? _imageBytes;
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

  late CloudApi api;

  @override
  void initState() {
    super.initState();
    loadCacheData();
    _initializeApi();
  }

  @override
  void dispose() {
    super.dispose();
  }

  Future<void> loadCacheData() async {
    token = await getTokenFromCache();
    email = email;
    setState(() {});
  }

  Future<void> _initializeApi() async {
    final json = await rootBundle.loadString('assets/credentials.json');
    api = CloudApi(json);
  }

  Future<Map<String, dynamic>?> getTokenFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? tokenString = prefs.getString('token');
    if (tokenString != null) {
      return jsonDecode(tokenString);
    }
    return null;
  }

  String convertRoleToString(int? role) {
    if (role == 1) {
      return "Aluno";
    } else if (role == 2) {
      return "Funcionário";
    } else if (role == 3) {
      return "Docente";
    } else {
      return "Adminstrador";
    }
  }

  @override
  Widget build(BuildContext context) {
    if (token == null) {
      return const CircularProgressIndicator();
    }
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Perfil",
          style: TextStyle(
            color: Color.fromARGB(255, 255, 255, 255),
            fontSize: 20,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: kPrimaryColor,
        iconTheme:
            const IconThemeData(color: Color.fromARGB(255, 255, 255, 255)),
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Stack(
                children: [
                  SizedBox(
                    width: 120,
                    height: 120,
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(100),
                      child: widget.image != null
                          ? Image.memory(
                              widget.image!,
                              fit: BoxFit.cover,
                            )
                          : const Image(
                              image: AssetImage('assets/images/VADER.png'),
                              fit: BoxFit.cover,
                            ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(widget.username, style: kLabelStyle),
              Text(convertRoleToString(widget.role), style: kLabelStyle),
              Text(widget.email ?? "Error! No Mail", style: kLabelStyle),
              const SizedBox(height: 20),
              const SizedBox(
                width: 200,
              ),
              const SizedBox(height: 30),
              const Divider(),
              ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) =>
                            sharedCalendar(username: widget.username)),
                  );
                },
                style: ElevatedButton.styleFrom(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  backgroundColor: kPrimaryColor,
                ),
                child: const Text(
                  'Calendário',
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ),
    );
  }
}

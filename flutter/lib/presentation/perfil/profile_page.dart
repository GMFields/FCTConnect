import 'dart:convert';

import 'package:discipulos_flutter/presentation/login/login_page.dart';
import 'package:discipulos_flutter/presentation/perfil/update_profile.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/constants.dart';
import '../welcome/widgets/navigation_drawer.dart';
import 'widgets/profile_menu.dart';

class Profile extends StatefulWidget {
  final String email;

  const Profile({Key? key, required this.email}) : super(key: key);

  @override
  _Profile createState() => _Profile();
}

class _Profile extends State<Profile> {  
  Map<String, dynamic>? token;
  String? email;

  @override
  void initState() {
    super.initState();
    loadCacheData();
  }

 Future<void> loadCacheData() async {
    token = await getTokenFromCache();
    email = await getEmailFromCache();
    setState(() {});
  }

   Future<Map<String, dynamic>?> getTokenFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? tokenString = prefs.getString('token');
    if (tokenString != null) {
      return jsonDecode(tokenString);
    }
    return null;
  }
 Future<String?> getEmailFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('email');
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
    return CircularProgressIndicator();
    }    
    return Scaffold(
      drawer: const CustomNavigationDrawer(),
      appBar: AppBar(
        title: const Text(
          "Perfil", 
          style: TextStyle(
            color: Color.fromARGB(255, 0, 0, 0),
            fontSize: 20,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: const Color.fromARGB(255, 237, 237, 237),
        iconTheme: const IconThemeData(color: Colors.black), // Set the navigation drawer icon color to black

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
                      child: const Image(image: AssetImage('assets/images/VADER.png')),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Text(token?['username'], style: kLabelStyle),
              Text(convertRoleToString(token?['role'] as int? ?? 0), style: kLabelStyle),
              Text(email ?? "Error! No Mail", style: kLabelStyle),
              const SizedBox(height: 20),
              SizedBox(
                width: 200,
                child: ElevatedButton(
                  onPressed: () {
                     Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const UpdateProfile()),
                      );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 255, 196, 0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                  ),
                  child: Text("Editar Perfil", style: kLabelStyle),
                ),
              ),
              const SizedBox(height: 30),
              const Divider(),
              const SizedBox(height: 10),
              ProfileMenuWidget(title: "Definições", icon: Icons.settings, onPress: () {}, textColor: Colors.black),
              ProfileMenuWidget(title: "Mudar password", icon: Icons.password_rounded, onPress: () {}, textColor: Colors.black),
              ProfileMenuWidget(title: "Logout", icon: Icons.logout, onPress: () {}, textColor: Colors.black),
              ProfileMenuWidget(title: "Apagar conta", icon: Icons.delete, onPress: () {}, textColor: Colors.red),
            ],
          ),
        ),
      ),
    );
  }
}


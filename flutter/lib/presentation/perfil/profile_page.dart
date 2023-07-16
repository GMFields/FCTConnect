// ignore_for_file: use_build_context_synchronously

import 'dart:convert';
import 'dart:typed_data';

import 'package:discipulos_flutter/application/api.dart';
import 'package:discipulos_flutter/presentation/login/login_page.dart';
import 'package:discipulos_flutter/presentation/perfil/update_profile.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../constants/constants.dart';
import '../welcome/widgets/navigation_drawer.dart';
import 'widgets/profile_menu.dart';
import 'package:http/http.dart' as http;

class Profile extends StatefulWidget {
  final String email;

  const Profile({Key? key, required this.email}) : super(key: key);

  @override
  _Profile createState() => _Profile();
}

class _Profile extends State<Profile> {
  Map<String, dynamic>? token;
  String? email;
  Uint8List? _imageBytes;
  TextEditingController _confirmarApagarConta = TextEditingController();
  bool _vaiApagarConta = false;
  late CloudApi api;
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

  @override
  void initState() {
    super.initState();
    loadCacheData();
    _initializeApi();
  }

  @override
  void dispose() {
    _confirmarApagarConta.dispose();
    super.dispose();
  }

  Future<void> loadCacheData() async {
    token = await getTokenFromCache();
    email = await getEmailFromCache();
    setState(() {});
  }

  Future<void> _initializeApi() async {
    final json = await rootBundle.loadString('assets/credentials.json');
    api = CloudApi(json);
    _loadImageFromCache();
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
    setState(() {});

    String username = token?['username'];
    String filename = '$username\_pfp';
    Uint8List? bytes = await api.getFile(filename);

    setState(() {
      _imageBytes = bytes;
    });
  }

  Future<void> _showDeleteAccountConfirmation(BuildContext context) async {
    return showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Apagar conta'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text(
                'Tem a certeza que quer apagar a conta?',
                style: TextStyle(color: Colors.red),
              ),
              const SizedBox(height: 20),
              TextField(
                controller: _confirmarApagarConta,
                decoration: const InputDecoration(
                  labelText: "Tomei conhecimento que quero apagar a conta",
                  hintStyle: TextStyle(color: Colors.red),
                ),
              ),
            ],
          ),
          actions: [
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () {
                final confirmationText = _confirmarApagarConta.text.trim();
                if (confirmationText ==
                    'Tomei conhecimento que quero apagar a conta') {
                  deleteAccount();
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                        content: Text('Texto de confirmação incorreto.')),
                  );
                }
              },
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
              child: const Text('Apagar'),
            ),
          ],
        );
      },
    );
  }

  Future<void> deleteAccount() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
      'http://helical-ascent-385614.oa.r.appspot.com/rest/users/delete/',
    ).replace(
      queryParameters: {'tokenObj': token},
    );

    final response = await http.delete(url);
    if (response.statusCode == 200) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => Login()),
      );
    } else {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => Login()),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    if (token == null) {
      return const CircularProgressIndicator();
    }
    return Scaffold(
      drawer: const CustomNavigationDrawer(),
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
                      child: _imageBytes != null
                          ? Image.memory(
                              _imageBytes!,
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
              Text(token?['username'], style: kLabelStyle),
              Text(convertRoleToString(token?['role'] as int? ?? 0),
                  style: kLabelStyle),
              Text(email ?? "Error! No Mail", style: kLabelStyle),
              const SizedBox(height: 20),
              SizedBox(
                width: 200,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const UpdateProfile()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kPrimaryColor,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                  ),
                  child: const Text(
                    "Editar Perfil",
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 15,
                      fontFamily: 'RobotoSlab',
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              const Divider(),
              const SizedBox(height: 10),
              ProfileMenuWidget(
                  title: "Logout",
                  icon: Icons.logout,
                  onPress: () {
                    logOut();
                    SharedPreferences.getInstance().then((prefs) {
                      prefs.clear().then((value) {
                        Navigator.pushReplacement(
                          context,
                          MaterialPageRoute(builder: (context) => Login()),
                        );
                      });
                    });
                  },
                  textColor: Colors.black
                ),
                ProfileMenuWidget(
                  title: "Mudar password",
                  icon: Icons.password,
                  onPress: () {
                    _showChangePasswordDialog(context);
                  },
                  textColor: const Color.fromARGB(255, 0, 0, 0)
                ),
              ProfileMenuWidget(
                  title: "Apagar conta",
                  icon: Icons.delete,
                  onPress: () {
                    _showDeleteAccountConfirmation(context);
                  },
                  textColor: Colors.red
                ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> _showChangePasswordDialog(BuildContext context) async {
  String newPassword = '';

  await showDialog(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('Mudar password'),
        content: TextField(
          onChanged: (value) {
            newPassword = value;
          },
          obscureText: true,
          decoration: const InputDecoration(hintText: 'Introduza a nova password'),
        ),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            child: const Text('Cancelar'),
          ),
          TextButton(
            onPressed: () {
              _callChangePasswordAPI(newPassword);
              Navigator.of(context).pop();
            },
            child: const Text('Mudar'),
          ),
        ],
      );
    },
  );
}

Future<void> _callChangePasswordAPI(String newPassword) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  final url = Uri.parse(
    'http://helical-ascent-385614.oa.r.appspot.com/rest/users/changepwd/',
  ).replace(
    queryParameters: {'tokenObj': token, 'password' : newPassword},
  );

  final response = await http.post(url);

  if (response.statusCode == 200) {
    print("sucesso");
  } else {
    print("erro");
  }
}


  Future<void> logOut() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }
    final tokenObj = jsonDecode(token);

    final url = Uri.parse(
      'http://helical-ascent-385614.oa.r.appspot.com/rest/users/logout/',
    ).replace(
      queryParameters: {'tokenObj': token},
    );

    final response = await http.delete(url);

    if(response.statusCode == 200) {
      print("sucesso");
    } else {
      print("erro");
    }

  }

}

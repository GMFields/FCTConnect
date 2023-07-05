import 'dart:convert';

import 'package:discipulos_flutter/constants/constants.dart';
import 'package:discipulos_flutter/presentation/perfil/controllers/profile_controllers.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart';
import 'package:shared_preferences/shared_preferences.dart';
//import 'package:http/http.dart' as http;


class UpdateProfile extends StatefulWidget {
  const UpdateProfile({Key? key}) : super(key: key);

  @override
  _UpdateProfileState createState() => _UpdateProfileState();
}

class _UpdateProfileState extends State<UpdateProfile> {
  final ProfileControllers _controllers = ProfileControllers();
  bool _obscureText = true;

  @override
  void initState() {
    super.initState();
    _loadCacheData();
  }

  @override
  void dispose() {
    _controllers.dispose();
    super.dispose();
  } 

  
  Future<void> _loadCacheData() async {
    await _controllers.loadCacheData();
    _controllers.fetchProfileData();  

    setState(() {
      // Trigger a rebuild after loading the cache data
    });
  }

 int convertStringToRole(String roleString) {
  switch (roleString) {
    case "Aluno":
      return 1;
    case "Funcionário":
      return 2;
    case "Docente":
      return 3;
    case "Adminstrador": // Corrected spelling
      return 4;
    default:
      return 0; // Return a default value or handle the case as per your requirements
  }
}



 Future<void> _updateProfile() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  final url = Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/users/update')
      .replace(queryParameters: {'tokenObj': token});
  
  final headers = <String, String>{
    'Content-Type': 'application/json',
  };

  final data = {
    "name": _controllers.nameController.text,
    "password": _controllers.passwordController.text,
    "email": _controllers.emailController.text,
    "role": convertStringToRole(_controllers.roleController.text),
    "state": _controllers.stateController.text,
    "profile": _controllers.profileController.text,
    "landline": _controllers.mobileController.text,
    "phoneNumber": _controllers.phoneController.text,
    "occupation": _controllers.occupationController.text,
    "address": _controllers.addressController.text,
    "nif": _controllers.nifController.text,
    "department": _controllers.departmentController.text,
  };


  final body = jsonEncode(data);

  final response = await put(url, headers: headers, body: body);

  if (response.statusCode == 200) {
    
    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => UpdateProfile()));
  } else {
    throw Exception('Failed to update profile');
    
  }
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
          },
          icon: const Icon(Icons.arrow_back),
          color: Colors.black,
        ),
        title: const Text(
          "Editar perfil",
          style: TextStyle(
            color: Color.fromARGB(255, 0, 0, 0),
            fontSize: 20,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: Color.fromARGB(255, 237, 237, 237),
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
                      child: const Image(
                        image: AssetImage('assets/images/VADER.png'),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      width: 35,
                      height: 35,
                      decoration: kBoxDecorationStyle,
                      child: const Icon(
                        Icons.camera_enhance_sharp,
                        color: Colors.black,
                        size: 20,
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 50),
              Form(
                child: Column(
                  children: [
                    TextFormField(
                      controller: _controllers.emailController,
                      readOnly: true,
                      decoration: InputDecoration(
                        labelText: "E-mail",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.passwordController,
                      obscureText: _obscureText,
                      readOnly: true,
                      enableInteractiveSelection: true,
                      decoration: InputDecoration(
                        labelText: "Password",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                        suffixIcon: IconButton(
                          icon: Icon(_obscureText ? Icons.visibility : Icons.visibility_off),
                          onPressed: () {
                            setState(() {
                              _obscureText = !_obscureText;
                            });
                          },
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.roleController,
                      readOnly: true,
                      decoration: InputDecoration(
                        labelText: "Função",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.departmentController,
                      readOnly: true,
                      decoration: InputDecoration(
                        labelText: "Departamento",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 20),
                     TextFormField(
                      controller: _controllers.nameController,
                      decoration: InputDecoration(
                        labelText: "Nome",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.profileController,
                      decoration: InputDecoration(
                        labelText: "Perfil",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'O campo é obrigatório.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.phoneController,
                      decoration: InputDecoration(
                        labelText: "Telefone",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'O campo é obrigatório.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.mobileController,
                      decoration: InputDecoration(
                        labelText: "Telemóvel",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'O campo é obrigatório.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.occupationController,
                      decoration: InputDecoration(
                        labelText: "Ocupação",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'O campo é obrigatório.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.addressController,
                      decoration: InputDecoration(
                        labelText: "Morada",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'O campo é obrigatório.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 20),
                    TextFormField(
                      controller: _controllers.nifController,
                      decoration: InputDecoration(
                        labelText: "NIF",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                      ),
                      validator: (value) {
                        if (value == null || value.isEmpty) {
                          return 'O campo é obrigatório.';
                        }
                        return null;
                      },
                    ),
                    const SizedBox(height: 50),
                    Container(
                      height: 50,
                      width: 100,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(10),
                        color: Color.fromARGB(255, 255, 196, 0),
                      ),
                      child: ElevatedButton(
                        onPressed: () {
                              _updateProfile();

                        },
                      style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 255, 196, 0),
                      shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                      ),
                    ),
                        child: Text("Salvar", style: kLabelStyle),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

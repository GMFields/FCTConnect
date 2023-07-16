import 'package:discipulos_flutter/presentation/perfil/controllers/profile_controllers.dart';
import 'package:discipulos_flutter/presentation/perfil/profile_page.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:discipulos_flutter/constants/constants.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:discipulos_flutter/application/api.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart';
import 'dart:typed_data';
import 'dart:convert';
import 'dart:io';

class UpdateProfile extends StatefulWidget {
  const UpdateProfile({Key? key}) : super(key: key);

  @override
  _UpdateProfileState createState() => _UpdateProfileState();
}

class _UpdateProfileState extends State<UpdateProfile> {
  final ProfileControllers _controllers = ProfileControllers();
  bool _obscureText = true;
  late File _image;
  Uint8List? _imageBytes;
  final picker = ImagePicker();
  late CloudApi api;
  String? _imageName;
  bool _locationPermissionGranted = false;
  Map<String, dynamic>? token;
  bool _isLoadingImage = false;
  final _formKey = GlobalKey<FormState>();
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

  @override
  void initState() {
    super.initState();
    _initializeApi();
  }

  Future<void> _initializeApi() async {
    final json = await rootBundle.loadString('assets/credentials.json');
    api = CloudApi(json);
    _loadCacheData();
    _loadImageFromCache();
  }

  Future<void> _loadCacheData() async {
    await _controllers.loadCacheData();
    _controllers.fetchProfileData();
    token = await getTokenFromCache();
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

  Future<Uint8List> compressImage(String imagePath) async {
    final imageBytes = File(imagePath).readAsBytesSync();
    final compressedImageBytes = await FlutterImageCompress.compressWithList(
      imageBytes,
      minHeight: 800,
      minWidth: 1000,
      quality: 70,
    );
    return compressedImageBytes;
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

  void _selectImage() async {
    PermissionStatus status = await Permission.location.request();
    setState(() {
      _locationPermissionGranted = status.isGranted;
    });
    String username = token?['username'];
    String fileName = '$username\_pfp';

    if (_locationPermissionGranted) {
      // ignore: use_build_context_synchronously
      final imageSource = await showDialog<ImageSource>(
        context: context,
        builder: (BuildContext context) => AlertDialog(
          title: const Text("Selecione a origem da imagem"),
          actions: [
            ElevatedButton(
              onPressed: () => Navigator.pop(context, ImageSource.camera),
              child: const Text("Camera"),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pop(context, ImageSource.gallery),
              child: const Text("Galeria"),
            ),
          ],
        ),
      );

      if (imageSource != null) {
        final pickedFile = await picker.pickImage(source: imageSource);
        setState(() {
          if (pickedFile != null) {
            _image = File(pickedFile.path);
            _imageBytes = _image.readAsBytesSync();
            _imageName = fileName.split('/').last;
            _saveImageToBucket();
          } else {
            AlertDialog(
              actions: [
                ElevatedButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text("Imagem inválida"),
                ),
              ],
            );
          }
        });
      }
    } else {
      print('Location permission not granted');
    }
  }

  void _saveImageToBucket() async {
    final compressedImage = await compressImage(_image.path);
    final response = await api.save(
      _imageName!,
      compressedImage,
      _locationPermissionGranted,
    );
    print(response.downloadLink);
    await _storeImageInCache(compressedImage);
    Navigator.pushReplacement(
        context,
        MaterialPageRoute(
            builder: (context) => Profile(
                  email: _controllers.emailController.text,
                )));
  }

  Future<void> _storeImageInCache(Uint8List imageBytes) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setStringList(
        'imageBytes', imageBytes.map((byte) => byte.toString()).toList());
  }

  Future<void> getFromBucket() async {
    setState(() {
      _isLoadingImage = true;
    });

    String username = token?['username'];
    String filename = '$username\_pfp';
    Uint8List? bytes = await api.getFile(filename);
    print("Bytes: $bytes");

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

  @override
  void dispose() {
    _controllers.dispose();
    super.dispose();
  }

  int convertStringToRole(String roleString) {
    switch (roleString) {
      case "Aluno":
        return 1;
      case "Funcionário":
        return 2;
      case "Docente":
        return 3;
      case "Adminstrador":
        return 4;
      default:
        return 0;
    }
  }

  Future<void> _updateProfile() async {
    final form = _formKey.currentState;
    if (form == null || !form.validate()) {
      return;
    }
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
            'https://helical-ascent-385614.oa.r.appspot.com/rest/users/update')
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
      Navigator.pushReplacement(
          context,
          MaterialPageRoute(
              builder: (context) => Profile(
                    email: _controllers.emailController.text,
                  )));
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
          color: const Color.fromARGB(255, 255, 255, 255),
        ),
        title: const Text(
          "Editar perfil",
          style: TextStyle(
            color: Color.fromARGB(255, 255, 255, 255),
            fontSize: 20,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: kPrimaryColor,
      ),
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Stack(
                children: [
                  GestureDetector(
                    onTap: () {
                      _selectImage();
                    },
                    child: SizedBox(
                      width: 120,
                      height: 120,
                      child: ClipRRect(
                        borderRadius: BorderRadius.circular(100),
                        child: _isLoadingImage
                            ? const CircularProgressIndicator()
                            : _imageBytes != null
                                ? Image.memory(_imageBytes!, fit: BoxFit.cover)
                                : const Image(
                                    image:
                                        AssetImage('assets/images/VADER.png'),
                                    fit: BoxFit.cover,
                                  ),
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
                key: _formKey,
                child: Column(
                  children: [
                    TextFormField(
                      controller: _controllers.emailController,
                      readOnly: true,
                      decoration: InputDecoration(
                        labelText: "E-mail",
                        labelStyle: kLabelStyle,
                        enabledBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        filled: true,
                        fillColor: Colors.white,
                        suffixIcon: IconButton(
                          icon: Icon(_obscureText
                              ? Icons.visibility
                              : Icons.visibility_off),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                          borderSide: const BorderSide(color: Colors.grey),
                          borderRadius: BorderRadius.circular(10.0),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderSide: const BorderSide(color: Colors.black),
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
                      ),
                      child: ElevatedButton(
                        onPressed: () {
                          _updateProfile();
                        },
                        style: ElevatedButton.styleFrom(
                          backgroundColor: kPrimaryColor,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(30.0),
                          ),
                        ),
                        child: const Text("Guadar",
                            style: TextStyle(
                              color: Colors.white,
                              fontSize: 15.0,
                            )),
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

import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';
import 'package:discipulos_flutter/application/api.dart';


void main() {
  runApp(App());
}

class App extends StatelessWidget {
  const App({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: MyApp(),
    );
  }
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late File _image;
  Uint8List? _imageBytes;
  final picker = ImagePicker();
  late CloudApi api;
  String ? _imageName;
  bool _locationPermissionGranted = false;

  void initState() {
    super.initState();
    rootBundle.loadString('assets/credentials.json').then((json) => api = CloudApi(json));
  }

  void _getImage() async {
    PermissionStatus status = await Permission.location.request();
    setState(() {
      _locationPermissionGranted = status.isGranted;
    });

    if (_locationPermissionGranted) {
      final pickedFile = await picker.pickImage(source: ImageSource.gallery);
      setState(() {
        if (pickedFile != null) {
          _image = File(pickedFile.path);
          _imageBytes = _image.readAsBytesSync();
        } else {
          print('No image selected');
        }
      });
    } else {
      print('Location permission not granted');
      // Handle the case when location permission is not granted
    }
  }

  void _saveImage() async{
    final response = await api.save(_imageName!, _imageBytes!, _locationPermissionGranted);
    print(response.downloadLink);
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Welcome page!"),
      ),
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              GestureDetector(
                onTap: _getImage,
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(140),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withOpacity(0.5),
                        spreadRadius: 10,
                        blurRadius: 5,
                        offset: Offset(0, 3),
                      ),
                    ],
                  ),
                  child: CircleAvatar(
                    radius: 120,
                    backgroundImage: _imageBytes != null
                        ? Image.memory(_imageBytes!).image
                        : AssetImage("assets/images/image.png"),
                  ),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Text(
                "Welcome, username",
                style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

import 'dart:io';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'package:permission_handler/permission_handler.dart';

import '../../application/api.dart';


class WelcomePage extends StatefulWidget {
  final String username;

  WelcomePage({required this.username});

  @override
  _WelcomePageState createState() => _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {
  late File _image;
  Uint8List? _imageBytes;
  final picker = ImagePicker();
  late CloudApi api;
  String ? _imageName;
  bool _locationPermissionGranted = false;

  void initState() {
    super.initState();
    rootBundle.loadString('assets/credentials.json').then((json) =>
    api = CloudApi(json));
  }

  void _getImage() async {
    PermissionStatus status = await Permission.location.request();
    setState(() {
      _locationPermissionGranted = status.isGranted;
    });
   


    if (_locationPermissionGranted) {
      // ignore: use_build_context_synchronously
      final imageSource = await showDialog<ImageSource>(
        context: context,
        builder: (BuildContext context) =>
            AlertDialog(
              title: const Text("Select Image Source"),
              actions: [
                ElevatedButton(
                  onPressed: () => Navigator.pop(context, ImageSource.camera),
                  child: const Text("Camera"),
                ),
                ElevatedButton(
                  onPressed: () => Navigator.pop(context, ImageSource.gallery),
                  child: const Text("Gallery"),
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
            _imageName = _image.path
                .split('/')
                .last;
          } else {
            print('No image selected');
          }
        });
      }
    } else {
      print('Location permission not granted');
      // Handle the case when location permission is not granted
    }
  }

  void _saveImage() async {
    final response = await api.save(
        _imageName!, _imageBytes!, _locationPermissionGranted);
    print(response.downloadLink);
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Welcome'),
      ),
      body: Center(
        child: _imageBytes != null
            ? Stack(
          children: [
            CircleAvatar(
              radius: 50,
              backgroundImage: FileImage(_image!),
            ),
            Align(
              alignment: Alignment.bottomCenter,
              child: ElevatedButton(
                onPressed: _saveImage,
                child: const Text('Save to cloud'),
              ),
            ),
          ],
        )
            : Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            GestureDetector(
              onTap: _getImage,
              child: Container(
                width: 100,
                height: 100,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.blue,
                ),
                child: const Icon(
                  Icons.add_a_photo,
                  color: Colors.white,
                  size: 50,
                ),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'Welcome, ${widget.username}!',
              style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 20),
            const CircleAvatar(
              radius: 50,
              child: Text('No Image'),
            ),
          ],
        ),
      ),
    );
  }
}
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/services.dart';
import 'package:discipulos_flutter/application/api.dart';
import 'package:permission_handler/permission_handler.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Welcome!'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late File _image;
  Uint8List? _imageBytes;
  final picker = ImagePicker();
  late CloudApi api;
  String ? _imageName;
  bool _locationPermissionGranted = false;

  @override
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
      final imageSource = await showDialog<ImageSource>(
        context: context,
        builder: (BuildContext context) => AlertDialog(
          title: Text("Select Image Source"),
          actions: [
            ElevatedButton(
              onPressed: () => Navigator.pop(context, ImageSource.camera),
              child: Text("Camera"),
            ),
            ElevatedButton(
              onPressed: () => Navigator.pop(context, ImageSource.gallery),
              child: Text("Gallery"),
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
            _imageName = _image.path.split('/').last;
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

  void _saveImage() async{
    final response = await api.save(_imageName!, _imageBytes!, _locationPermissionGranted);
    print(response.downloadLink);
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: _imageBytes == null
            ? Text('No image selected.')
            : Stack(
          children: [
            Image.memory(_imageBytes!),
            Align(
              alignment: Alignment.bottomCenter,
              child: ElevatedButton(
                onPressed: _saveImage,
                child: Text('Save to cloud'),
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _getImage,
        tooltip: 'Select image',
        child: Icon(Icons.add_a_photo),
      ),
    );
  }
}

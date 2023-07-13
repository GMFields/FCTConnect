import 'dart:typed_data';
import 'package:geocoding/geocoding.dart';
import 'package:geolocator/geolocator.dart';
import 'package:googleapis_auth/auth_io.dart' as auth;
import 'package:gcloud/storage.dart';
import 'package:mime/mime.dart';
import 'dart:io';



class CloudApi {
  final auth.ServiceAccountCredentials _credentials;
  auth.AutoRefreshingAuthClient? _client;

  CloudApi(String json) : _credentials = auth.ServiceAccountCredentials.fromJson(json);

  Future<ObjectInfo> save(String name, Uint8List imgBytes, bool locationPermissionGranted) async {
    if(_client == null) {
      _client = await auth.clientViaServiceAccount(_credentials, Storage.SCOPES);
    }

    var storage = Storage(_client!, 'Image Upload Google Storage');
    var bucket = storage.bucket('helical-ascent-385614.appspot.com');
    final timestamp = DateTime.now().millisecondsSinceEpoch;
    final type = lookupMimeType(name);


    if (locationPermissionGranted) {
      final position = await Geolocator.getCurrentPosition();
      final placemarks = await placemarkFromCoordinates(position.latitude, position.longitude);
      String city = placemarks.first.locality ?? '';
      
    return await bucket.writeBytes(name, imgBytes,
        predefinedAcl: PredefinedAcl.publicRead,
        metadata: ObjectMetadata(
          contentType: type,
          custom: {
            'timestamp': '$timestamp',
            'latitude': '${position.latitude}',
            'longitude': '${position.longitude}',
            'city': city,
            'locationPermission': locationPermissionGranted.toString(),
          },
        ));
    }
    else {
      return await bucket.writeBytes(name, imgBytes,
          predefinedAcl: PredefinedAcl.publicRead,
          metadata: ObjectMetadata(
              contentType: type,
              custom: {
                'timestamp': '$timestamp',
                'latitude': '',
                'longitude': '',
                'city': '',
                'locationPermission': 'false',
              }
          ));
    }
  } 


  Future<Uint8List?> getFile(String name) async {
    if (_client == null) {
      _client = await auth.clientViaServiceAccount(_credentials, Storage.SCOPES);
    }

    var storage = Storage(_client!, 'Image Upload Google Storage');
    var bucket = storage.bucket('helical-ascent-385614.appspot.com');

    try {
      var object = await bucket.read(name);
      var bytes = <int>[];
      await for (var chunk in object) {
        bytes.addAll(chunk);
      }
      return Uint8List.fromList(bytes);
    } catch (e) {
      print('Error retrieving file: $e');
      return null;
    }
  }
  
/*
  Future<List<int>> getFile(String name) async {
  if (_client == null) {
    _client = await auth.clientViaServiceAccount(_credentials, Storage.SCOPES);
  }

  var storage = Storage(_client!, 'Image Upload Google Storage');
  var bucket = storage.bucket('helical-ascent-385614.appspot.com');

  final object = bucket.absoluteObjectName(name);
  final Stream<List<int>> stream = await bucket.read(object);
  final List<int> fileBytes = await stream.reduce((a, b) => [...a, ...b]);
  
  return fileBytes;
}
*/


}

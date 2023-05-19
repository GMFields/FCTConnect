import 'dart:typed_data';

import 'package:googleapis_auth/auth_io.dart' as auth;
import 'package:gcloud/storage.dart';
import 'package:mime/mime.dart';
import 'package:geolocator/geolocator.dart';
import 'package:geocoding/geocoding.dart';



class CloudApi {
  final auth.ServiceAccountCredentials _credentials;
  auth.AutoRefreshingAuthClient ? _client;


  CloudApi(String json)
      : _credentials = auth.ServiceAccountCredentials.fromJson(json);



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
          metadata: ObjectMetadata(
              contentType: type,
              custom: {
                'timestamp': '$timestamp',
                'latitude': '${position.latitude}',
                'longitude': '${position.longitude}',
                'city': city,
                'locationPermission': locationPermissionGranted.toString(),
              }
          ));
    }
    else {
      return await bucket.writeBytes(name, imgBytes,
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


}
import 'dart:convert';
import 'dart:math' as math;
import 'package:discipulos_flutter/presentation/mapas/waypoint.dart';
import 'package:discipulos_flutter/presentation/mapas/waypoint_api.dart';
import 'package:discipulos_flutter/presentation/mapas/waypointdata.dart';
import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart' as geo;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:location/location.dart' as loc;
import 'package:shared_preferences/shared_preferences.dart';


class MapLogic {
    loc.LocationData? currentLocation;
    loc.Location location = loc.Location();
      List<Marker> _markers = [];


    double _toRadians(double degrees) {
    return degrees * (math.pi / 180);
  }

  double calculateDistance(LatLng point1, LatLng point2) {
    const int earthRadius = 6371000; 

    double lat1 = point1.latitude;
    double lon1 = point1.longitude;
    double lat2 = point2.latitude;
    double lon2 = point2.longitude;

    double dLat = _toRadians(lat2 - lat1);
    double dLon = _toRadians(lon2 - lon1);

    double a = math.sin(dLat / 2) * math.sin(dLat / 2) +
        math.cos(_toRadians(lat1)) *
            math.cos(_toRadians(lat2)) *
            math.sin(dLon / 2) *
            math.sin(dLon / 2);
    double c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a));
    double distance = earthRadius * c;

    return distance;
  }

 int getClosestCoordinateIndex(List<LatLng> coordinates) {
    double smallestDistance = double.maxFinite;
    int closestIndex = 0;
    LatLng currentLatLng = LatLng(
      currentLocation!.latitude!,
      currentLocation!.longitude!,
    );

    for (int i = 0; i < coordinates.length; i++) {
      double distance = calculateDistance(currentLatLng, coordinates[i]);
      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestIndex = i;
      }
    }
    return closestIndex;
  }

   List<LatLng> updatePolylineCoordinates(List<LatLng> coordinates) {
    List<LatLng> updatedCoordinates = List.from(coordinates);
    updatedCoordinates.removeRange(0, getClosestCoordinateIndex(coordinates));
    return updatedCoordinates;
  }

    Future<String> getAddress(double latitude, double longitude) async {
    List<geo.Placemark> placemarks = await geo.placemarkFromCoordinates(latitude, longitude);

    if (placemarks.isNotEmpty) {
      return placemarks[0].locality.toString();
    } else {
      return 'No address found';
    }
  }

   Future<void> removeWaypointFromCache(String waypointID) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String cachedMarkers = prefs.getString('markers') ?? '';
    if (cachedMarkers.isNotEmpty) {
      List<Waypoint> waypoints = parseWaypointsFromCache(cachedMarkers);
      waypoints.removeWhere((waypoint) => waypoint.wayPointID == waypointID);
      cachedMarkers = jsonEncode(waypoints.map((waypoint) => waypoint.toJson()).toList());
      prefs.setString('markers', cachedMarkers);
    }
  }

  Future<void> addWaypointToCache(Waypoint waypoint) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String cachedMarkers = prefs.getString('markers') ?? '';
    List<Waypoint> waypoints = [];
    if (cachedMarkers.isNotEmpty) {
      waypoints = parseWaypointsFromCache(cachedMarkers);
    }
    waypoints.add(waypoint);
    cachedMarkers = jsonEncode(waypoints.map((waypoint) => waypoint.toJson()).toList());
    prefs.setString('markers', cachedMarkers);
  }

  List<Waypoint> parseWaypointsFromCache(String cachedMarkers) {
    List<dynamic> decodedJson = jsonDecode(cachedMarkers);
    return decodedJson.map((json) => Waypoint.fromJson(json)).toList();
  }

    Future<void> deleteMarker(BuildContext context, String waypointID) async {
    print(waypointID);
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text("Deseja mesmo apagar o marker?"),
          actions: [
            ElevatedButton(
              onPressed: () async {
                await removeWaypointFromCache(waypointID);
                await MapService.deleteWaypoint(waypointID);
                _markers.removeWhere(
                (element) => element.markerId.value == waypointID);
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => const MapScreen()),
                );
              },
              child: const Text('Sim'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Não'),
            ),
          ],
        );
      },
    );
  }

  void addMarker(BuildContext context, LatLng latLng) {
  double latitude = latLng.latitude;
  double longitude = latLng.longitude;

  showDialog(
    context: context,
    builder: (context) {
      String name = '';
      String errorMessage = '';

      return StatefulBuilder(
        builder: (context, setState) {
          return AlertDialog(
            title: const Text("Digite o nome do marker"),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextField(
                  onChanged: (value) {
                    setState(() {
                      name = value;
                    });
                  },
                ),
                if (errorMessage.isNotEmpty)
                  Text(
                    errorMessage,
                    style: const TextStyle(color: Colors.red),
                  ),
              ],
            ),
            actions: [
              ElevatedButton(
                onPressed: () async {
                  if (name.isNotEmpty) {
                    Waypoint w =
                        await MapService.addWaypoint(latitude, longitude, name);
                        await addWaypointToCache(w);
                    setState(() {
                      _markers.add(Marker(
                        markerId: MarkerId(w.wayPointID),
                        position: LatLng(w.latitude, w.longitude),
                        infoWindow: InfoWindow(
                          title: w.name,
                          snippet: /*$address,*/'${w.latitude}, ${w.longitude}',
                          ),
                        icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueViolet),
                      ));
                    });
                    Navigator.of(context).pop();
                    Navigator.pushReplacement(context, MaterialPageRoute(builder: (context) => const MapScreen()));
                    setState(() {});
                  } else {
                    setState(() {
                      errorMessage = "Digite um nome válido.";
                    });
                  }
                },
                child: const Text('Adicionar'),
              ),
              ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text('Cancelar'),
              ),
            ],
          );
        },
      );
    },
  );
}
  
}

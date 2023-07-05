import 'package:discipulos_flutter/presentation/mapas/waypoint_api.dart';
import 'package:discipulos_flutter/presentation/mapas/waypointdata.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_directions_api/google_directions_api.dart' as dir;
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geocoding/geocoding.dart' as geo;
import 'package:location/location.dart' as loc;
import 'package:flutter/material.dart';
import 'dart:math' as math;


class MapScreen extends StatefulWidget {
  const MapScreen({Key? key}) : super(key: key);

  @override
  _MapScreenState createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  GoogleMapController? _mapController;
  List<Marker> _markers = [];
  bool _isLoading = true;
  loc.LocationData? currentLocation;
  List<Polyline> _polylines = [];
  Marker? _userLocationMarker;
  List<Widget> _routeInfoWidgets = [];
  dir.Leg? leg;
  loc.Location location = loc.Location();

  @override
  void initState() {
    super.initState();
    _loadWaypoints();
    getCurrentLocation();
  }

  void getCurrentLocation() async {
    bool serviceEnabled;
    loc.PermissionStatus permissionStatus;

    serviceEnabled = await location.serviceEnabled();
    if (!serviceEnabled) {
      serviceEnabled = await location.requestService();
      if (!serviceEnabled) {
        return;
      }
    }

    permissionStatus = await location.hasPermission();
    if (permissionStatus == loc.PermissionStatus.denied) {
      permissionStatus = await location.requestPermission();
      if (permissionStatus != loc.PermissionStatus.granted) {
        return;
      }
    }

    location.onLocationChanged.listen((loc.LocationData newLocation) {
      setState(() {
        currentLocation = newLocation;
        updateMarkerPosition();
        updateRoute();
      });
    });

    currentLocation = await location.getLocation();

/*

    if (currentLocation != null) {
      setState(() {
        _userLocationMarker = Marker(
          markerId: MarkerId('userLocation'),
          position: LatLng(
            currentLocation!.latitude!,
            currentLocation!.longitude!,
          ),
          infoWindow: InfoWindow(title: 'Você está aqui'),
        );
        _markers.add(_userLocationMarker!);
      });
    } else {
      // Erro ao obter a localização
    }
    */
    
  }

  void updateMarkerPosition() {
    if (_userLocationMarker != null && currentLocation != null) {
      setState(() {
        _markers.remove(_userLocationMarker!);
        _userLocationMarker = Marker(
          markerId: const MarkerId('userLocation'),
          position: LatLng(
            currentLocation!.latitude!,
            currentLocation!.longitude!,
          ),
          infoWindow: const InfoWindow(title: 'Você está aqui'),
        );
        _markers.add(_userLocationMarker!);
      });
    }
  }

void updateRoute() {
  if (_polylines.isNotEmpty && currentLocation != null) {
    setState(() {
      List<LatLng> updatedPoints = updatePolylineCoordinates(_polylines.first.points);
      Polyline polyline = Polyline(
        polylineId: _polylines.first.polylineId,
        points: updatedPoints,
        color: _polylines.first.color,
        width: _polylines.first.width,
      );
      _polylines = [polyline];

      if (_routeInfoWidgets.isNotEmpty) {
        final distanceText = 'Distância: ${leg!.distance!.text}';
        final durationText = 'Duração estimada: ${leg!.duration!.text}';
        _routeInfoWidgets = [
          Positioned(
            top: 16,
            left: 16,
            child: Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(distanceText),
                  Text(durationText),
                ],
              ),
            ),
          ),
        ];
      }
    });
  }
}

  List<LatLng> updatePolylineCoordinates(List<LatLng> coordinates) {
    List<LatLng> updatedCoordinates = List.from(coordinates);
    updatedCoordinates.removeRange(0, getClosestCoordinateIndex(coordinates));
    return updatedCoordinates;
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

  double _toRadians(double degrees) {
    return degrees * (math.pi / 180);
  }

  void removeUserLocationMarker() {
    setState(() {
      _markers.remove(_userLocationMarker);
      _userLocationMarker = null;
    });
  }

  void removeLatestRoute() {
    setState(() {
      _polylines.removeLast();
    });
  }

  void removeMarkerAndRoute() {
    removeUserLocationMarker();
    removeLatestRoute();
    _routeInfoWidgets.removeRange(0, _routeInfoWidgets.length);
    
  }

  void _calculateRouteToMarker(double latitude, double longitude) async {
    dir.DirectionsService.init('AIzaSyAZELnglG_oCx4z-ITNEq0YNpmiFrctW5s');
 
    double startLat = currentLocation!.latitude!;
    double startLng = currentLocation!.longitude!;
    double endLat = latitude;
    double endLng = longitude;

    final directionsService = dir.DirectionsService();
    final request = dir.DirectionsRequest(
      origin: '${startLat},${startLng}',
      destination: '${endLat},${endLng}',
      travelMode: dir.TravelMode.walking,
    );

    directionsService.route(request,
        (dir.DirectionsResult result, dir.DirectionsStatus? status) async {
      if (status == dir.DirectionsStatus.ok) {
        final route = result.routes!.first;
        leg = result.routes!.first.legs!.first;

        PolylinePoints polylinePoints = PolylinePoints();
        List<LatLng> convertedPolylineCoordinates = [];

        for (var step in leg!.steps!) {
          for (var point in polylinePoints.decodePolyline(step.polyline!.points!)) {
            double lat = point.latitude;
            double lng = point.longitude;
            convertedPolylineCoordinates.add(LatLng(lat, lng));
          }
        }

        Polyline polyline = Polyline(
          polylineId: const PolylineId('route'),
          points: convertedPolylineCoordinates,
          color: Colors.blue,
          width: 3,
        );
        setState(() {
          _polylines = [polyline];
          _routeInfoWidgets = [
            Positioned(
              top: 16,
              left: 16,
              child: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Distância: ${leg!.distance!.text}'),
                    Text('Duração estimada: ${leg!.duration!.text}'),
                  ],
                ),
              ),
            ),
          ];
        });
      } else {
        print('Falha ao calcular a rota: $status');
      }
    });
  }

  Future<String> getAddress(double latitude, double longitude) async {
    List<geo.Placemark> placemarks = await geo.placemarkFromCoordinates(latitude, longitude);

    if (placemarks.isNotEmpty) {
      return placemarks[0].locality.toString();
    } else {
      return 'No address found';
    }
  }

  Future<void> _loadWaypoints() async {
    try {
      final waypoints = await MapService.getWaypoints();
      List<Marker> tempMarkers = [];

      for (Waypoint waypoint in waypoints) {
        double latitude = waypoint.latitude;
        double longitude = waypoint.longitude;
        String address = await getAddress(latitude, longitude);

        tempMarkers.add(
          Marker(
            markerId: MarkerId(waypoint.wayPointID),
            position: LatLng(latitude, longitude),
            infoWindow: InfoWindow(
              title: waypoint.name,
              snippet: '$address, ${waypoint.latitude}, ${waypoint.longitude}',
            ),
            icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueViolet),
            onTap: () {
              showDialog(
                context: context,
                builder: (context) {
                  return AlertDialog(
                    title: Text(waypoint.name),
                    content: Text(address),
                    actions: [
                      ElevatedButton(
                        onPressed: () {
                          _calculateRouteToMarker(waypoint.latitude, waypoint.longitude);
                          Navigator.of(context).pop();
                        },
                        child: const Text('Obter direções'),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        child: const Text('Fechar'),
                      ),
                    ],
                  );
                },
              );
            },
          ),
        );
      }
      setState(() {
        _markers = tempMarkers;
        _isLoading = false;
      });
    } catch (e) {
      print('Failed to load waypoints: $e');
    }
  }

  static const initialPos = CameraPosition(
    target: LatLng(38.659784, -9.202765),
    zoom: 18,
  );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Mapa",
          style: TextStyle(
            color: Color.fromARGB(255, 0, 0, 0),
            fontSize: 20,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: const Color.fromARGB(255, 237, 237, 237),
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: Stack(
        children: [
          GoogleMap(
            polylines: Set<Polyline>.from(_polylines),
            initialCameraPosition: initialPos,
            markers: Set<Marker>.from(_markers),
            onMapCreated: (controller) => _mapController = controller,
            myLocationEnabled: true,
            myLocationButtonEnabled: false,
            compassEnabled: false,
            zoomControlsEnabled: false,
          ),
          if (_isLoading)
            const Center(
              child: CircularProgressIndicator(),
            ),
          ..._routeInfoWidgets,
         // if (_userLocationMarker != null)
            Positioned(
              top: 16,
              right: 16,
              child: FloatingActionButton(
                onPressed: removeMarkerAndRoute,
                child: const Icon(Icons.close),
              ),
            ),
        ],
      ),
    );
  }
}

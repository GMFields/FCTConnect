import 'package:discipulos_flutter/presentation/mapas/waypoint_api.dart';
import 'package:discipulos_flutter/presentation/mapas/waypointdata.dart';
import 'package:google_directions_api/google_directions_api.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geocoding/geocoding.dart' as geo;
import 'package:location/location.dart' as loc;
import 'package:flutter/material.dart';
class MapScreen extends StatefulWidget {


  const MapScreen({super.key});

  @override
  _MapScreenState createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  // ignore: unused_field
  GoogleMapController? _mapController;
  List<Marker> _markers = [];
  bool _isLoading = true;
  loc.LocationData? currentLocation;



  @override
  void initState() {
    super.initState();
    _loadWaypoints();
    getCurrentLocation();
  }

void getCurrentLocation() async {
  loc.Location location = loc.Location();
  currentLocation = await location.getLocation();
}

  
  void _calculateRouteToMarker(double latitude, double longitude) async {
  DirectionsService.init('AIzaSyAZELnglG_oCx4z-ITNEq0YNpmiFrctW5s');
  loc.Location location = loc.Location();
  loc.LocationData currentLocation = await location.getLocation();
  
  double startLat = currentLocation.latitude!;
  double startLng = currentLocation.longitude!;
  double endLat = latitude;
  double endLng = longitude;
  print('startLat: $startLat');
  print('startLng: $startLng');
  print('endLat: $endLat');
  print('endLng: $endLng');
  
  final directionsService = DirectionsService();
  final request = DirectionsRequest(
    origin: '${startLat},${startLng}',
    destination: '${endLat},${endLng}',
    travelMode: TravelMode.walking,
  );
  
  directionsService.route(request, (DirectionsResult result, DirectionsStatus? status) {
    if (status == DirectionsStatus.ok) {
      final route = result.routes!.first;
      final leg = route.legs!.first;
      
      print('Distância: ${leg.distance!.text}');
      print('Duração: ${leg.duration!.text}');
      
      // adicionar polylines no GoogleMap para exibir a rota.
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
            icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueAzure),
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
                      child: Text('Obter direções'),
                    ),
                    ElevatedButton(
                     onPressed: () {
                     Navigator.of(context).pop();
                    },
                      child: Text('Fechar'),
                    ),
                  ],
                );
              },
             );
           }
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
  zoom: 18
 );

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar( title: const Text(
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
        initialCameraPosition: initialPos,
        markers: Set<Marker>.from(_markers),
        onMapCreated: (controller) => _mapController = controller,
        ),
        if (_isLoading) 
            Center(
              child: CircularProgressIndicator(),
            ),
        ],
      ),
    );
  }
  
}
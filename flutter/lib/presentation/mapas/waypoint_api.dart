import 'dart:convert';
import 'package:discipulos_flutter/presentation/mapas/waypointdata.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class MapService {


  static Future<List<Waypoint>> getWaypoints() async {
     final prefs = await SharedPreferences.getInstance();
     final token = prefs.getString('token');
     if (token == null) {
      throw Exception('Token not found in cache');
    }

    Map<String, dynamic> tokenData = json.decode(token);
    String user_username = tokenData['username'] ?? '';

    final response = await http.get(
  Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/waypoint/list/$user_username')
    .replace(queryParameters: {'tokenObj': token}),
);

    if (response.statusCode == 200) {
      final List<dynamic> jsonData = jsonDecode(response.body);
      print(jsonData);
      return jsonData.map((data) => Waypoint.fromJson(data)).toList();
    } else {
      throw Exception('Failed to load waypoints');
    }
  }

  static Future<Waypoint> addWaypoint(double latitude, double longitude, String name) async {
     final prefs = await SharedPreferences.getInstance();
     final token = prefs.getString('token');
     if (token == null) {
      throw Exception('Token not found in cache');
    }

    final body = jsonEncode({
      'latitude': latitude,
      'longitude': longitude,
      'name': name,
    });

    final response = await http.post(
      Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/waypoint/add/')
      .replace(queryParameters: {'tokenObj': token}),
      body: body,
      headers: {'Content-Type': 'application/json'},
    );

    if(response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      return Waypoint.fromJson(jsonData);
      
    }
    else {
      throw Exception('Failed to add waypoint');
    }
  }

  static Future<void> deleteWaypoint(String wayPointID) async {
     final prefs = await SharedPreferences.getInstance();
     final token = prefs.getString('token');
     if (token == null) {
      throw Exception('Token not found in cache');
    }
    final response = await http.delete(
      Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/waypoint/delete/$wayPointID')
      .replace(queryParameters: {'tokenObj': token}),
    );

    if(response.statusCode == 200) {
      return;
    }
    else {
      throw Exception('Failed to delete waypoint');
    }
  }


}
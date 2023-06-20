import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

Future<Map<String, dynamic>> getProfile() async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    // Token not found in cache, handle accordingly
    throw Exception('Token not found in cache');
  }
  final url = Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/users/profile/')
    .replace(queryParameters: {'tokenObj': token});

  final response = await http.get(url);

  if (response.statusCode == 200) {
    final responseData = json.decode(response.body);
    return responseData as Map<String, dynamic>;
  } else {
    throw Exception('Failed to get profile data');
  }
}



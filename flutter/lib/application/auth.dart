import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Authentication {
  static bool isPasswordCompliant(String password, [int minLength = 6]) {
    //Null-safety ensures that password is never null
    if (password.isEmpty) {
      return false;
    }

    bool hasUppercase = password.contains(RegExp(r'[A-Z]'));
    bool hasDigits = password.contains(RegExp(r'[0-9]'));
    bool hasLowercase = password.contains(RegExp(r'[a-z]'));
    bool hasSpecialCharacters =
        password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'));
    bool hasMinLength = password.length > minLength;

    return hasDigits &&
        hasUppercase &&
        hasLowercase &&
        hasMinLength &&
        hasSpecialCharacters;
  }

  static bool isEmailCompliant(String email, [int minLength = 5]) {
    //Null-safety ensures that password is never null
    if (email.isEmpty) {
      return false;
    }

    bool validEmail =
        email.contains(RegExp(r'[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]'));
    bool hasMinLength = email.length >= minLength;

    return validEmail && hasMinLength;
  }

  static Future<String> loginUser(String email, String password) async {
    // Call the fetchAuthenticateGAE function to authenticate the user
    String res = await fetchAuthenticateGAE(email, password);

    // Return the authentication status
    return res;
  }

  // tem que retornar um token
  static Future<String> fetchAuthenticateGAE(
      String email, String password) async {
    final url = Uri.parse(
        'https://helical-ascent-385614.oa.r.appspot.com/rest/users/login?email=$email&password=$password');

    final response = await http.post(
      url,
      headers: <String, String>{
        'Content-Type': 'application/json',
      },
    );

    if (response.statusCode == 200) {
      final token = response.body;
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);
      return "success";
    } else if (response.statusCode == 404) {
      return "User not found";
    } else if (response.statusCode == 403) {
      final errorMessage = response.body;
      if (errorMessage.contains("Wrong password")) {
        return "Wrong password";
      } else
        return "Account is not active, contact an admin!";
    } else {
      return "Server error";
    }
  }

  static Future<String> registerUser(String name, String username, String email,
      String password, String role, String department) async {
    // Call the fetchAuthenticateGAE function to authenticate the user
    String res =
        await registerGAE(name, username, email, password, role, department);

    // Return the authentication status
    return res;
  }

  static Future<String> registerGAE(String name, String username, String email,
      String password, String role, String department) async {
    final url = Uri.parse(
        'https://helical-ascent-385614.oa.r.appspot.com/rest/users/register');

    final headers = {
      'Content-Type': 'application/json',
    };

    String roleValue;

    // Check the value of the 'role' string and assign the appropriate role value
    if (role == 'Aluno') {
      roleValue = '1';
    } else if (role == 'Funcionário') {
      roleValue = '2';
    } else if (role == 'Docente') {
      roleValue = '3';
    } else {
      // Handle other cases or set a default value if needed
      roleValue = '0';
    }
    print(roleValue);

    final body = jsonEncode({
      'name': name,
      'username': username,
      'email': email,
      'password': password,
      'role': roleValue,
      'department': department
    });

    final response = await http.post(
      url,
      headers: headers,
      body: body,
    );

    if (response.statusCode == 201) {
      return "success";
    } else if (response.statusCode == 409) {
      final errorMessage = response.body;
      if (errorMessage.contains('User already exists')) {
        return "user already exists";
      } else if (errorMessage.contains('Email already exists')) {
        return "email already exists";
      }
    }

    return "error";
  }
}

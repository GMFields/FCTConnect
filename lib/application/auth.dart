import 'dart:convert';
import 'package:http/http.dart' as http;

class Authentication {

  static bool isPasswordCompliant(String password, [int minLength = 6]) {
    //Null-safety ensures that password is never null
    if (password.isEmpty) {
      return false;
    }

    bool hasUppercase = password.contains(RegExp(r'[A-Z]'));
    bool hasDigits = password.contains(RegExp(r'[0-9]'));
    bool hasLowercase = password.contains(RegExp(r'[a-z]'));
    bool hasSpecialCharacters = password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'));
    bool hasMinLength = password.length > minLength;

    return hasDigits && hasUppercase && hasLowercase && hasMinLength && hasSpecialCharacters;
 
  }

  static bool isEmailCompliant(String email, [int minLength = 5]) {
    //Null-safety ensures that password is never null
    if (email.isEmpty) {
      return false;
    }

    bool validEmail = email.contains(RegExp(r'[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]'));
    bool hasMinLength = email.length >= minLength;

    return validEmail && hasMinLength;
  }

    static Future<bool> loginUser(String email, String password) async {
    // Call the fetchAuthenticateGAE function to authenticate the user
    bool authenticated = await fetchAuthenticateGAE(email, password);

    // Return the authentication status
    return authenticated;
  }


  static Future<String> registerUser(String name, String username, String email, String password) async {
    // Call the fetchAuthenticateGAE function to authenticate the user
    String res = await registerGAE(name, username, email, password);

    // Return the authentication status
    return res;
  }


// tem que retornar um token
static Future<bool> fetchAuthenticateGAE(String email, String password) async {
  final url = Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/users/login?email=$email&password=$password');

  final response = await http.post(
    url,
    headers: <String, String>{
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
          'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Origin': '*',
        'X-Requested-With': '*',
    },
  );

  if (response.statusCode == 200) {
    final token = response.body;
    return true;
  } else if (response.statusCode == 404) {
    print('User does not exist');
    return false;
  } else {
    print('Server error: ${response.statusCode}');
    return false;
  }
}

  static Future<String> registerGAE(String name, String username, String email, String password) async {
  final url = Uri.parse('https://helical-ascent-385614.oa.r.appspot.com/rest/users/register');

    final headers = {
      'Content-Type': 'application/json',
    };

    final body = jsonEncode({
      'name': name,
      'username': username,
      'email': email,
      'password': password,
    });

    final response = await http.post(
      url,
      headers: headers,
      body: body,
    );
/*
   switch(response.statusCode) {
    case 201: 
      return "success";
    case 409: 
      final responseJson = jsonDecode(response.body);
      final errorMessage = responseJson['message'];
       if (errorMessage == 'User already exists') {
        return "user already exists";
    } else if (errorMessage == 'Email already exists') {
        return "email already exists";
    }
    break;
    case 500:
      return "error";
    default :
      return "err";
   }
   */

  if(response.statusCode == 201) {
    return "success";
  }
  else if (response.statusCode == 409) {
      final errorMessage = response.body;
        if (errorMessage.contains('User already exists')) {
          return "user already exists";
    } 
         else if (errorMessage.contains('Email already exists')) {
          return "email already exists";
    }
  }
 
  return "error";

  }

}
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class GoogleSignInButton extends StatelessWidget {
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'email', // Optional scope for accessing user email
      'https://www.googleapis.com/auth/calendar', // Scope for accessing Google Calendar API
    ],
  );

  void _signInWithGoogle() async {
    try {
      final account = await _googleSignIn.signIn();
      if (account != null) {
        // Signed in successfully, proceed with accessing Google Calendar
        // Use the account object to access user information or make API calls
        // Rest of your code...
      } else {
        // User canceled the sign-in process
        // Handle accordingly
      }
    } catch (error) {
      // Handle any errors that occurred during sign-in
    }
  }

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: _signInWithGoogle,
      child: Text('Sign in with Google'),
    );
  }
}

// ignore_for_file: use_build_context_synchronously

import 'package:discipulos_flutter/application/auth.dart';
import 'package:discipulos_flutter/presentation/login/password.dart';
import 'package:discipulos_flutter/presentation/register/register_page.dart';
import 'package:flutter/material.dart';
import 'package:discipulos_flutter/constants/constants.dart';
import 'package:discipulos_flutter/presentation/welcome/welcome.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  late TextEditingController emailController;
  late TextEditingController passwordController;
  bool _isPasswordVisible = false;

  @override
  void initState() {
    emailController = TextEditingController();
    passwordController = TextEditingController();

    super.initState();
    checkUserLoggedIn();
  }

  Future<String?> getTokenFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('token');
  }

  Future<void> checkUserLoggedIn() async {
    String? token = await getTokenFromCache();
    if (token != null) {
      // User is logged in, navigate to the home screen
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const Welcome()),
      );
    }
  }

  Future<void> saveEmailToCache(String email) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('email', email);
  }

  Future<void> savePasswordToCache(String password) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('password', password);
  }

  Widget _buildEmail() {
    return Padding(
      padding: const EdgeInsets.symmetric(
          horizontal: 30.0), // Set the horizontal padding as desired
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Email',
            style: kLabelStyle,
          ),
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: kBoxDecorationStyle,
            height: 60.0,
            child: TextField(
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              style: const TextStyle(
                color: Colors.black,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: const Icon(
                  Icons.email,
                  color: Colors.black,
                ),
                hintText: 'Enter your Email',
                hintStyle: kHintTextStyle,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPassword() {
    return Padding(
      padding: const EdgeInsets.symmetric(
          horizontal: 30.0), // Set the horizontal padding as desired
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Password',
            style: kLabelStyle,
          ),
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: kBoxDecorationStyle,
            height: 60.0,
            child: TextField(
              controller: passwordController,
              keyboardType: TextInputType.visiblePassword,
              obscureText: !_isPasswordVisible,
              enableSuggestions: false,
              autocorrect: false,
              style: const TextStyle(
                color: Colors.black,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: IconButton(
                  icon: Icon(
                    _isPasswordVisible
                        ? Icons.visibility
                        : Icons.visibility_off,
                    color: Colors.black,
                  ),
                  onPressed: () {
                    setState(() {
                      _isPasswordVisible = !_isPasswordVisible;
                    });
                  },
                ),
                hintText: 'Enter your password',
                hintStyle: kHintTextStyle,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildForgotPasswordBtn() {
    return Container(
      alignment: Alignment.centerRight,
      child: Padding(
        padding: const EdgeInsets.only(right: 30.0),
        child: TextButton(
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => ForgotPasswordPage()));
          },
          child: Text(
            'Forgot Password?',
            style: kLabelStyle,
          ),
        ),
      ),
    );
  }

  Widget _buildLoginBtn() {
    return Container(
      padding: const EdgeInsets.only(left: 30.0, right: 30.0, top: 20.0),
      width: double.infinity,
      child: Builder(
        builder: (context) {
          return ElevatedButton(
            onPressed: () => logInButtonPressed(
                context, emailController.text, passwordController.text),
            style: ElevatedButton.styleFrom(
              elevation: 5.0,
              padding: const EdgeInsets.all(15.0),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30.0),
              ),
              backgroundColor: const Color(0xFFEDEDED),
            ),
            child: const Text(
              'LOGIN',
              style: TextStyle(
                color: Colors.black,
                letterSpacing: 1.5,
                fontSize: 18.0,
                fontWeight: FontWeight.bold,
                fontFamily: 'RobotoSlab',
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildSignupBtn() {
    return Padding(
      padding: const EdgeInsets.only(top: 10.0),
      child: GestureDetector(
        onTap: () => Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => RegisterPage()),
        ),
        child: RichText(
          text: const TextSpan(
            children: [
              TextSpan(
                text: 'Don\'t have an Account? ',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18.0,
                  fontWeight: FontWeight.w400,
                ),
              ),
              TextSpan(
                text: 'Sign Up',
                style: TextStyle(
                  color: Colors.black,
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> logInButtonPressed(
      BuildContext context, String email, String password) async {
    bool emailCompliant = Authentication.isEmailCompliant(email);
    bool pwCompliant = Authentication.isPasswordCompliant(password);

    if (!pwCompliant) {
      await showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Invalid password!"),
          );
        },
      );
    }

    String res = await Authentication.loginUser(email, password);

    if (res == "success") {
      await saveEmailToCache(email);
      await savePasswordToCache(password);
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const Welcome()),
      );
    } else if (res == "User not found") {
      showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("User not found!"),
          );
        },
      );
    } else if (res == "Wrong password") {
      showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Wrong password!"),
          );
        },
      );
    } else if (res == "Account is not active, contact an admin!") {
      showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Account is not active, contact an admin!"),
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Something went wrong!"),
          );
        },
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          Container(
            decoration: const BoxDecoration(
              image: DecorationImage(
                image: AssetImage(
                    'assets/images/FCT.png'), // Replace 'assets/images/FCT.png' with the path to your background image
                fit: BoxFit.cover,
              ),
            ),
            width: double.infinity,
            height: 130,
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.4),
            ),
          ),
          SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                const Padding(
                  padding: EdgeInsets.only(top: 80),
                  child: Text(
                    "Sign In",
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'RobotoSlab',
                      color: Colors.black,
                    ),
                  ),
                ),
                const SizedBox(height: 30.0),
                _buildEmail(),
                const SizedBox(height: 30.0),
                _buildPassword(),
                _buildForgotPasswordBtn(),
                _buildLoginBtn(),
                const SizedBox(height: 50.0),
                _buildSignupBtn(),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

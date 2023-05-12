import 'package:discipulos_flutter/presentation/login_page.dart';
import 'package:flutter/material.dart';
import 'package:discipulos_flutter/constants/constants.dart';

import 'package:discipulos_flutter/application/auth.dart';

class RegisterPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  late TextEditingController nameController;
  late TextEditingController usernameController;
  late TextEditingController emailController;
  late TextEditingController passwordController;
  late TextEditingController confirmPasswordController;

  @override
  void initState() {
    nameController = TextEditingController();
    usernameController = TextEditingController();
    emailController = TextEditingController();
    passwordController = TextEditingController();
    confirmPasswordController = TextEditingController();

    super.initState();
  }

  Widget _buildName() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Name',
            style: kLabelStyle,
          ),
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: kBoxDecorationStyle,
            height: 40.0,
            child: TextField(
              controller: nameController,
              keyboardType: TextInputType.name,
              style: const TextStyle(
                color: Colors.white,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 12.0),
                prefixIcon: const Icon(
                  Icons.person,
                  color: Colors.white,
                ),
                hintText: 'Enter your name',
                hintStyle: kHintTextStyle,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildUserName() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Username',
            style: kLabelStyle,
          ),
          const SizedBox(height: 10.0),
          Container(
            alignment: Alignment.centerLeft,
            decoration: kBoxDecorationStyle,
            height: 40.0,
            child: TextField(
              controller: usernameController,
              keyboardType: TextInputType.name,
              style: const TextStyle(
                color: Colors.white,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 12.0),
                prefixIcon: const Icon(
                  Icons.person_outline_rounded,
                  color: Colors.white,
                ),
                hintText: 'Enter your username',
                hintStyle: kHintTextStyle,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmail() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30.0),
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
            height: 40.0,
            child: TextField(
              controller: emailController,
              keyboardType: TextInputType.emailAddress,
              style: const TextStyle(
                color: Colors.white,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 12.0),
                prefixIcon: const Icon(
                  Icons.email,
                  color: Colors.white,
                ),
                hintText: 'Enter your email',
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
    padding: const EdgeInsets.symmetric(horizontal: 30.0),
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
          height: 40.0,
          child: TextField(
            controller: passwordController,
            keyboardType: TextInputType.visiblePassword,
            obscureText: true,
            enableSuggestions: false,
            autocorrect: false,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'RobotoSlab',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 12.0),
              prefixIcon: const Icon(
                Icons.password,
                color: Colors.white,
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

Widget _buildPasswordConfirmation() {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 30.0),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Text(
          'Confirm password',
          style: kLabelStyle,
        ),
        const SizedBox(height: 10.0),
        Container(
          alignment: Alignment.centerLeft,
          decoration: kBoxDecorationStyle,
          height: 40.0,
          child: TextField(
            controller: confirmPasswordController,
            keyboardType: TextInputType.visiblePassword,
            obscureText: true,
            enableSuggestions: false,
            autocorrect: false,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'RobotoSlab',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 12.0),
              prefixIcon: const Icon(
                Icons.password,
                color: Colors.white,
              ),
              hintText: 'Confirm your password',
              hintStyle: kHintTextStyle,
            ),
          ),
        ),
      ],
    ),
  );
}

Widget _buildRegisterBtn() {
  return Container(
    padding: const EdgeInsets.only(left: 30.0, right: 30.0, top: 15.0),
    width: double.infinity,
    child: Builder(
      builder: (context) {
        return ElevatedButton(
          onPressed: () => registerButtonPressed(
              context,
              nameController.text,
              usernameController.text,
              emailController.text,
              passwordController.text,
              confirmPasswordController.text),
          style: ElevatedButton.styleFrom(
            elevation: 5.0,
            padding: const EdgeInsets.all(10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            backgroundColor: Colors.white,
          ),
          child: const Text(
            'REGISTER',
            style: TextStyle(
              color: Color(0xFF527DAA),
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

Widget _buildSigninBTN() {
  return Padding(
    padding: const EdgeInsets.only(top: 10.0),
    child: GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Login()),
      ),
      child: RichText(
        text: const TextSpan(
          children: [
            TextSpan(
              text: 'Already have an Account? ',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18.0,
                fontWeight: FontWeight.w400,
              ),
            ),
            TextSpan(
              text: 'Sign In',
              style: TextStyle(
                color: Colors.white,
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

Future<void> registerButtonPressed(BuildContext context, String name, String username, String email, String password, String confirmedPassword) async {
  bool emailCompliant = Authentication.isEmailCompliant(email);
  bool pwCompliant = Authentication.isPasswordCompliant(password);

  if (password != confirmedPassword) {
    await showDialog(
      context: context,
      builder: (context) {
        return const AlertDialog(
          content: Text("Passwords do not match!"),
        );
      },
    );
  }

  if (!emailCompliant && !pwCompliant) {
    await showDialog(
      context: context,
      builder: (context) {
        return const AlertDialog(
          content: Text("Email and password are not compliant!"),
        );
      },
    );
  }
  else if(!emailCompliant) {  
    await showDialog(
      context: context,
      builder: (context) {
        return const AlertDialog(
          content: Text("Email is not compliant!"),
        );
      },
    );
  }

    else if(!pwCompliant) {
      await showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Password is not compliant!"),
          );
        },
      );
    }

  else if (await Authentication.registerUser(name, username, email, password)) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => Login()),
      );
    } else {
      // Wrong credentials
      showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Wrong Password!"),
          );
        },
      );
    }

  }

  // Rest of the code
  // ...

@override
Widget build(BuildContext context) {
  return Scaffold(
    body: Container(
      decoration: const BoxDecoration(
        gradient: LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [
            Color(0xFFBBE1FA),
            Color(0xFF3282B8),
            Color(0xFF0F4C75),
            Color(0xFF1B262C),
          ],
        ),
      ),
      width: double.infinity,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.only(top: 25),
            child: Text(
              "Register",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w500,
                fontFamily: 'RobotoSlab',
                color: Colors.white,
              ),
            ),
          ),
          const SizedBox(height: 5.0),
          _buildName(),
          _buildUserName(),
          const SizedBox(height: 5.0),
          _buildEmail(),
          const SizedBox(height: 5.0),
          _buildPassword(),
          const SizedBox(height: 5.0),
          _buildPasswordConfirmation(),
          const SizedBox(height: 5.0),
          _buildRegisterBtn(),
          const SizedBox(height: 30.0),
          _buildSigninBTN(),
        ],
      ),
    ),
  );
}

}
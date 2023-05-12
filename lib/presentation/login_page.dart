
import 'package:discipulos_flutter/presentation/register_page.dart';
import 'package:flutter/material.dart';
import 'package:discipulos_flutter/constants/constants.dart';
import 'package:discipulos_flutter/application/auth.dart';
import 'package:discipulos_flutter/presentation/main_page.dart';



class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
  }
  
  class _LoginState extends State<Login> {
  late TextEditingController emailController;
  late TextEditingController passwordController;

  @override
  void initState() {
    emailController = TextEditingController();
    passwordController = TextEditingController();

    super.initState();
  }

Widget _buildEmail() {
  return Padding(
    padding: const EdgeInsets.symmetric(horizontal: 30.0), // Set the horizontal padding as desired
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
              color: Colors.white,
              fontFamily: 'RobotoSlab',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 14.0),
              prefixIcon: const Icon(
                Icons.email,
                color: Colors.white,
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
    padding: const EdgeInsets.symmetric(horizontal: 30.0), // Set the horizontal padding as desired
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
            obscureText: true,
            enableSuggestions: false,
            autocorrect: false,
            style: const TextStyle(
              color: Colors.white,
              fontFamily: 'RobotoSlab',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 14.0),
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

Widget _buildForgotPasswordBtn() {
  return Container(
    alignment: Alignment.centerRight,
    child: Padding(
      padding: const EdgeInsets.only(right: 30.0),
      child: TextButton(
        onPressed: () => print("FAZER UMA PAGINA PARA RECUPERAR PASSWORD"),
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
          onPressed: () => logInButtonPressed(context, emailController.text, passwordController.text),
          style: ElevatedButton.styleFrom(
            elevation: 5.0,
            padding: const EdgeInsets.all(15.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            backgroundColor: Colors.white,
          ),
          child: const Text(
            'LOGIN',
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



  Widget _buildSignupBtn() {
  return Padding(
    padding: const EdgeInsets.only(top: 10.0),
    child: GestureDetector(
      onTap: () => Navigator.push(
        context,
        MaterialPageRoute(builder: (context) =>  RegisterPage()),
      ),
      child: RichText(
        text: const TextSpan(
          children: [
            TextSpan(
              text: 'Don\'t have an Account? ',
              style: TextStyle(
                color: Colors.white,
                fontSize: 18.0,
                fontWeight: FontWeight.w400,
              ),
            ),
            TextSpan(
              text: 'Sign Up',
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


 Future<void> logInButtonPressed(BuildContext context, String email, String password) async {
    bool emailCompliant = Authentication.isEmailCompliant(email);
    bool pwCompliant = Authentication.isPasswordCompliant(password);
  /*
    if (!pwCompliant && !emailCompliant) {
      await showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Invalid information!"),
          );
        },
      );
    }

    else if (!pwCompliant) {
      await showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Invalid password!"),
          );
        },
      );
    }

   else  if (!emailCompliant) {
      showDialog(
        context: context,
        builder: (context) {
          return const AlertDialog(
            content: Text("Invalid email!"),
          );
        },
      );
    }
*/
   /* else */ if (await Authentication.loginUser(email, password)) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const MainScreen()),
      );
    } else {
      // Wrong credentials
      // ignore: use_build_context_synchronously
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
            children: <Widget> [
              const Padding(
              padding: EdgeInsets.only(top: 80),
              child: Text("Sign In",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.w500,
                fontFamily: 'RobotoSlab',
                color: Colors.white,
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
          )
        ),
      );
  }
  }

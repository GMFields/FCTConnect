// ignore_for_file: use_build_context_synchronously

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
  String? _selectedDepartmentDropdownValue;
  String? _selectedRoleDropdownValue;


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
            height: 50.0,
            child: TextField(
              controller: nameController,
              keyboardType: TextInputType.name,
              style: const TextStyle(
                color: Colors.black,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: const Icon(
                  Icons.person,
                  color: Colors.black,
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
            height: 50.0,
            child: TextField(
              controller: usernameController,
              keyboardType: TextInputType.name,
              style: const TextStyle(
                color: Colors.black,
                fontFamily: 'RobotoSlab',
              ),
              decoration: InputDecoration(
                border: InputBorder.none,
                contentPadding: const EdgeInsets.only(top: 14.0),
                prefixIcon: const Icon(
                  Icons.person_outline_rounded,
                  color: Colors.black,
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
            height: 50.0,
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
          height: 50.0,
          child: TextField(
            controller: passwordController,
            keyboardType: TextInputType.visiblePassword,
            obscureText: true,
            enableSuggestions: false,
            autocorrect: false,
            style: const TextStyle(
              color: Colors.black,
              fontFamily: 'RobotoSlab',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 14.0),
              prefixIcon: const Icon(
                Icons.key,
                color: Colors.black,
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
          height: 50.0,
          child: TextField(
            controller: confirmPasswordController,
            keyboardType: TextInputType.visiblePassword,
            obscureText: true,
            enableSuggestions: false,
            autocorrect: false,
            style: const TextStyle(
              color: Colors.black,
              fontFamily: 'RobotoSlab',
            ),
            decoration: InputDecoration(
              border: InputBorder.none,
              contentPadding: const EdgeInsets.only(top: 14.0),
              prefixIcon: const Icon(
                Icons.key,
                color: Colors.black,
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
              confirmPasswordController.text,
            _selectedRoleDropdownValue ?? '',
            _selectedDepartmentDropdownValue ?? '',


          ),
          style: ElevatedButton.styleFrom(
            elevation: 5.0,
            padding: const EdgeInsets.all(10.0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(30.0),
            ),
            backgroundColor: Color(0xFFEDEDED),
          ),
          child: const Text(
            'REGISTER',
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
                color: Colors.black,
                fontSize: 18.0,
                fontWeight: FontWeight.w400,
              ),
            ),
            TextSpan(
              text: 'Sign In',
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

Future<void> registerButtonPressed(BuildContext context, String name, String username, String email, String password, String? confirmedPassword,
    String role, String department, ) async {
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
    return;
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
    return;
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
    return;
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
      return;
    }
    else {
    String res = await Authentication.registerUser(name, username, email, password, role, department);
    switch(res) {
      case "success":
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => Login()),
        );
        break;
      case "user already exists": 
        await showDialog(
          context: context,
          builder: (context) {
            return const AlertDialog(
              content: Text("Username already exists!"),
            );
          },
        );
        break;
      case "email already exists":
      await showDialog(context: context, builder: (context) {
        return const AlertDialog(
          content: Text("Email already exists!"),
        );
      });
      break;
      case "error": {
        await showDialog(context: context, builder: (context) {
          return const AlertDialog(
            content: Text("Something went wrong!"),
          );
        });
      }
    } 
  }

  }

  Widget _buildDropdownDepartmentButton() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Departamento',
            style: kLabelStyle,
          ),
          const SizedBox(height: 10.0),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            decoration: kBoxDecorationStyle,
            child: DropdownButton<String>(
              value: _selectedDepartmentDropdownValue,
              isExpanded: true,
              icon: const Icon(
                Icons.arrow_drop_down,
                color: Colors.black,
              ),
              iconSize: 24,
              elevation: 16,
              style: const TextStyle(
                color: Colors.black,
                fontFamily: 'RobotoSlab',
              ),
              underline: Container(
                height: 2,
                color: Colors.transparent,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedDepartmentDropdownValue = newValue;
                });
              },
              items: <String>[
                'DI',
                'DF',
                'DQ',
                'DM',
                'DEMI',
                'DEC',
                'DCV',
                'DCT',
                'DCSA',
                'DCM',
                'DCEA'

                // Add more options as needed
              ].map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDropdownRoleButton() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 30.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text(
            'Função',
            style: kLabelStyle,
          ),
          const SizedBox(height: 10.0),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10.0),
            decoration: kBoxDecorationStyle,
            child: DropdownButton<String>(
              value: _selectedRoleDropdownValue,
              isExpanded: true,
              icon: const Icon(
                Icons.arrow_drop_down,
                color: Colors.black,
              ),
              iconSize: 24,
              elevation: 16,
              style: const TextStyle(
                color: Colors.black,
                fontFamily: 'RobotoSlab',
              ),
              underline: Container(
                height: 2,
                color: Colors.transparent,
              ),
              onChanged: (String? newValue) {
                setState(() {
                  _selectedRoleDropdownValue = newValue;
                });
              },
              items: <String>[
                'Aluno',
                'Funcionário',
                'Docente',

                // Add more options as needed
              ].map<DropdownMenuItem<String>>((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }


  @override
Widget build(BuildContext context) {
  return Scaffold(
    body: Stack(
      children: [
        Container(
          decoration: BoxDecoration(
            image: DecorationImage(
              image: AssetImage('assets/images/FCT.png'), 
              fit: BoxFit.cover,
            ),
          ),
        width: double.infinity,
        height: 90,
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
              Padding(
                padding: const EdgeInsets.only(top: 50),
                child: Text(
                  "Register",
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    fontFamily: 'RobotoSlab',
                    color: Colors.black,
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
              _buildDropdownDepartmentButton(),
              _buildDropdownRoleButton(),
              const SizedBox(height: 5.0),
              _buildRegisterBtn(),
              const SizedBox(height: 30.0),
              _buildSigninBTN(),
            ],
          ),
        ),
      ],
    ),
  );
}


}
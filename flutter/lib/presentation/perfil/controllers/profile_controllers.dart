import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../../application/profile/profile.dart';

class ProfileControllers {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController departmentController = TextEditingController();
  final TextEditingController nameController = TextEditingController();
  final TextEditingController roleController = TextEditingController();
  final TextEditingController profileController = TextEditingController();
  final TextEditingController stateController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController mobileController = TextEditingController();
  final TextEditingController occupationController = TextEditingController();
  final TextEditingController addressController = TextEditingController();
  final TextEditingController nifController = TextEditingController();

  

  Future<void> fetchProfileData() async {
    try {
      final profileData = await getProfile();

      emailController.text = profileData['email'] ?? '';
      departmentController.text = profileData['department'] ?? '';
      nameController.text = profileData['name'] ?? '';
      roleController.text = convertRoleToString(profileData['role'])?.toString() ?? '';
      stateController.text = profileData['state'] ?? '';
      profileController.text = profileData['profile'] ?? '';
      phoneController.text = profileData['landline'] ?? '';
      mobileController.text = profileData['phoneNumber'] ?? '';
      occupationController.text = profileData['occupation'] ?? '';
      addressController.text = profileData['address'] ?? '';
      nifController.text = profileData['nif'] ?? '';
    } catch (e) {

    }
  }

  Future<void> loadCacheData() async {
    final password = await getPasswordFromCache();
    if (password != null) {
      passwordController.text = password;
    }
  }

  Future<String?> getPasswordFromCache() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString('password');
  }

  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    departmentController.dispose();
    nameController.dispose();
    roleController.dispose();
    profileController.dispose();
    phoneController.dispose();
    mobileController.dispose();
    occupationController.dispose();
    addressController.dispose();
    nifController.dispose();
    stateController.dispose();
  }


   String convertRoleToString(int? role) {
    if (role == 1) {
      return "Aluno";
    } else if (role == 2) {
      return "Funcionário";
    } else if (role == 3) {
      return "Docente";
    } else {
      return "Adminstrador";
    }
  }


}

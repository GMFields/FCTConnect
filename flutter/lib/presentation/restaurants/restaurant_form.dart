import 'package:discipulos_flutter/presentation/restaurants/restaurant_class.dart';
import 'package:flutter/material.dart';

class RestaurantFormController {
  final TextEditingController restaurantNameController = TextEditingController();
  final TextEditingController locationController = TextEditingController();
  final TextEditingController managersController = TextEditingController();
  final TextEditingController bannerUrlController = TextEditingController();

  bool validate() {
    return restaurantNameController.text.isNotEmpty &&
        locationController.text.isNotEmpty &&
        managersController.text.isNotEmpty &&
        bannerUrlController.text.isNotEmpty;
  }

  Restaurant getRestaurant() {
    final String name = restaurantNameController.text;
    final String location = locationController.text;
    final String managers = managersController.text;
    final List<String> managersList = managers.split(',');
    final String bannerUrl = bannerUrlController.text;

    return Restaurant(
      name: name,
      location: location,
      restaurantManagers: managersList,
      takeAwayService: "",
      url: bannerUrl,
      rating: 0,
      numberOfRatings: 0
    );
  }

  void clear() {
    restaurantNameController.clear();
    locationController.clear();
    managersController.clear();
    bannerUrlController.clear();
  }
}

class RestaurantForm extends StatelessWidget {
  final RestaurantFormController controller;
  final VoidCallback onSubmit;

  const RestaurantForm({
    required this.controller,
    required this.onSubmit,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: controller.restaurantNameController,
          decoration: const InputDecoration(labelText: 'Nome do restaurante'),
        ),
        TextField(
          controller: controller.locationController,
          decoration: const InputDecoration(labelText: 'Localização'),
        ),
        TextField(
          controller: controller.managersController,
          decoration: const InputDecoration(labelText: 'Managers'),
        ),
        TextField(
          controller: controller.bannerUrlController,
          decoration: const InputDecoration(labelText: 'Banner URL'),
        ),
        ElevatedButton(
          onPressed: onSubmit,
          child: const Text('Adicionar novo restaurnte'),
        ),
      ],
    );
  }
}
import 'package:discipulos_flutter/presentation/restaurants/dish_class.dart';
import 'package:flutter/material.dart';


class DishFormController {
  final TextEditingController dishNameController = TextEditingController();
  final TextEditingController priceController = TextEditingController();
  late bool isVegan;
  String dishType = 'Sobremesa';
  final String restaurantName;

  DishFormController({
    bool initialIsVegan = false,
    required this.restaurantName,
  }) {
    isVegan = initialIsVegan;
  }

  bool validate() {
    return dishNameController.text.isNotEmpty &&
        priceController.text.isNotEmpty;
  }

  Dish getDish() {
  final String dishName = dishNameController.text;
  final double price = double.parse(priceController.text);
  final bool isVegan = this.isVegan;
  String dishType = this.dishType.trim(); // Remove trailing spaces

  print(dishType);
  print(dishType == "Prato do Dia");
  print(dishType == "Sobremesa");

  if (dishType == "Sobremesa") {
    dishType = "dessert";
    print(dishType);
  } else if (dishType == "Prato do Dia") {
    dishType = "dailyDish";
    print(dishType);
  } else if (dishType == "Sopa") {
    dishType = "soup";
    print(dishType);
  } else if(dishType == "Menu") {
    dishType = "menu";
    print(dishType);
  }

    return Dish(
      restaurantName: restaurantName,
      dishName: dishName,
      price: price,
      isVegan: isVegan,
      dishType: dishType,
      dishID: '',
    );
  }

  void clear() {
    dishNameController.clear();
    priceController.clear();
    isVegan = false;
    dishType = 'Sobremesa';
  }
}



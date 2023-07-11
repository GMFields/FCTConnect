class Dish {
  final String restaurantName;
  final String dishName;
  final double price;
  final String dishType;
  final bool isVegan;
  final String dishID;

  Dish({
    required this.restaurantName,
    required this.dishName,
    required this.price,
    required this.dishType,
    required this.isVegan,
    required this.dishID
  });
  
  factory Dish.fromJson(Map<String, dynamic> json) {
    return Dish(
      restaurantName: json['restaurantName'] as String,
      dishName: json['dishName'] as String,
      price:  json['price'] as double,
      dishType: json['dishType'] as String,
      isVegan: json['isVegan'] as bool,
      dishID: json['dishID'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'restaurantName': restaurantName,
      'dishName': dishName,
      'price': price,
      'dishType': dishType,
      'isVegan': isVegan,
      'dishID': dishID,
    };
  }

}
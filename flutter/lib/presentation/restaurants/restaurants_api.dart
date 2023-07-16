import 'package:discipulos_flutter/presentation/restaurants/restaurant_class.dart';
import 'package:discipulos_flutter/presentation/restaurants/dish_class.dart';
import 'package:discipulos_flutter/presentation/restaurants/review_class.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';


Future<List<Restaurant>> fetchRestaurants(String token) async {
  print(token);
  final response = await http.get(
    Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/")
        .replace(queryParameters: {'tokenObj': token}),
  );

  if (response.statusCode == 200) {
    final List<dynamic> restaurantList = jsonDecode(response.body);
    print(restaurantList);
    return restaurantList.map((json) {
      return Restaurant(
        name: json['name'],
        location: json['location'],
        restaurantManagers: List<String>.from(json['restaurantManagers']),
        takeAwayService: json['takeAwayService'],
        url: json['url'],
        rating: json['rating'],
        numberOfRatings: json['numberOfRatings'],
      );
    }).toList();
  } else {
    throw Exception('Failed to fetch restaurants');
  }
}

Future<List<Review>> fetchReviews(String token, String restaurantName) async {
 final response = await http.get(
    Uri.parse(
      "https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/reviews"
    ).replace(queryParameters: {'tokenObj': token}),
    headers: {
      'Content-Type': 'application/json; charset=utf-8', 
    },
  );

  if(response.statusCode == 200) {
    final List<dynamic> reviewList = jsonDecode(utf8.decode(response.bodyBytes));
    return reviewList.map((json) {
    final review = Review(
      creationData: int.parse(json[0]),
      author: json[1],
      description: json[2],
      rating: int.parse(json[3]),
      restaurantName: json[4],
      reviewID: json[5],
    );
    return review;
    }).toList();
  } else {
    throw Exception("Failed to fetch reviews");
  }


}


  Future<List<Dish>> fetchDesserts(String token, String restaurantName) async { 
    final response = await http.get(Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/desserts")
    .replace(queryParameters: {'tokenObj': token}),
    );

    if(response.statusCode == 200) {
      final List<dynamic> dessertsList = jsonDecode(response.body);
      return dessertsList.map((json) {
        return Dish(
          restaurantName: restaurantName,
          dishName: json[0],
          price: double.parse(json[1]),
          dishType: json[2],
          isVegan: bool.parse(json[3]),
          dishID: json[4],
        );
      }).toList();
    } else {
      throw Exception('Failed to fetch desserts');
    }  
  }

  Future<List<Dish>> fetchDailyDishes(String token, String restaurantName) async {
    final response = await http.get(Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/dailyDishes")
    .replace(queryParameters: {'tokenObj': token}),
    );

    if(response.statusCode == 200) {
      final List<dynamic> dailyDishesList = jsonDecode(response.body);
      return dailyDishesList.map((json) {
        return Dish(
          restaurantName: restaurantName,
          dishName: json[0],
          price: double.parse(json[1]),
          dishType: json[2],
          isVegan: bool.parse(json[3]),
          dishID: json[4],
        );
      }).toList();
    } else {
      throw Exception('Failed to fetch daily dishes');
    }  
  }


  Future<List<Dish>> fetchSoups(String token, String restaurantName) async {
    final response = await http.get(Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/soups")
    .replace(queryParameters: {'tokenObj': token}),
        headers: {'Accept-Charset': 'utf-8'},
    );

    if(response.statusCode == 200) {
      final List<dynamic> menusList = jsonDecode(response.body);
      return menusList.map((json) {
        return Dish(
          restaurantName: restaurantName,
          dishName: json[0],
          price: double.parse(json[1]),
          dishType: json[2],
          isVegan: bool.parse(json[3]),
          dishID: json[4],
        );
      }).toList();
    } else {
      throw Exception('Failed to fetch menus');
    }  

  }

 Future<List<Dish>> fetchMenus(String token, String restaurantName) async {
  try {
    final response = await http.get(
      Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/menus")
      .replace(queryParameters: {'tokenObj': token}),
    );

    if (response.statusCode == 200) {
      final List<dynamic> menusList = jsonDecode(response.body);  
      print(response.body);    
      return menusList.map((json) {
        return Dish(
          restaurantName: restaurantName,
          dishName: json[0],
          price: double.parse(json[1]),
          dishType: json[2],
          isVegan: bool.parse(json[3]),
          dishID: json[4],
        );
      }).toList();
    } else {
      throw Exception('Failed to fetch menus. Status code: ${response.statusCode}');
    }
  } catch (error) {
    print('Error fetching menus: $error');
    throw Exception('Failed to fetch menus: $error');
  }
}



Future<String> addRestaurant(String token, Restaurant restaurant) async {

  final response = await http.post(
    Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/")
        .replace(queryParameters: {'tokenObj': token}),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(restaurant.toJson()),
  );

    print(Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/")
        .replace(queryParameters: {'tokenObj': token}));

  if (response.statusCode == 201) {
    return "success";
  } else if(response.statusCode == 400) {
    return "Invalid data";
  } else if(response.statusCode == 409) {
    return "Restaurant already exists";
  } else {
    throw Exception('Failed to add restaurant');
  }  

}

Future<String> addDish(String token, Dish dish, String restaurantName) async {
  final response = await http.post(
    Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/dish")
        .replace(queryParameters: {'tokenObj': token}),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(dish.toJson()),
  );

  print(Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/dish")
        .replace(queryParameters: {'tokenObj': token}));


  if (response.statusCode == 201) {
    return "success";
  } else if(response.statusCode == 400) {
    return "Invalid data";
  } else if(response.statusCode == 409) {
    return "Dish already exists";
  } else {
    throw Exception('Failed to add dish');
  }  
}

  Future<String> deleteDish(String token, String restaurantName, String dishID) async {
    final response = await http.delete(
      Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$restaurantName/dish/$dishID")
          .replace(queryParameters: {'tokenObj': token}),
    );
  
    if (response.statusCode == 200) {
      return "success";
    } else if(response.statusCode == 400) {
      return "Invalid data";
    } else if(response.statusCode == 404) {
      return "Dish not found";
    } else {
      throw Exception('Failed to delete dish');
    }  
  
  
}
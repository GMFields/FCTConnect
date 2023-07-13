// ignore_for_file: use_build_context_synchronously

import 'dart:convert';

import 'package:discipulos_flutter/presentation/restaurants/restaurant_info.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurants.dart';
import 'package:discipulos_flutter/presentation/restaurants/review_class.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ReviewListPage extends StatefulWidget {
  final List<Review> reviews;
   final String restaurantName;

  const ReviewListPage({required this.reviews, required this.restaurantName});

  @override
  _ReviewListPageState createState() => _ReviewListPageState();
}

class _ReviewListPageState extends State<ReviewListPage> {
  TextEditingController ratingController = TextEditingController();
  TextEditingController descriptionController = TextEditingController();
  late Map<String, dynamic> token;
  late String authToken;


    @override
  void initState() {
    super.initState();
    getTokenFromCache();
  }



Future<void> getTokenFromCache() async {
    final prefs = await SharedPreferences.getInstance();
    final cachedToken = prefs.getString('token');
    if (cachedToken == null) {
      throw Exception('Token not found in cache');
    }
    setState(() {
      authToken = cachedToken;
      token = jsonDecode(cachedToken);
    });
   }



  Future<String> addReview(String token, Review r) async {
      final resName = widget.restaurantName;

      print(jsonEncode(r.toJson())); 

    final response = await http.post(
      Uri.parse(
        "https://helical-ascent-385614.oa.r.appspot.com/rest/restaurant/$resName/review",
      ).replace(queryParameters: {'tokenObj': token}),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(r.toJson()),
    );

   if (response.statusCode == 200) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Success'),
          content: const Text('Review adicionada com sucesso.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pushReplacement(context, MaterialPageRoute(builder: ((context) => const RestaurantListPage())));
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
    return "success";
  } else if (response.statusCode == 400) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: const Text('Por favor preenche os campos todos.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
    return "Invalid data";
  } else if (response.statusCode == 403) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: const Text('Ja fizeste uma review deste restaurante.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
    return "Review already exists";
  } else {
    throw Exception('Houve um problema a adicionar a review');
  }
  }
  void _showAddReviewDialog(BuildContext context, Review r) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Adicionar review'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: ratingController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(labelText: 'Classificação (1-5)'),
              ),
              TextField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Descrição'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                final rating = int.tryParse(ratingController.text);
                if (rating != null && rating >= 1 && rating <= 5) {
                  final newReview = Review(
                    reviewID: '',
                    restaurantName: widget.restaurantName,
                    author: token['username'],
                    description: descriptionController.text,
                    rating: rating,
                    creationData: DateTime.now().millisecondsSinceEpoch,
                  );
                  addReview(authToken, newReview);
                  Navigator.of(context).pop();
                } else {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Classificação inválida! Por favor introduza um número entre 1 e 5.'),
                    ),
                  );
                }
              },
              child: const Text('Adicionar'),
            ),
          ],
        );
      },
    );
  }

 @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: const Text(
        'Classificações',
        style: TextStyle(
          color: Colors.black,
          fontSize: 20,
          fontWeight: FontWeight.bold,
        ),
      ),
      backgroundColor: const Color.fromARGB(255, 237, 237, 237),
      iconTheme: const IconThemeData(color: Colors.black),
    ),
    body: Padding(
      padding: const EdgeInsets.all(10.0),
      child: Column(
        children: [
          Expanded(
            child: ListView.separated(
              itemCount: widget.reviews.length,
              separatorBuilder: (context, index) => const SizedBox(height: 10),
              itemBuilder: (context, index) {
                final review = widget.reviews[index];
                return GestureDetector(
                  onTap: () => _showAddReviewDialog(context, review), 
                  child: Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    elevation: 3,
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Autor: ${review.author}',
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 18,
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            'Descrição: ${review.description}',
                            style: const TextStyle(
                              fontSize: 16,
                            ),
                          ),
                          const SizedBox(height: 10),
                          RatingBarIndicator(
                            rating: review.rating.toDouble(),
                            itemBuilder: (context, index) => const Icon(
                              Icons.star,
                              color: Colors.amber,
                            ),
                            itemCount: 5,
                            itemSize: 20.0,
                            direction: Axis.horizontal,
                          ),
                          const SizedBox(height: 10),
                          Text(
                            'Data: ${DateTime.fromMillisecondsSinceEpoch(review.creationData)}',
                            style: const TextStyle(
                              fontSize: 14,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          ElevatedButton(
            onPressed: () {
              _showAddReviewDialog(context, Review(
                reviewID: '',
                restaurantName: '', 
                author: '',
                description: '',
                rating: 0,
                creationData: 0,
              ));
            },
            child: const Text('Adicionar review'),
          ),
        ],
      ),
    ),
  );
}
}
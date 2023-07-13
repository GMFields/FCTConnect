import 'package:discipulos_flutter/presentation/restaurants/dish_form.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurant_class.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurant_reviews.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurants.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurants_api.dart';
import 'package:discipulos_flutter/presentation/restaurants/dish_class.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:discipulos_flutter/presentation/restaurants/review_class.dart';
import 'package:flutter/material.dart';
import 'dart:convert';


class RestaurantInfoPage extends StatefulWidget {
  final Restaurant restaurant;
  final String authToken;

  const   RestaurantInfoPage({Key? key, required this.restaurant, required this.authToken})
      : super(key: key);

  @override
  _RestaurantInfoPageState createState() => _RestaurantInfoPageState();
}

class _RestaurantInfoPageState extends State<RestaurantInfoPage> {
    bool isManager = false;
    late DishFormController _dishFormController;
     bool isVegan = false;
       late List<Review> reviews;


  @override
  void initState() {
    super.initState();
    _dishFormController = DishFormController(
      initialIsVegan: false,
      restaurantName: widget.restaurant.name,
    );
    checkManagerRole();
    fetchResReviews();
  }

Future<void> checkManagerRole() async {
  Map<String, dynamic> token = jsonDecode(widget.authToken);
  for (var manager in widget.restaurant.restaurantManagers) {
    if (manager == token['username']) {
      setState(() {
        isManager = true;
      });
      break; 
    }
  }
}

  Future<void> fetchResReviews() async {
    try {
      reviews = await fetchReviews(widget.authToken, widget.restaurant.name);
    } catch (e) {
      print('Failed to fetch reviews: $e');
      reviews = [];
    }
    setState(() {});
  }
 

  @override
Widget build(BuildContext context) {
  return Scaffold(
    appBar: AppBar(
      title: Text(
        widget.restaurant.name,
        style: const TextStyle(
          color: Colors.black,
          fontSize: 20,
          fontFamily: 'RobotoSlab',
        ),
      ),
      backgroundColor: const Color.fromARGB(255, 237, 237, 237),
      iconTheme: const IconThemeData(color: Colors.black),
    ),
    body: SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: double.infinity,
            height: 200,
            child: CachedNetworkImage(
              imageUrl: widget.restaurant.url,
              fit: BoxFit.cover,
              placeholder: (context, url) => const CircularProgressIndicator(),
              errorWidget: (context, url, error) => const Icon(Icons.error),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 16),
                const Center(
                  child: Text(
                    'Cardápio:',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                _buildDishesList('Sopas', fetchSoups),
                const SizedBox(height: 14),
                _buildDishesList('Pratos do Dia', fetchDailyDishes),
                const SizedBox(height: 14),
                _buildDishesList('Menu', fetchMenus),
                const SizedBox(height: 14),
                _buildDishesList('Sobremesas', fetchDesserts),
                if (isManager) ...[
                  const SizedBox(height: 14),
                  Center(
                    child: ElevatedButton(
                      onPressed: () {
                        _showAddDishDialog();
                      },
                      child: Text('Adicionar Prato'),
                    ),
                  ),
                ],
                const SizedBox(height: 14),
              ],
            ),
          ),
        ],
      ),
    ),
    floatingActionButton: FloatingActionButton.extended(
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ReviewListPage(reviews : reviews,
            restaurantName: widget.restaurant.name
            ),
          ),
        );
      },
      label: const Text('Reviews'),
      icon: const Icon(Icons.rate_review),
    ),
    floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
  );
}



void _showAddDishDialog() {
  showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: const Text('Adicionar Prato'),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextField(
            controller: _dishFormController.dishNameController,
            decoration: const InputDecoration(
              labelText: 'Nome do prato',
            ),
          ),
          DropdownButtonFormField<String>(
            decoration: const InputDecoration(labelText: 'Vegan'),
            value: _dishFormController.isVegan ? 'SIM' : 'NÃO',
            items: <String>['SIM', 'NÃO']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
            onChanged: (newValue) {
              setState(() {
                _dishFormController.isVegan = newValue == 'SIM';
              });
            },
          ),
          TextField(
            controller: _dishFormController.priceController,
            decoration: const InputDecoration(
              labelText: 'Preço',
            ),
            keyboardType: TextInputType.number,
          ),
          DropdownButtonFormField<String>(
            decoration: const InputDecoration(labelText: 'Tipo de Prato'),
            value: _dishFormController.dishType,
            items: <String>['Sobremesa', 'Prato do Dia', 'Menu', 'Sopa']
                .map<DropdownMenuItem<String>>((String value) {
              return DropdownMenuItem<String>(
                value: value,
                child: Text(value),
              );
            }).toList(),
            onChanged: (newValue) {
              setState(() {
                _dishFormController.dishType = newValue ?? '';
              });
            },
          ),
        ],
      ),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.of(context).pop();
          },
          child: const Text('Cancelar'),
        ),
        TextButton(
          onPressed: () async {
            final dish = _dishFormController.getDish();
            final result = await addDish(widget.authToken, dish, widget.restaurant.name);
            print(widget.authToken);
            if (result == "success") {
              _dishFormController.clear();
              Navigator.of(context).pop();
              setState(() {});
            } else {
              print('Failed to add dish: $result');
            }
          },
          child: const Text('Adicionar'),
        ),
      ],
    ),
  );
}





Widget _buildDishesList(String title, Future<List<Dish>> Function(String, String) fetchDishes) {
  return FutureBuilder<List<Dish>>(
    future: fetchDishes(widget.authToken, widget.restaurant.name),
    builder: (context, snapshot) {
      if (snapshot.connectionState == ConnectionState.waiting) {
        return const Center(child: CircularProgressIndicator());
      } else if (snapshot.hasError) {
        return const Center(child: Text('Erro ao carregar os pratos'));
      } else {
        final List<Dish> dishes = snapshot.data!;
        if (dishes.isEmpty) {
          return const Center(child: Text('Não há pratos disponíveis'));
        } else {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                title,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 18,
                  fontFamily: 'RobotoSlab',
                ),
              ),
              const SizedBox(height: 8),
              ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: dishes.length,
                itemBuilder: (context, index) {
                  final dish = dishes[index];
                  return ListTile(
                    title: Text(
                      dish.dishName,
                      style: const TextStyle(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Row(
                      children: [
                        if (dish.isVegan) 
                          const Icon(
                            Icons.eco,
                            color: Colors.green,
                          ),
                        if (!dish.isVegan)
                          const Icon(
                            Icons.eco,
                            color: Colors.red,
                          ),
                        Text('Preço: ${dish.price}€'),
                      ],
                    ),
                    trailing: isManager
                        ? IconButton(
                            icon: const Icon(Icons.delete),
                            onPressed: () {
                              _deleteDish(dish);
                            },
                          )
                        : null,
                  );
                },
              ),
            ],
          );
        }
      }
    },
  );
}

void _deleteDish(Dish dish) async {
    final result = await deleteDish(widget.authToken, widget.restaurant.name, dish.dishID);
     if (result == "success") {
     _dishFormController.clear();
       Navigator.of(context).pop();
       setState(() {});
        } else {
       print('Failed to add dish: $result');
       }

  }
}

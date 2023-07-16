import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:discipulos_flutter/presentation/welcome/widgets/navigation_drawer.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurant_class.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurant_info.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurant_form.dart';
import 'package:discipulos_flutter/presentation/restaurants/restaurants_api.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class RestaurantListPage extends StatefulWidget {
  const RestaurantListPage({Key? key}) : super(key: key);

  @override
  _RestaurantListPageState createState() => _RestaurantListPageState();
}

class _RestaurantListPageState extends State<RestaurantListPage> {
  final RestaurantFormController _formController = RestaurantFormController();
  List<Restaurant> restaurants = [];
  Map<String, dynamic>? token;
  late String authToken;
  bool isAdmin = false;
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

  final TextStyle kDialogStyle = const TextStyle(
      color: Colors.black, fontSize: 16, fontWeight: FontWeight.bold);

  final snackBar = const SnackBar(
    content: Text('Restaurante adicionado com sucesso',
        style: TextStyle(color: Colors.white)),
    backgroundColor: Colors.green,
  );

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
    fetchAllRestaurants();
    checkAdminRole();
  }

  Future<void> checkAdminRole() async {
    var userRole = token!['role'].toString();
    setState(() {
      isAdmin = userRole == '4';
    });
  }

  Future<void> fetchAllRestaurants() async {
    final List<Restaurant> fetchedRestaurants =
        await fetchRestaurants(authToken);
    setState(() {
      restaurants = fetchedRestaurants;
    });
  }

  Future<void> _addNewRestaurant() async {
    final bool isValid = _formController.validate();

    if (isValid) {
      final Restaurant newRestaurant = _formController.getRestaurant();
      final String r = await addRestaurant(authToken, newRestaurant);
      print(authToken);
      if (r == 'success') {
        // ignore: use_build_context_synchronously
        showDialog(
          context: context,
          builder: (context) => const AlertDialog(
            title: Text('Restaurante adicionado com sucesso',
                style: TextStyle(color: Colors.green, fontSize: 16)),
            content: Icon(Icons.check_circle, color: Colors.green, size: 100),
            backgroundColor: Colors.white,
          ),
        );

        // ignore: use_build_context_synchronously
        Navigator.pushReplacement(
            context,
            MaterialPageRoute(
                builder: (context) => const RestaurantListPage()));
      }
      _formController.clear();
    } else {
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Erro',
              style: TextStyle(color: Colors.red, fontSize: 16)),
          content: const Text('Por favor preencha todos os campos.',
              style: TextStyle(fontWeight: FontWeight.bold)),
          actions: [
            ElevatedButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('OK'),
            ),
          ],
        ),
      );
    }
  }

  void _showAddRestaurantDialog() {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Adiciona um novo restaurante'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(
              controller: _formController.restaurantNameController,
              decoration: const InputDecoration(
                labelText: 'Nome do restaurante',
              ),
            ),
            TextField(
              controller: _formController.locationController,
              decoration: const InputDecoration(
                labelText: 'Localização',
              ),
            ),
            TextField(
              controller: _formController.managersController,
              decoration: const InputDecoration(
                labelText: 'Managers',
              ),
            ),
            TextField(
              controller: _formController.bannerUrlController,
              decoration: const InputDecoration(
                labelText: 'Banner URL',
              ),
            ),
          ],
        ),
        actions: [
          ElevatedButton(
            onPressed: () {
              Navigator.pop(context);
              _addNewRestaurant();
            },
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(kPrimaryColor),
            ),
            child: const Text('Adicionar'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.pop(context),
            style: ButtonStyle(
              backgroundColor: MaterialStateProperty.all<Color>(kPrimaryColor),
            ),
            child: const Text('Cancelar'),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const CustomNavigationDrawer(),
      appBar: AppBar(
        title: const Text(
          'Restauração',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: kPrimaryColor,
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Expanded(
              child: ListView.builder(
                itemCount: restaurants.length,
                itemBuilder: (context, index) {
                  final restaurant = restaurants[index];
                  return Card(
                    elevation: 2,
                    child: ListTile(
                      title: SizedBox(
                        width: double.infinity,
                        height: 200,
                        child: CachedNetworkImage(
                          imageUrl: restaurant.url,
                          fit: BoxFit.cover,
                          placeholder: (context, url) => Center(
                              child: CircularProgressIndicator(
                                  color: kPrimaryColor)),
                          errorWidget: (context, url, error) =>
                              Icon(Icons.error, color: kPrimaryColor),
                        ),
                      ),
                      subtitle: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              restaurant.name,
                              style: const TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: Colors.black),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              restaurant.location,
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            const SizedBox(height: 4),
                            Row(
                              children: [
                                Text(
                                  restaurant.numberOfRatings == 0
                                      ? 'Sem avaliações'
                                      : 'Classificação: ${(restaurant.rating / restaurant.numberOfRatings).toStringAsFixed(1)} (${restaurant.numberOfRatings})',
                                  style: const TextStyle(
                                      fontWeight: FontWeight.bold),
                                ),
                                const SizedBox(width: 4),
                                const Icon(Icons.star,
                                    color: Colors.amber, size: 20),
                              ],
                            ),
                          ],
                        ),
                      ),
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => RestaurantInfoPage(
                                restaurant: restaurant, authToken: authToken),
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
            ),
            if (isAdmin)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _showAddRestaurantDialog,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kPrimaryColor,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(0),
                    ),
                  ),
                  child: const Text('Adicionar novo restaurante',
                      style: TextStyle(color: Colors.white)),
                ),
              ),
          ],
        ),
      ),
    );
  }
}

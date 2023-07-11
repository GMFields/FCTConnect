class Restaurant {
  final String name;
  final String location;
  final List<String> restaurantManagers;
  final String takeAwayService;
  final String url;
  final int rating;
  final int numberOfRatings;

  Restaurant({
    required this.name,
    required this.location,
    required this.restaurantManagers,
    required this.takeAwayService,
    required this.url,
    required this.rating,
    required this.numberOfRatings
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) {
    return Restaurant(
      name: json['name'] as String,
      location: json['location'] as String,
      restaurantManagers: List<String>.from(json['restaurantManagers']),
      takeAwayService: json['takeAwayService'] as String,
      url: json['url'] as String,
      rating: json['restaurant_rating'] as int,
      numberOfRatings: json['restaurant_numberOfReviews'] as int,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'location': location,
      'restaurantManagers': restaurantManagers,
      'takeAwayService': takeAwayService,
      'url': url,
      'rating': rating,
      'numberOfRatings': numberOfRatings,
    };
  }
}

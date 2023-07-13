class Review {
  final int creationData;
  final String author;
  final String description;
  final int rating;
  final String restaurantName;
  final String reviewID;

  Review({
    required this.creationData,
    required this.author,
    required this.description,
    required this.rating,
    required this.restaurantName,
    required this.reviewID
  });

  factory Review.fromJson(Map<String, dynamic> json) {
    return Review(
      creationData: json['creationData'] as int,
      author: json['author'] as String,
      description: json['description'] as String,
      rating: json['rating'] as int,
      restaurantName: json['restaurantName'] as String,
      reviewID: json['reviewID'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'creationData': creationData,
      'author': author,
      'description': description,
      'rating': rating,
      'restaurantName': restaurantName,
      'reviewID': reviewID,
    };
  }

}
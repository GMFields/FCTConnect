class Waypoint {
  final double latitude;
  final double longitude;
  final int creationData;
  final String name;
  final String wayPointID;

  Waypoint({
    required this.latitude,
    required this.longitude,
    required this.creationData,
    required this.name,
    required this.wayPointID,
  });

  factory Waypoint.fromJson(Map<String, dynamic> json) {
    return Waypoint(
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
      creationData: json['creationData'] as int,
      name: json['name'] as String,
      wayPointID: json['wayPointID'] as String,
    );
  }
}
import 'package:http/http.dart' as http;

void main(List<String> args) {
  fetchAuthenticateGAE().then((value) => print(value));
}

Future<String> fetchAuthenticateGAE() async {
  final url = Uri.parse(
      'http://localhost:8080/rest/chat/auth?socket_id=152770.26808&channel=private-channel');

  final response = await http.post(
    url,
    headers: <String, String>{
      'Content-Type': 'application/json',
    },
  );

  if (response.statusCode == 200) {
    final token = response.body;
    return "success";
  } else if (response.statusCode == 404) {
    return "User not found";
  } else if (response.statusCode == 403) {
    final errorMessage = response.body;
    if (errorMessage.contains("Wrong password")) {
      return "Wrong password";
    } else
      return "Account is not active, contact an admin!";
  } else {
    return "Server error";
  }
}

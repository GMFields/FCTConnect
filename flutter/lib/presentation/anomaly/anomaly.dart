import 'dart:convert';
import 'package:discipulos_flutter/constants/constants.dart';
import 'package:discipulos_flutter/presentation/anomaly/new_anomaly.dart';
import 'package:discipulos_flutter/presentation/welcome/widgets/navigation_drawer.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class Anomaly {
  final String creator;
  final String description;
  final bool isSolved;

  Anomaly(
      {required this.creator,
      required this.description,
      required this.isSolved});
}

class AnomalyListPage extends StatefulWidget {
  const AnomalyListPage({Key? key}) : super(key: key);

  @override
  _AnomalyListPageState createState() => _AnomalyListPageState();
}

class _AnomalyListPageState extends State<AnomalyListPage> {
  List<Anomaly> anomalies = [];
  final Color kPrimaryColor = const Color.fromARGB(255, 10, 82, 134);
  bool isLoading = false;
  String? nextPageCursor;

  @override
  void initState() {
    super.initState();
    fetchAnomalies(null);
  }

  Future<void> fetchAnomalies(String? cursor) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }
    final url = Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/anomaly/list")
        .replace(queryParameters: {'tokenObj': token, 'cursor': cursor});
    final response = await http.get(url);

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = jsonDecode(response.body);
      final List<dynamic> anomalyList = data['anomalies'];
      setState(() {
        anomalies = anomalyList.map((json) {
          return Anomaly(
            creator: json[0],
            description: json[1],
            isSolved: json[2] == 'true',
          );
        }).toList();
        nextPageCursor = data['cursor'];
      });
    } else {
      throw Exception('Failed to fetch anomalies');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Anomalias',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: kPrimaryColor,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 10),
              itemCount: anomalies.length,
              separatorBuilder: (context, index) => const SizedBox(height: 10.0),
              itemBuilder: (context, index) {
                final anomaly = anomalies[index];
                return Card(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                  elevation: 5,
                  child: ListTile(
                    leading: CircleAvatar(
                      backgroundColor: anomaly.isSolved ? Colors.green : Colors.red,
                      child: Icon(
                        anomaly.isSolved ? Icons.check : Icons.close,
                        color: Colors.white,
                      ),
                    ),
                    title: Text(
                      'Autor: ${anomaly.creator}',
                      style: const TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    subtitle: Text(
                      'Resolvido? ${anomaly.isSolved ? "Sim" : "Não"}',
                      style: TextStyle(
                        fontSize: 16.0,
                        color: anomaly.isSolved ? Colors.green : Colors.red,
                      ),
                    ),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => AnomalyDetailPage(anomaly: anomaly),
                                ),
                              );
                            },
                          ),
                        );
                      },
                    ),
                  ),
                Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                ElevatedButton(
                  onPressed: isLoading || nextPageCursor == null
                      ? null
                      : () {
                          fetchAnomalies(null);
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kPrimaryColor,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                  ),
                  child: const Text('Voltar ao inicio', style: TextStyle(fontSize: 16.0)),
                ),
                 ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => AddAnomalyPage()),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kPrimaryColor,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                  ),
                  child: const Text('Adicionar anomalia', style: TextStyle(fontSize: 16.0)),
                ),
                 ElevatedButton(
                  onPressed: isLoading || nextPageCursor == null
                      ? null
                      : () {
                          fetchAnomalies(nextPageCursor);
                        },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: kPrimaryColor,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30.0),
                    ),
                  ),
                  child: isLoading
                      ? const CircularProgressIndicator()
                      : const Text('Carregar mais', style: TextStyle(fontSize: 16.0)),
                ),
              ],
            ),
          ],
        ),
    );
  }
}

class AnomalyDetailPage extends StatelessWidget {
  final Anomaly anomaly;
  final Color kPrimaryColor = const Color.fromARGB(255, 10, 82, 134);

  const AnomalyDetailPage({Key? key, required this.anomaly}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final decodedDescription = utf8.decode(anomaly.description.runes.toList());

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Detalhes da Anomalia',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontFamily: 'RobotoSlab',
            fontWeight: FontWeight.w600,
          ),
        ),
        backgroundColor: kPrimaryColor,
        iconTheme: const IconThemeData(color: Colors.white),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Card(
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
          elevation: 5,
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Text(
                    'Autor: ${anomaly.creator}',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 20,
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                const Divider(),
                const SizedBox(height: 10),
                const Text(
                  'Descrição:',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  decodedDescription,
                  style: const TextStyle(
                    fontSize: 18,
                  ),
                ),
                const SizedBox(height: 10),
                const Divider(),
                const SizedBox(height: 10),
                Row(
                  children: [
                    const Text(
                      'Resolvido? ',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                      ),
                    ),
                    Text(
                      anomaly.isSolved ? 'Sim' : 'Não',
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                        color: anomaly.isSolved ? Colors.green : Colors.red,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

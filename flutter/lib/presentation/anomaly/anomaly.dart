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

  Anomaly({required this.creator, required this.description, required this.isSolved});
}

class AnomalyListPage extends StatefulWidget {
  const AnomalyListPage({super.key});

  @override
  _AnomalyListPageState createState() => _AnomalyListPageState();
}

class _AnomalyListPageState extends State<AnomalyListPage> {
  List<Anomaly> anomalies = [];

  @override
  void initState() {
    super.initState();
    fetchAnomalies();
  }

  Future<void> fetchAnomalies() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }
    final response = await http.get(Uri.parse("https://helical-ascent-385614.oa.r.appspot.com/rest/anomaly/list")
    .replace(queryParameters: {'tokenObj': token}));

    if (response.statusCode == 200) {
      final List<dynamic> anomalyList = jsonDecode(response.body);
      setState(() {
        anomalies = anomalyList.map((json) {
          return Anomaly(
            creator: json[0],
            description: json[1],
            isSolved: json[2] == 'true',
          );
        }).toList();
      });
    } else {
      throw Exception('Failed to fetch anomalies');
    }
  }

  
@override
Widget build(BuildContext context) {
  return Scaffold(
    drawer: const CustomNavigationDrawer(),
    appBar: AppBar(
      title: const Text(
        'Anomalias',
        style: TextStyle(
          color: Color.fromARGB(255, 0, 0, 0),
          fontSize: 20,
          fontFamily: 'RobotoSlab',
        ),
      ),
      backgroundColor: const Color.fromARGB(255, 237, 237, 237),
      iconTheme: const IconThemeData(color: Colors.black),
    ),
    body: Column(
      children: [
        Expanded(
          child: ListView.separated(
            itemCount: anomalies.length,
            separatorBuilder: (context, index) => const Divider(),
            itemBuilder: (context, index) {
              final anomaly = anomalies[index];
              final solvedText = anomaly.isSolved ? 'Sim' : 'Não';
              final textStyle = TextStyle(
                fontSize: 16.0,
                fontWeight: FontWeight.bold,
                color: anomaly.isSolved ? Colors.green : Colors.red,
              );

              return GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => AnomalyDetailPage(anomaly: anomaly),
                    ),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(8.0),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.1),
                        blurRadius: 3.0,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Autor: ${anomaly.creator}',
                        style: const TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 8.0),
                      Row( 
                        children: [
                          const Text(
                            'Resolvido? ',
                            style: TextStyle(
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            solvedText,
                            style: textStyle,
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(16.0),
          child: ElevatedButton(
            onPressed: () { 
               Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => AddAnomalyPage()),
             );               
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color.fromARGB(255, 255, 196, 0),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(30.0),
              ),
            ),
            child: Text('Adicionar anomalia', style: kLabelStyle),
          ),
        ),
      ],
    ),
  );
}



}
class AnomalyDetailPage extends StatelessWidget {
  final Anomaly anomaly;

  AnomalyDetailPage({super.key, required this.anomaly});

  @override
  Widget build(BuildContext context) {
    final decodedDescription = utf8.decode(anomaly.description.runes.toList());
    
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Detalhes da anomalia',
          style: TextStyle(
            color: Color.fromARGB(255, 0, 0, 0),
            fontSize: 20,
            fontFamily: 'RobotoSlab',
          ),
        ),
        backgroundColor: const Color.fromARGB(255, 237, 237, 237),
        iconTheme: const IconThemeData(color: Colors.black),
      ),
      body: Padding(
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
    );
  }
}


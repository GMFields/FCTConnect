import 'package:discipulos_flutter/presentation/welcome/widgets/navigation_drawer.dart';
import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:duration_picker/duration_picker.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    supportedLocales: const [
      Locale('pt', 'PT'),
    ],
    locale: const Locale('pt', 'PT'),
    home: CalendarApp(),
  ));
}

class CalendarApp extends StatefulWidget {
  @override
  _CalendarAppState createState() => _CalendarAppState();
}

class Event {
  final String title;
  final String description;
  final DateTime startTime;
  final DateTime endTime;
  final bool isCreated;
  final String id;

  Event(this.title, this.description, this.startTime, this.endTime, this.id,
      {this.isCreated = false});
}

class _CalendarAppState extends State<CalendarApp> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _selectedDate = DateTime.now();
  DateTime _focusedDate = DateTime.now();
  DateTime _firstDay = DateTime.now().subtract(const Duration(days: 30));
  DateTime _lastDay = DateTime.now().add(const Duration(days: 150));
  Map<DateTime, List<Event>> _events = {};
  //final Color kPrimaryColor = const Color.fromARGB(255, 21, 39, 141);
  final Color kPrimaryColor = Color.fromARGB(255, 10, 82, 134);

  @override
  void initState() {
    super.initState();
    fetchEvents(_events);
  }

  Future<void> fetchEvents(Map<DateTime, List<Event>> events) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }
    final username = jsonDecode(token)['username'];
    final url = Uri.parse(
            'http://helical-ascent-385614.oa.r.appspot.com/rest/calendar/getall')
        .replace(queryParameters: {'tokenObj': token, 'username': username});
    final headers = {
      'Content-Type': 'application/json',
    };

    final response = await http.get(url, headers: headers);

    if (response.statusCode == 200) {
      print("success");
      List<dynamic> entities = jsonDecode(response.body);
      print("success 2");
      for (var entity in entities) {
        var eventTitle = entity['event_title'];
        var eventDescription = entity['event_description'];
        var eventDate = entity['event_date'];
        var eventEndDate = entity['event_end_date'];
        var parsedDate = DateTime.parse(eventDate).toLocal();
        var id = entity['id'];

        var parsedEndDate = DateTime.parse(eventEndDate).toLocal();
        print("success 3");
        print("parsedDate: " + parsedDate.toString());

        print("parsedEndDate: " + parsedEndDate.toString());
        print("selectedDate: " + _selectedDate.toString());
        final event = Event(
            eventTitle, eventDescription, parsedDate, parsedEndDate, id,
            isCreated: true);

        final y = DateTime(
          parsedDate.year,
          parsedDate.month,
          parsedDate.day,
          0,
          0,
        );

        setState(() {
          events[y] ??= [];
          events[y]!.add(event);
        });
      }

      events.forEach((date, eventList) {
        eventList.forEach((event) {});
      });
    } else if (response.statusCode == 404) {
      print("User not found");
    } else if (response.statusCode == 403) {
      final errorMessage = response.body;
      if (errorMessage.contains("Wrong password")) {
        print("Wrong password");
      } else {
        print("something went wrong 1");
      }
    } else {
      print("error: " + response.statusCode.toString());
    }
  }

  void deleteEvent(Event event) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
            'http://helical-ascent-385614.oa.r.appspot.com/rest/calendar/remove')
        .replace(queryParameters: {'tokenObj': token, 'eventID': event.id});
    final headers = {
      'Content-Type': 'application/json',
    };
    final response = await http.delete(url, headers: headers);

    print("url: " + url.toString());
    print("satatus: " + response.statusCode.toString());

    if (response.statusCode == 200) {
      final dateKey = DateTime(
        event.startTime.year,
        event.startTime.month,
        event.startTime.day,
        0,
        0,
      );
      setState(() {
        _events[dateKey]?.remove(event);
      });
    }
  }

  void showDeleteConfirmationDialog(Event event) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Eliminar'),
          content: const Text('Queres eliminar o evento?'),
          actions: [
            TextButton(
              onPressed: () {
                deleteEvent(event);
                Navigator.of(context).pop();
              },
              child: const Text('Eliminar'),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: const Text('Cancelar'),
            ),
          ],
        );
      },
    );
  }

  Future<String> addPermission(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
            'http://helical-ascent-385614.oa.r.appspot.com/rest/calendar/addaccess')
        .replace(queryParameters: {'tokenObj': token, 'username': username});
    final headers = {
      'Content-Type': 'application/json',
    };
    final response = await http.post(url, headers: headers);
    return response.statusCode.toString();
  }

  Future<String> removePermission(String username) async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('token');
    if (token == null) {
      throw Exception('Token not found in cache');
    }

    final url = Uri.parse(
            'http://helical-ascent-385614.oa.r.appspot.com/rest/calendar/removeaccess')
        .replace(queryParameters: {'tokenObj': token, 'username': username});
    final headers = {
      'Content-Type': 'application/json',
    };
    final response = await http.delete(url, headers: headers);
    return response.statusCode.toString();
  }

  @override
  Widget build(BuildContext context) {
    final t = DateTime(
      _selectedDate.year,
      _selectedDate.month,
      _selectedDate.day,
      0,
      0,
    );
    return Scaffold(
      drawer: const CustomNavigationDrawer(),
      appBar: AppBar(
        backgroundColor: kPrimaryColor,
        title: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            const Text('Calendário',
                style: TextStyle(
                  color: Colors.white,
                  fontFamily: 'Roboto',
                  fontWeight: FontWeight.w600,
                )),
            Row(
              children: [
                IconButton(
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        String textFieldValue = '';
                        return AlertDialog(
                          title: const Text('Adicionar Permissão'),
                          content: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              TextField(
                                onChanged: (value) {
                                  textFieldValue = value;
                                },
                                decoration: const InputDecoration(
                                  labelText: 'username',
                                ),
                              ),
                            ],
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                addPermission(textFieldValue);
                                Navigator.of(context).pop();
                              },
                              child: const Text('Adicionar'),
                            ),
                          ],
                        );
                      },
                    );
                  },
                  icon: const Icon(Icons.add_reaction_rounded),
                ),
                const SizedBox(width: 8),
                IconButton(
                  onPressed: () {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        String textFieldValue = '';
                        return AlertDialog(
                          title: const Text('Remover Permissão'),
                          content: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              TextField(
                                onChanged: (value) {
                                  textFieldValue = value;
                                },
                                decoration: const InputDecoration(
                                  labelText: 'username',
                                ),
                              ),
                            ],
                          ),
                          actions: [
                            TextButton(
                              onPressed: () {
                                removePermission(textFieldValue);
                                Navigator.of(context).pop();
                              },
                              child: const Text('Remover'),
                            ),
                          ],
                        );
                      },
                    );
                  },
                  icon: const Icon(Icons.person_remove_alt_1),
                ),
              ],
            ),
          ],
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            TableCalendar(
              calendarFormat: _calendarFormat,
              firstDay: _firstDay,
              lastDay: _lastDay,
              focusedDay: _focusedDate,
              selectedDayPredicate: (day) {
                return isSameDay(_selectedDate, day);
              },
              onDaySelected: (selectedDay, focusedDay) {
                setState(() {
                  _selectedDate = selectedDay;
                  _focusedDate = focusedDay;
                });

                final z = DateTime(
                  _selectedDate.year,
                  _selectedDate.month,
                  _selectedDate.day,
                  0,
                  0,
                );
              },
              onFormatChanged: (format) {
                setState(() {
                  _calendarFormat = format;
                });
              },
              calendarStyle: const CalendarStyle(
                selectedDecoration: BoxDecoration(
                  //color: Color.fromARGB(255, 21, 39, 141),
                  color: Color.fromARGB(255, 10, 82, 134),

                  shape: BoxShape.circle,
                ),
                todayDecoration: BoxDecoration(
                  color: Colors.orange,
                  shape: BoxShape.circle,
                ),
                markerDecoration: BoxDecoration(
                  color: Colors.green,
                  shape: BoxShape.rectangle,
                ),
                markersMaxCount: 1,
              ),
              calendarBuilders: CalendarBuilders(
                markerBuilder: (context, date, events) {
                  if (events.isNotEmpty) {
                    return const Positioned(
                      right: 1,
                      bottom: 1,
                      child: Icon(
                        Icons.circle,
                        color: Colors.green,
                        size: 8.0,
                      ),
                    );
                  }
                  return Container();
                },
              ),
            ),
            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                _showAddEventDialog(context);
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(
                  kPrimaryColor,
                ),
              ),
              child: const Text('Adicionar Evento'),
            ),
            const SizedBox(height: 20),
            const Text(
              'Eventos',
              style: TextStyle(fontSize: 20),
            ),
            Column(
              children: _events[t] != null
                  ? _events[t]!
                      .map(
                        (event) => GestureDetector(
                          onTap: () {
                            // Show delete confirmation dialog
                            showDeleteConfirmationDialog(event);
                          },
                          child: Container(
                            decoration: BoxDecoration(
                              color: event.isCreated
                                  ? Colors.blue
                                  : Colors.transparent,
                              borderRadius: BorderRadius.circular(8.0),
                            ),
                            padding: const EdgeInsets.all(8.0),
                            margin: const EdgeInsets.symmetric(vertical: 4.0),
                            child: RichText(
                              textAlign: TextAlign.center,
                              text: TextSpan(
                                children: [
                                  TextSpan(
                                    text: '${event.title}: ',
                                    style: const TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 18,
                                    ),
                                  ),
                                  TextSpan(
                                    text:
                                        '${event.startTime.hour}:${event.startTime.minute} - ${event.endTime.hour}:${event.endTime.minute}\n\n',
                                  ),
                                  TextSpan(
                                    text: '${event.description}',
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ),
                      )
                      .toList()
                  : [],
            ),
          ],
        ),
      ),
    );
  }

  void _showAddEventDialog(BuildContext context) {
    String newEventTitle = '';
    String newEventDescription = '';
    TimeOfDay? newEventStartTime;
    TimeOfDay? newEventEndTime;
    Duration? newEventDuration;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Adicionar Evento'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                onChanged: (value) {
                  newEventTitle = value;
                },
                decoration: const InputDecoration(
                  labelText: 'Evento',
                ),
              ),
              TextField(
                onChanged: (value) {
                  newEventDescription = value;
                },
                decoration: const InputDecoration(
                  labelText: 'Descrição',
                ),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () async {
                        final selectedTime = await showTimePicker(
                          context: context,
                          initialTime: TimeOfDay.now(),
                        );
                        setState(() {
                          newEventStartTime = selectedTime;
                        });
                      },
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(
                          kPrimaryColor,
                        ),
                      ),
                      child: const Text('Hora de início'),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () async {
                        final selectedDuration = await showDurationPicker(
                          context: context,
                          initialTime: const Duration(minutes: 0),
                        );
                        setState(() {
                          newEventDuration = selectedDuration;
                        });
                      },
                      style: ButtonStyle(
                        backgroundColor: MaterialStateProperty.all<Color>(
                          kPrimaryColor,
                        ),
                      ),
                      child: const Text('Duração '),
                    ),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                if (newEventStartTime != null && newEventDuration != null) {
                  final startTime = DateTime(
                    _selectedDate.year,
                    _selectedDate.month,
                    _selectedDate.day,
                    newEventStartTime!.hour,
                    newEventStartTime!.minute,
                  );
                  final endTime = startTime.add(newEventDuration!);
                  final formattedStartTime =
                      '${startTime.year}-${_twoDigits(startTime.month)}-${_twoDigits(startTime.day)}T${_twoDigits(startTime.hour)}:${_twoDigits(startTime.minute)}:${_twoDigits(startTime.second)}+01:00';
                  final duration = newEventDuration!.inMilliseconds;
                  String id = addEvent(newEventTitle, newEventDescription,
                          formattedStartTime, duration)
                      .toString();
                  final event = Event(newEventTitle, newEventDescription,
                      startTime, endTime, id,
                      isCreated: true);
                  final x = DateTime(
                    _selectedDate.year,
                    _selectedDate.month,
                    _selectedDate.day,
                    0,
                    0,
                  );

                  setState(() {
                    _events[x] ??= [];
                    _events[x]!.add(event);
                  });

                  _events.forEach((date, eventList) {
                    eventList.forEach((event) {});
                  });
                }
                Navigator.of(context).pop();
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(
                  kPrimaryColor,
                ),
              ),
              child: const Text(
                'Guardar',
                style: TextStyle(color: Colors.white),
              ),
            ),
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all<Color>(
                  kPrimaryColor,
                ),
              ),
              child: const Text(
                'Cancelar',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        );
      },
    );
  }
}

String _twoDigits(int n) {
  if (n >= 10) {
    return "$n";
  }
  return "0$n";
}

Future<String> addEvent(String title, String description,
    String formattedStartTime, int duration) async {
  String res = await fetchEventOps(
      title, description, formattedStartTime, duration, "add");
  return res;
}

Future<String> fetchEventOps(String title, String description,
    String formattedStartTime, int duration, String operation) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  final url = Uri.parse(
          'http://helical-ascent-385614.oa.r.appspot.com/rest/calendar/$operation')
      .replace(queryParameters: {'tokenObj': token});

  final headers = {
    'Content-Type': 'application/json',
  };

  final bodyEvent = jsonEncode({
    'title': title,
    'description': description,
    'date': formattedStartTime,
    'duration': duration,
  });

  final response = await http.post(url, headers: headers, body: bodyEvent);

  if (response.statusCode == 200) {
    print("succsess");
  } else if (response.statusCode == 404) {
    print("User not found");
  } else if (response.statusCode == 403) {
    final errorMessage = response.body;
    if (errorMessage.contains("Wrong password")) {
      print("Wrong password");
    } else
      print("something went wrong 1");
  } else {
    print("error: " + response.statusCode.toString());
  }
  print("response body : response.body");
  return response.body;
}

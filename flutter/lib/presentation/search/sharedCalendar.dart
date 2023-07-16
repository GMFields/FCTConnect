import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class sharedCalendar extends StatefulWidget {
  final String username;

  const sharedCalendar({required this.username});

  @override
  _CalendarAppState createState() => _CalendarAppState();
}

class Event {
  final String title;
  final String description;
  final DateTime startTime;
  final DateTime endTime;
  final bool isCreated;

  Event(this.title, this.description, this.startTime, this.endTime,
      {this.isCreated = false});
}

class _CalendarAppState extends State<sharedCalendar> {
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

    final url = Uri.parse(
            'http://helical-ascent-385614.oa.r.appspot.com/rest/calendar/getall')
        .replace(
            queryParameters: {'tokenObj': token, 'username': widget.username});
    print("url: " + url.toString());

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

        var parsedEndDate = DateTime.parse(eventEndDate).toLocal();
        print("success 3");
        print("parsedDate: " + parsedDate.toString());

        print("parsedEndDate: " + parsedEndDate.toString());
        print("selectedDate: " + _selectedDate.toString());
        final event = Event(
            eventTitle, eventDescription, parsedDate, parsedEndDate,
            isCreated: true);

        final y = DateTime(
          parsedDate.year,
          parsedDate.month,
          parsedDate.day,
          0,
          0,
        );

        print("Events for selectedDate: " + events[_selectedDate].toString());

        setState(() {
          events[y] ??= [];
          events[y]!.add(event);
        });

        print("Events for parsedDate: " + events[parsedDate].toString());
        print("Events for selectedDate: " + events[_selectedDate].toString());
      }

      events.forEach((date, eventList) {
        print("Date: $date");
        eventList.forEach((event) {
          print("Event: ${event.title}");
          // Print other event properties as needed
        });
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
      appBar: AppBar(
        backgroundColor: kPrimaryColor,
        title: const Text('Calendário'),
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
                print("Selected Date: $z");
                print("Events for selectedDate: " + _events[z].toString());
              },
              onFormatChanged: (format) {
                setState(() {
                  _calendarFormat = format;
                });
              },
              calendarStyle: const CalendarStyle(
                selectedDecoration: BoxDecoration(
                  //color: Color.fromARGB(199, 40, 64, 183),
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
            const SizedBox(height: 20),
            const Text(
              'Eventos',
              style: TextStyle(fontSize: 20),
            ),
            Column(
              children: _events[t] != null
                  ? _events[t]!
                      .map(
                        (event) => Container(
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
                      )
                      .toList()
                  : [],
            ),
          ],
        ),
      ),
    );
  }
}

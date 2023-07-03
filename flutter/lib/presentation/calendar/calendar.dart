import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

void main() {
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: CalendarApp(),
  ));
}

class CalendarApp extends StatefulWidget {
  @override
  _CalendarAppState createState() => _CalendarAppState();
}

class Event {
  final String title;
  final DateTime startTime;
  final DateTime endTime;

  Event(this.title, this.startTime, this.endTime);
}

class _CalendarAppState extends State<CalendarApp> {
  CalendarFormat _calendarFormat = CalendarFormat.month;
  DateTime _selectedDate = DateTime.now();
  DateTime _focusedDate = DateTime.now();
  DateTime _firstDay = DateTime.now();
  DateTime _lastDay = DateTime.now().add(Duration(days: 30));
  Map<DateTime, List<Event>> _events = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Calendar App'),
      ),
      body: Column(
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
            },
            onFormatChanged: (format) {
              setState(() {
                _calendarFormat = format;
              });
            },
            calendarStyle: CalendarStyle(
              selectedDecoration: BoxDecoration(
                color: Colors.blue,
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
                  return Positioned(
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
          SizedBox(height: 20),
          ElevatedButton(
            onPressed: () {
              _showAddEventDialog(context);
            },
            child: Text('Add Event'),
          ),
          SizedBox(height: 20),
          Text(
            'Selected Date: ${_selectedDate.toString()}',
            style: TextStyle(fontSize: 20),
          ),
          SizedBox(height: 20),
          Text(
            'Events for selected date:',
            style: TextStyle(fontSize: 20),
          ),
          Column(
            children: _events[_selectedDate] != null
                ? _events[_selectedDate]!
                    .map((event) => Text(
                          '${event.title}: ${event.startTime.hour}:${event.startTime.minute} - ${event.endTime.hour}:${event.endTime.minute}',
                        ))
                    .toList()
                : [],
          ),
        ],
      ),
    );
  }

  void _showAddEventDialog(BuildContext context) {
    String newEventTitle = '';
    TimeOfDay? newEventStartTime;
    TimeOfDay? newEventEndTime;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Add Event'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                onChanged: (value) {
                  newEventTitle = value;
                },
                decoration: InputDecoration(
                  labelText: 'Event Title',
                ),
              ),
              SizedBox(height: 10),
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
                      child: Text('Select Start Time'),
                    ),
                  ),
                  SizedBox(width: 10),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () async {
                        final selectedTime = await showTimePicker(
                          context: context,
                          initialTime: TimeOfDay.now(),
                        );
                        setState(() {
                          newEventEndTime = selectedTime;
                        });
                      },
                      child: Text('Select End Time'),
                    ),
                  ),
                ],
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                if (newEventStartTime != null && newEventEndTime != null) {
                  addEvent();
                  final startTime = DateTime(
                    _selectedDate.year,
                    _selectedDate.month,
                    _selectedDate.day,
                    newEventStartTime!.hour,
                    newEventStartTime!.minute,
                  );
                  final endTime = DateTime(
                    _selectedDate.year,
                    _selectedDate.month,
                    _selectedDate.day,
                    newEventEndTime!.hour,
                    newEventEndTime!.minute,
                  );
                  setState(() {
                    _events[_selectedDate] ??= [];
                    _events[_selectedDate]!.add(Event(
                      newEventTitle,
                      startTime,
                      endTime,
                    ));
                  });
                }
                Navigator.of(context).pop();
              },
              child: Text('Save'),
            ),
          ],
        );
      },
    );
  }
}

Future<String> addEvent() async {
  // Call the fetchAuthenticateGAE function to authenticate the user
  String res = await fetchEventOps("add");

  // Return the authentication status
  return res;
}

final bodyAddEvent = {
  'title': 'value1',
  'description': 'value2',
  'date': 'value3',
  'duration': 'value4',
  'eventID': 'value5',
};

Future<String> fetchEventOps(String operation) async {
  final prefs = await SharedPreferences.getInstance();
  final token = prefs.getString('token');
  if (token == null) {
    throw Exception('Token not found in cache');
  }

  final bodyJson = json.encode(bodyAddEvent);

  final response = await http.post(
    Uri.parse('http://localhost:8080/rest/calendar/$operation')
        .replace(queryParameters: {'tokenObjStr': token}),
    body: bodyJson,
  );

  if (response.statusCode == 200) {
    final token = response.body;
    SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', token);
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

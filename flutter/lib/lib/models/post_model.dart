import '../models/author_model.dart';
import '../models/replies_model.dart';

class Question {
  String question;
  String content;
  int votes;
  int repliesCount;
  int views;
  String created_at;
  String id;
  Author author;
  List<Reply> replies;

  Question(
      {required this.question,
      required this.content,
      required this.votes,
      required this.repliesCount,
      required this.views,
      required this.created_at,
      required this.id,
      required this.author,
      required this.replies});
}

List<dynamic> questions = [];

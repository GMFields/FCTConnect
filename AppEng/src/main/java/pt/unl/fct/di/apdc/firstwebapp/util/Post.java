package pt.unl.fct.di.apdc.firstwebapp.util;

public class Post {

    String question;
    String content;
    int votes;
    int repliesCount;
    int views;
    String created_at;
    String author;
    int likes;

    String id;

    public Post() {
    }

    public Post(String author, String content, int likes, String id) {
        this.author = author;
        this.content = content;
        this.likes = likes;
        this.id = id;
    }

    public Post(String question, String content, int votes, int repliesCount, int views, String created_at,
            String author, String id) {
        this.question = question;
        this.content = content;
        this.votes = votes;
        this.repliesCount = repliesCount;
        this.views = views;
        this.created_at = created_at;
        this.author = question;
        this.id = id;
    }

    public String getQuestion() {
        return this.question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getVotes() {
        return this.votes;
    }

    public void setVotes(int votes) {
        this.votes = votes;
    }

    public int getRepliesCount() {
        return this.repliesCount;
    }

    public void setRepliesCount(int repliesCount) {
        this.repliesCount = repliesCount;
    }

    public int getViews() {
        return this.views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public String getCreated_at() {
        return this.created_at;
    }

    public void setCreated_at(String created_at) {
        this.created_at = created_at;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getLikes() {
        return this.likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

}

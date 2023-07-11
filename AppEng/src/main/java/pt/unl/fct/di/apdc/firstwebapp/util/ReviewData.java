package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class ReviewData {
    private String reviewID;
    private String restaurantName;
    private String author;
    private String description;
    private int rating;
    private long creationData;

    public ReviewData() {}

    public ReviewData(String restaurantName, String author, String description, int rating) {
        this.reviewID = UUID.randomUUID().toString();
        this.restaurantName = restaurantName;
        this.author = author;
        this.description = description;
        this.rating = rating;
        this.creationData = System.currentTimeMillis();
    }

    public String getReviewID() {
        return reviewID;
    }

    public void setReviewID(String reviewID) {
        this.reviewID = reviewID;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public long getCreationData() {
        return creationData;
    }

    public void setCreationData(long creationData) {
        this.creationData = creationData;
    }
}

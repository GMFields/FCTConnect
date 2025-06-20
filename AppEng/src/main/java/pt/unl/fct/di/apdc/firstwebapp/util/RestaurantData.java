package pt.unl.fct.di.apdc.firstwebapp.util;

import com.google.gson.Gson;

import java.util.List;

public class RestaurantData {

    private String name;
    private String location;
    private List<String> restaurantManagers;
    private String takeAwayService;
    private String URL;
    private int rating;
    private int numberOfRatings;

    public RestaurantData(String name, String location, List<String> restaurantManagers,
                          String takeAwayService, String URL, int rating, int numberOfRatings) {
        this.name = name;
        this.location = location;
        this.restaurantManagers = restaurantManagers;
        this.takeAwayService = takeAwayService;
        this.URL = URL;
        this.rating = rating;
        this.numberOfRatings = numberOfRatings;
    }

    public RestaurantData() {
    }

    private final Gson g = new Gson();
    public RestaurantData(String name, String location, List<String> restaurantManagers, String takeAwayService, String URL) {
        this.name = name;
        this.location = location;
        this.restaurantManagers = restaurantManagers;
        this.takeAwayService = takeAwayService;
        this.URL = URL;
    }


    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getNumberOfRatings() {
        return numberOfRatings;
    }

    public void setNumberOfRatings(int numberOfRatings) {
        this.numberOfRatings = numberOfRatings;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getRestaurantManagers() {
        return restaurantManagers;
    }

    public void setRestaurantManagers(List<String> restaurantManagers) {
        this.restaurantManagers = restaurantManagers;
    }

    public String getTakeAwayService() {
        return takeAwayService;
    }

    public void setTakeAwayService(String takeAwayService) {
        this.takeAwayService = takeAwayService;
    }

    public String getURL() { return URL; }

    public void setURL(String URL) { this.URL = URL; }

}

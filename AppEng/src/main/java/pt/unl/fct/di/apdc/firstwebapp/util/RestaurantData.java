package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.List;

public class RestaurantData {

    private String name;
    private String location;
    private List<String> dailyDishes;
    private List<String> fixedMenus;
    private List<String> desserts;
    private String takeAwayService;

    public RestaurantData() {
    }

    public RestaurantData(String name, String location, List<String> dailyDishes, List<String> fixedMenus, List<String> desserts, String takeAwayService) {
        this.name = name;
        this.location = location;
        this.dailyDishes = dailyDishes;
        this.fixedMenus = fixedMenus;
        this.desserts = desserts;
        this.takeAwayService = takeAwayService;
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

    public List<String> getDailyDishes() {
        return dailyDishes;
    }

    public void setDailyDishes(List<String> dailyDishes) {
        this.dailyDishes = dailyDishes;
    }

    public List<String> getFixedMenus() {
        return fixedMenus;
    }

    public void setFixedMenus(List<String> fixedMenus) {
        this.fixedMenus = fixedMenus;
    }

    public List<String> getDesserts() {
        return desserts;
    }

    public void setDesserts(List<String> desserts) {
        this.desserts = desserts;
    }

    public String getTakeAwayService() {
        return takeAwayService;
    }

    public void setTakeAwayService(String takeAwayService) {
        this.takeAwayService = takeAwayService;
    }
}

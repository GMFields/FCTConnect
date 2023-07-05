package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class DishData {
    private String restaurantName;
    private String dishName;
    private boolean isVegan;
    private double price;
    private String tokenID;

    public DishData() {}

    public DishData(String restaurantName, String dishName, boolean isVegan, double price) {
        this.restaurantName = restaurantName;
        this.dishName = dishName;
        this.isVegan = isVegan;
        this.price = price;
        this.tokenID = UUID.randomUUID().toString();
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getDishName() {
        return dishName;
    }

    public void setDishName(String dishName) {
        this.dishName = dishName;
    }

    public boolean isVegan() {
        return isVegan;
    }

    public void setVegan(boolean vegan) {
        isVegan = vegan;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getTokenID() {
        return tokenID;
    }

    public void setTokenID(String tokenID) {
        this.tokenID = tokenID;
    }
}

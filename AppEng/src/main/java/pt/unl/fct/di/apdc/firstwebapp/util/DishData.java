package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class DishData {
    private String restaurantName;
    private String dishName;
    private boolean isVegan;
    private double price;
    private String dishID;
    private String dishType;

    public DishData() {}

    public DishData(String restaurantName, String dishName, boolean isVegan, double price, String dishType) {
        this.restaurantName = restaurantName;
        this.dishName = dishName;
        this.isVegan = isVegan;
        this.price = price;
        this.dishType = dishType;
        this.dishID = UUID.randomUUID().toString();

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

    public boolean isIsVegan() {
        return isVegan;
    }

    public void setIsVegan(boolean isVegan) {
        this.isVegan = isVegan;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDishID() {
        return dishID;
    }

    public void setDishID(String dishID) {
        this.dishID = dishID;
    }

    public String getDishType() {return dishType;}

    public void setDishType(String dishType) {
        this.dishType = dishType;
    }
}

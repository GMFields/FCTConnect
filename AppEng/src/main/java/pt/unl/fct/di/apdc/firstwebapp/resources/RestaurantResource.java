package pt.unl.fct.di.apdc.firstwebapp.resources;

import pt.unl.fct.di.apdc.firstwebapp.api.RestaurantAPI;
import pt.unl.fct.di.apdc.firstwebapp.util.RestaurantData;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
@Path("/restaurant")
public class RestaurantResource implements RestaurantAPI {


    @Override
    public Response addRestaurant(String tokenObjStr, RestaurantData data) {
        return null;
    }

    @Override
    public Response deleteRestaurant(String tokenObjStr, String restaurantName) {
        return null;
    }

    @Override
    public Response getRestaurant(String tokenObjStr, String restaurantName) {
        return null;
    }

    @Override
    public Response getRestaurants(String tokenObjStr) {
        return null;
    }

    @Override
    public Response addDailyDish(String tokenObjStr, String restaurantName, String dishName) {
        return null;
    }

    @Override
    public Response addFixedMenuDish(String tokenObjStr, String restaurantName, String dishName) {
        return null;
    }

    @Override
    public Response addDessert(String tokenObjStr, String restaurantName, String dessert) {
        return null;
    }

    @Override
    public Response removeDailyDish(String tokenObjStr, String restaurantName, String dishName) {
        return null;
    }

    @Override
    public Response removeFixedMenuDish(String tokenObjStr, String restaurantName, String dishName) {
        return null;
    }

    @Override
    public Response removeDessert(String tokenObjStr, String restaurantName, String dessertName) {
        return null;
    }
}

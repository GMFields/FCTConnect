package pt.unl.fct.di.apdc.firstwebapp.resources;

import pt.unl.fct.di.apdc.firstwebapp.api.RestaurantAPI;
import pt.unl.fct.di.apdc.firstwebapp.util.RestaurantData;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
@Path("/restaurant")
public class RestaurantResource implements RestaurantAPI {


    @Override
    public Response addRestaurant(RestaurantData data) {
        return null;
    }

    @Override
    public Response deleteRestaurant(String restaurantName) {
        return null;
    }

    @Override
    public Response getRestaurant(String restaurantName) {
        return null;
    }

    @Override
    public Response getRestaurants() {
        return null;
    }

    @Override
    public Response addDailyDish(String restaurantName, String dishName) {
        return null;
    }

    @Override
    public Response addFixedMenuDish(String restaurantName, String dishName) {
        return null;
    }

    @Override
    public Response addDessert(String restaurantName, String dessert) {
        return null;
    }

    @Override
    public Response removeDailyDish(String id, String dishName) {
        return null;
    }

    @Override
    public Response removeFixedMenuDish(String id, String dishName) {
        return null;
    }

    @Override
    public Response removeDessert(String id, String dessertName) {
        return null;
    }
}

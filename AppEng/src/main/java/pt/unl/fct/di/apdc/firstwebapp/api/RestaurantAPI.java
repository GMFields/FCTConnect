package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.RestaurantData;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public interface RestaurantAPI {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response addRestaurant(RestaurantData data);

    @DELETE
    Response deleteRestaurant(@QueryParam("restaurantName") String restaurantName);

    @GET
    @Path("/{restaurantName}")
    @Produces(MediaType.APPLICATION_JSON)
    Response getRestaurant(@PathParam("restaurantName") String restaurantName);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Response getRestaurants();

    @PUT
    @Path("/{restaurantName}/daily-dishes")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addDailyDish(@PathParam("restaurantName") String restaurantName, String dishName);

    @PUT
    @Path("/{restaurantName}/fixed-menu")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addFixedMenuDish(@PathParam("restaurantName") String restaurantName, String dishName);

    @PUT
    @Path("/{restaurantName}/dessert")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addDessert(@PathParam("restaurantName") String restaurantName, String dessert);

    @DELETE
    @Path("/{restaurantName}/daily-dishes/{dishName}")
    Response removeDailyDish(@PathParam("restaurantName") String id, @PathParam("dishName") String dishName);

    @DELETE
    @Path("/{restaurantName}/fixed-menu/{dishName}")
    Response removeFixedMenuDish(@PathParam("restaurantName") String id, @PathParam("dishName") String dishName);

    @DELETE
    @Path("/{restaurantName}/dessert/{dessertName}")
    Response removeDessert(@PathParam("restaurantName") String id, @PathParam("dessertName") String dessertName);




}

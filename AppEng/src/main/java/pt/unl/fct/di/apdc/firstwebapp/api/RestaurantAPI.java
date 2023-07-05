package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.RestaurantData;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public interface RestaurantAPI {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response addRestaurant(@QueryParam("tokenObj") String tokenObjStr, RestaurantData data);

    @DELETE
    Response deleteRestaurant(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("restaurantName") String restaurantName);

    @GET
    @Path("/{restaurantName}")
    @Produces(MediaType.APPLICATION_JSON)
    Response getRestaurant(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName);

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Response getRestaurants(@QueryParam("tokenObj") String tokenObjStr);

    @PUT
    @Path("/{restaurantName}/daily-dishes")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addDailyDish(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, String dishName);

    @PUT
    @Path("/{restaurantName}/fixed-menu")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addFixedMenuDish(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, String dishName);

    @PUT
    @Path("/{restaurantName}/dessert")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addDessert(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, String dessert);

    @DELETE
    @Path("/{restaurantName}/daily-dishes/{dishName}")
    Response removeDailyDish(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, @PathParam("dishName") String dishName);

    @DELETE
    @Path("/{restaurantName}/fixed-menu/{dishName}")
    Response removeFixedMenuDish(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, @PathParam("dishName") String dishName);

    @DELETE
    @Path("/{restaurantName}/dessert/{dessertName}")
    Response removeDessert(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, @PathParam("dessertName") String dessertName);




}

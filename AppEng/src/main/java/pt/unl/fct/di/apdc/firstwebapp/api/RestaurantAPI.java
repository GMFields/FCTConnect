package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.DishData;
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

    @POST
    @Path("/{restaurantName}/dish")
    @Consumes(MediaType.APPLICATION_JSON)
    Response addDish(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, DishData data);


    @DELETE
    @Path("/{restaurantName}/dish/{dishName}")
    Response removeDish(@QueryParam("tokenObj") String tokenObjStr, @PathParam("restaurantName") String restaurantName, @PathParam("dishName") String dishName);






}

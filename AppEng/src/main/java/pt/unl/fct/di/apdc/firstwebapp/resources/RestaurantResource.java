package pt.unl.fct.di.apdc.firstwebapp.resources;

import pt.unl.fct.di.apdc.firstwebapp.factory.ConstantFactory;
import pt.unl.fct.di.apdc.firstwebapp.util.RestaurantData;
import pt.unl.fct.di.apdc.firstwebapp.util.Authorization;
import pt.unl.fct.di.apdc.firstwebapp.api.RestaurantAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;

import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
import javax.ws.rs.Path;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;



@Path("/restaurant")
public class RestaurantResource implements RestaurantAPI {
    ConstantFactory constantFactory;
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    private final Gson g = new Gson();
    private static final Logger LOG = Logger.getLogger(RestaurantResource.class.getName());



    @Override
    public Response addRestaurant(String tokenObjStr, RestaurantData data) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }

        if(!Authorization.isDataValid(data)) {
            return Response.status(Response.Status.BAD_REQUEST).entity(ConstantFactory.INVALID_DATA.getDesc()).build();
        }

        Transaction txn = datastore.newTransaction();
        Key restaurantKey = KeyStore.restaurantKeyFactory(data.getName());

        try {

            Entity restaurant = txn.get(restaurantKey);
            if(restaurant != null) {
                txn.rollback();
                return Response.status(Response.Status.CONFLICT).entity(ConstantFactory.RESTAURANT_EXISTS.getDesc()).build();
            }


            List<String> restaurantManagers = data.getRestaurantManagers();
            List<StringValue> convertedManagers = new ArrayList<>();

            for (String manager : restaurantManagers) {
                StringValue managerValue = StringValue.of(manager);
                convertedManagers.add(managerValue);
            }

            restaurant = Entity.newBuilder(restaurantKey)
                    .set("restaurant_name", data.getName())
                    .set("restaurant_location", data.getLocation())
                    .set("restaurant_managers", convertedManagers)
                    .set("restaurant_takeAwayService", "")
                    .build();

            txn.add(restaurant);
            LOG.info("Restaurant added "+data.getName());
            txn.commit();
            return Response.status(Response.Status.CREATED).entity(data).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Override
    public Response deleteRestaurant(String tokenObjStr, String restaurantName) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }

        Transaction txn = datastore.newTransaction();
        Key restaurantKey = KeyStore.restaurantKeyFactory(restaurantName);

        try {
            Entity restaurant = txn.get(restaurantKey);
            if (restaurant == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.RESTAURANT_NOT_FOUND.getDesc()).build();
            }

            txn.delete(restaurantKey);
            LOG.info("Restaurant deleted: " + restaurantName);
            txn.commit();
            return Response.status(Response.Status.OK).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
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

    private Response verifyAdmin(String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        Key adminKey = KeyStore.userKeyFactory(tokenObj.getUsername());

        Entity user = datastore.get(adminKey);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(constantFactory.USER_DOESNT_EXIST.getDesc()).build();
        }

        int userRole = (int) user.getLong("user_role");

        if (userRole != 4) {
            return Response.status(Response.Status.FORBIDDEN).entity("User doesn't have permissions").build();
        }

        return null;
    }



}

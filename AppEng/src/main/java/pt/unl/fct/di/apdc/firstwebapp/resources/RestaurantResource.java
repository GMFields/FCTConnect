package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.RestaurantAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.ConstantFactory;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.RestaurantData;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

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

    private Response verifyAdmin(String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        Key adminKey = KeyStore.userKeyFactory(tokenObj.getUsername());

        Entity user = datastore.get(adminKey);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(constantFactory.USER_DOESNT_EXIST).build();
        }

        int userRole = (int) user.getLong("user_role");

        if (userRole != 4) {
            return Response.status(Response.Status.FORBIDDEN).entity("User doesn't have permissions").build();
        }

        return null;
    }
}

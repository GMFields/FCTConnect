package pt.unl.fct.di.apdc.firstwebapp.resources;

import pt.unl.fct.di.apdc.firstwebapp.factory.ConstantFactory;
import pt.unl.fct.di.apdc.firstwebapp.util.DishData;
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


    public RestaurantResource() {}

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
            return Response.status(Response.Status.OK).entity(ConstantFactory.RESTAURANT_DELETED).build();
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
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        LOG.info(tokenObj.getUsername() + " is trying to search for " + restaurantName);

        Key restaurantKey = KeyStore.restaurantKeyFactory(restaurantName);

        try {
            Entity restaurant = datastore.get(restaurantKey);
            if (restaurant == null) {
                return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.RESTAURANT_NOT_FOUND.getDesc()).build();
            }

            RestaurantData restaurantData = restaurantObject(restaurant);

            return Response.status(Response.Status.OK).entity(restaurantData).build();
        } catch (Exception e) {
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }



    @Override
    public Response getRestaurants(String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        LOG.info(tokenObj.getUsername() + " is trying to list all the restaurants");

        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Restaurant")
                .build();

        try {
            QueryResults<Entity> results = datastore.run(query);
            if(!results.hasNext()) {
                return Response.status(Response.Status.NO_CONTENT).entity(ConstantFactory.RESTAURANTS_NOT_FOUND).build();
            }

            List<RestaurantData> restaurantDataList = new ArrayList<>();

            while (results.hasNext()) {
                Entity restaurantEntity = results.next();
                RestaurantData restaurantData = restaurantObject(restaurantEntity);
                restaurantDataList.add(restaurantData);
            }

            return Response.status(Response.Status.OK).entity(restaurantDataList).build();
        } catch (Exception e) {
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }


    @Override
    public Response addDish(String tokenObjStr, String restaurantName, DishData data) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        LOG.info(tokenObj.getUsername() + " is trying to add a dish with the name "+data.getDishName());

        Transaction txn = datastore.newTransaction();
        LOG.info("1");
        Key restaurantKey = KeyStore.restaurantKeyFactory(restaurantName);
        LOG.info("2");

        try {
            Entity restaurant = txn.get(restaurantKey);
            if (restaurant == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.RESTAURANT_NOT_FOUND.getDesc()).build();
            }

            List<String> managers = getRestaurantManagers(restaurantName);
            LOG.info("3");
            if(managers == null || managers.isEmpty()) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.NO_MANAGERS_FOUND+restaurantName).build();
            }
            if(!isManager(tokenObj.getUsername(), managers)) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity(ConstantFactory.INSUFFICIENT_PERMISSIONS).build();
            }
            LOG.info("4");
            if(!restaurantName.equalsIgnoreCase(data.getRestaurantName())) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity("Adding a dish to the wrong restaurant").build();
            }
            LOG.info("5");
            DishData newDish = new DishData(restaurantName, data.getDishName(), data.isIsVegan(),
                    data.getPrice(), data.getDishType());
            LOG.info("6");

            if(!Authorization.isDishDataValid(newDish)) {
                txn.rollback();
                return Response.status(Response.Status.BAD_REQUEST).entity("Invalid data! Missing or Null Fields or negative prices!").build();
            }

            Key dishKey = KeyStore.dishKeyFactory(newDish.getDishID());
            LOG.info("7");

            Entity dishEntity = Entity.newBuilder(dishKey)
                    .set("restaurant_name", restaurantName)
                    .set("dish_name", data.getDishName())
                    .set("isVegan", data.isIsVegan())
                    .set("dish_price", data.getPrice())
                    .set("dish_type", data.getDishType())
                    .build();

            txn.add(dishEntity);
            LOG.info("Dish added "+data.getDishName()+" to restaurant: "+data.getRestaurantName());
            txn.commit();
            return Response.status(Response.Status.CREATED).entity("Dish created successfully ").build();
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
    public Response removeDish(String tokenObjStr, String restaurantName, String dishID) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        LOG.info(tokenObj.getUsername() + " is trying to remove a dish");

        Transaction txn = datastore.newTransaction();
        LOG.info("1");
        Key restaurantKey = KeyStore.restaurantKeyFactory(restaurantName);
        LOG.info("2");
        Key dishKey = KeyStore.restaurantKeyFactory(dishID);

        try {
            Entity restaurant = txn.get(restaurantKey);
            if (restaurant == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.RESTAURANT_NOT_FOUND.getDesc()).build();
            }

            Entity dishEntity = txn.get(dishKey);
            if (dishEntity == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity("Dish not found").build();
            }
            String resName = dishEntity.getString("restaurant_name");
            String dishName = dishEntity.getString("dish_name");

            List<String> managers = getRestaurantManagers(restaurantName);
            LOG.info("3");
            if (managers == null || managers.isEmpty()) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.NO_MANAGERS_FOUND + restaurantName).build();
            }
            if (!isManager(tokenObj.getUsername(), managers)) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity(ConstantFactory.INSUFFICIENT_PERMISSIONS).build();
            }
            LOG.info("4");
            if (!restaurantName.equalsIgnoreCase(resName)) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity("Removing a dish from the wrong restaurant").build();
            }
            LOG.info("5");

            txn.delete(dishKey);
            LOG.info("Dish removed: " + dishName + " from restaurant: " + restaurantName);
            txn.commit();
            return Response.status(Response.Status.OK).entity("Dish removed successfully").build();
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

    private RestaurantData restaurantObject(Entity restaurantEntity) {
        String name = restaurantEntity.getString("restaurant_name");
        String location = restaurantEntity.getString("restaurant_location");
        List<StringValue> managerValues = restaurantEntity.getList("restaurant_managers");
        String takeAwayService = restaurantEntity.getString("restaurant_takeAwayService");

        List<String> restaurantManagers = new ArrayList<>();
        for (StringValue managerValue : managerValues) {
            restaurantManagers.add(managerValue.get());
        }

        RestaurantData restaurantData = new RestaurantData(name, location, restaurantManagers, takeAwayService);

        return restaurantData;
    }

    private List<String> getRestaurantManagers(String restaurantName) {
        List<String> restaurantManagers = new ArrayList<>();
        Key restaurantKey = KeyStore.restaurantKeyFactory(restaurantName);
        Entity restaurantEntity = datastore.get(restaurantKey);
        if (restaurantEntity == null) {
            return null;
        } else {
            List<StringValue> managerValues = restaurantEntity.getList("restaurant_managers");

            for (StringValue managerValue : managerValues) {
                restaurantManagers.add(managerValue.get());
            }
        }
        return restaurantManagers;
    }

    private boolean isManager(String username, List<String> restaurantMangers) {
        boolean isOwner = false;
        for(String m : restaurantMangers) {
            if(username.equals(m))
                isOwner = true;
        }
        return isOwner;
    }


}

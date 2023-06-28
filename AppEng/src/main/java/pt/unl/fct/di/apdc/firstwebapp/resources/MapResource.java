package pt.unl.fct.di.apdc.firstwebapp.resources;

import pt.unl.fct.di.apdc.firstwebapp.api.MapAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.MapData;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Path("/waypoint")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class MapResource implements MapAPI {

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    private static final Logger LOG = Logger.getLogger(MapResource.class.getName());

    private final Gson g = new Gson();

    @Override
    public Response addWayPoint(String tokenObjStr, MapData data) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        LOG.info("User: " + tokenObj.getUsername() + " is attempting to create a waypoint!");

        Transaction txn = datastore.newTransaction();

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        Double latitude = data.getLatitude();
        Double longitude = data.getLongitude();
        String name = data.getName();

        try {
            Entity token = txn.get(tokenKey);


            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity("Invalid token!").build();
            }

            if (latitude == null || longitude == null) {
                txn.rollback();
                return Response.status(Response.Status.BAD_REQUEST).entity("Missing data!").build();
            }

            if (name == null || name.isEmpty()) {
                LOG.info("Invalid name! name = " + name);
                txn.rollback();
                return Response.status(Response.Status.BAD_REQUEST).entity("Invalid name!").build();
            }

            MapData waypointObj = new MapData(latitude, longitude, name);

            Key waypointKey = KeyStore.mapKeyFactory(waypointObj.getWayPointID());

            Entity wayPoint = Entity.newBuilder(waypointKey)
                    .set("waypoint_creator", tokenObj.getUsername())
                    .set("waypoint_latitude", latitude)
                    .set("waypoint_longitude", longitude)
                    .set("waypoint_name", waypointObj.getName())
                    .set("creation_time", waypointObj.getCreationData())
                    .build();

            txn.add(wayPoint);
            txn.commit();
            return Response.ok(g.toJson(waypointObj)).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong!").build();
            }
        }
    }

    @Override
    public Response deleteWayPoint(String tokenObjStr, String wayPointID) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Aqui pode ser passado como TokenClass em vez
        // de uma String
        LOG.info("User: " + tokenObj.getUsername() + " is attempting to delete a waypoint!");

        Transaction txn = datastore.newTransaction();
        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        try {
            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity("Invalid token!").build();
            }

            Key waypointKey = KeyStore.mapKeyFactory(wayPointID);
            Entity waypoint = txn.get(waypointKey);

            if (waypoint == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity("Waypoint not found!").build();
            }

            String waypointCreator = waypoint.getString("waypoint_creator");

            if (!tokenObj.getUsername().equals(waypointCreator)) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN)
                        .entity("You don't have permission to delete this waypoint!").build();
            }

            txn.delete(waypointKey);
            txn.commit();
            return Response.ok().build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong!").build();
            }
        }
    }

    @Override
    public Response getWayPoints(String tokenObjStr, String user_username) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Aqui também pode ser passado como AuthToken em
        // vez de String
        LOG.info("User: " + tokenObj.getUsername() + " is attempting to retrieve waypoints for user: " + user_username);

        Transaction txn = datastore.newTransaction();
        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        try {
            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity("Invalid token!").build();
            }

            Key userKey = KeyStore.userKeyFactory(user_username);
            Entity user = txn.get(userKey);

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity("User not found!").build();
            }

            Query<Entity> query = Query.newEntityQueryBuilder()
                    .setKind("Waypoint")
                    .setFilter(StructuredQuery.PropertyFilter.eq("waypoint_creator", user_username))
                    .build();

            QueryResults<Entity> waypoints = txn.run(query);

            List<MapData> waypointList = new ArrayList<>();

            while (waypoints.hasNext()) {
                Entity waypoint = waypoints.next();
                Double latitude = waypoint.getDouble("waypoint_latitude");
                Double longitude = waypoint.getDouble("waypoint_longitude");
                String name = waypoint.getString("waypoint_name");
                String wayPointID = waypoint.getKey().getName();

                MapData mapData = new MapData(latitude, longitude, name);
                mapData.setWayPointID(wayPointID);
                waypointList.add(mapData);
            }

            txn.commit();
            return Response.ok(g.toJson(waypointList)).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Something went wrong!").build();
            }
        }
    }

}

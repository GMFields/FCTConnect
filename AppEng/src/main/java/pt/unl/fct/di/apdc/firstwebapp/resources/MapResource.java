package pt.unl.fct.di.apdc.firstwebapp.resources;
import pt.unl.fct.di.apdc.firstwebapp.api.MapAPI;
import pt.unl.fct.di.apdc.firstwebapp.util.MapData;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;

import java.util.logging.Logger;



@Path("/waypoint")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class MapResource implements MapAPI {

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");
    KeyFactory tokenKeyFactory = datastore.newKeyFactory().setKind("Token");
    KeyFactory emailKeyFactory = datastore.newKeyFactory().setKind("Email");
    KeyFactory mapKeyFactory = datastore.newKeyFactory().setKind("Waypoint");


    private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

    private final Gson g = new Gson();

    @Override
    public Response addWayPoint(String tokenObjStr, MapData data) {
        TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
        LOG.info("User: " + tokenObj.getUsername() + " is attempting to create a waypoint!");

        Transaction txn = datastore.newTransaction();

        Key tokenKey = tokenKeyFactory.newKey(tokenObj.getTokenID());

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

            LOG.info(waypointObj.getWayPointID());

            Key waypointKey = mapKeyFactory.newKey(waypointObj.getWayPointID());

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
        }  catch(Exception e) {
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

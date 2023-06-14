package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import pt.unl.fct.di.apdc.firstwebapp.util.MapData;

public interface MapAPI {

    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response addWayPoint(@QueryParam("tokenObj") String tokenObjStr, MapData data);

    /**
     * Deletes a waypoint. Can only be done by the person who created it.
     * @param tokenObjStr
     * @param wayPointID
     * @return
     */
    @DELETE
    @Path("/delete/{wayPointID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response deleteWayPoint(@QueryParam("tokenObj") String tokenObjStr, @PathParam("wayPointID") String wayPointID);

    /**
     * Returns all the waypoints created by a user.
     * @param tokenObjStr
     * @param user_username
     * @return
     */
    @GET
    @Path("/list/{user_username}")
    @Produces(MediaType.APPLICATION_JSON)
    Response getWayPoints(@QueryParam("tokenObj") String tokenObjStr, @PathParam("user_username") String user_username);

    /*
    @PUT
    @Path("/edit/{wayPointID}")
    @Produces(MediaType.APPLICATION_JSON)
    Response editWayPoint(@QueryParam("tokenObj") String tokenObjStr, @PathParam("wayPointID") String wayPointID);
    */





}

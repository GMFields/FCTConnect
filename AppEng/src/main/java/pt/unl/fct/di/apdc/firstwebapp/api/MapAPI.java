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



}

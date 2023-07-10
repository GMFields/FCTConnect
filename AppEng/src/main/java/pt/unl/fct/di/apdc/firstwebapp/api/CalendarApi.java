package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.Event;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public interface CalendarApi {
    @POST
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response addEvent(@QueryParam("tokenObj") String tokenObjStr, Event event);
    @DELETE
    @Path("/remove")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response removeEvent(@QueryParam("tokenObj") String tokenObjStr,@QueryParam("eventID") String eventID);

    @PUT
    @Path("/edit")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response editEvent(@QueryParam("tokenObj") String tokenObjStr, Event event);

    @GET
    @Path("/get")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response getEvent(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("eventID") String eventID);

    @GET
    @Path("/getall")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response getEvents(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);

    @POST
    @Path("/addaccess")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response addAccess(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);

    @DELETE
    @Path("/addaccess")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response removeAccess(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);

}
package pt.unl.fct.di.apdc.firstwebapp.api;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
public interface AskLocationAPI {

    @POST
    @Path("/ask")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response askLocation(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);

    @POST
    @Path("/answer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response anwserLocation(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username, String answer);

    @GET
    @Path("/getAsk")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response getAsk(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);

    @GET
    @Path("/getAnswer")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response getAnswer(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);


    @DELETE
    @Path("/remove")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response removeAsk(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username);

}
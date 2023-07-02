package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

public interface SearchAPI {


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Response getUser(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("username") String username );



}

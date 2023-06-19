package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public interface ChatApi {

    @POST
    @Path("/sync")
    Response sendSyncMsg();

    @POST
    @Path("/auth")
    @Produces(MediaType.APPLICATION_JSON)
    Response authenticateConnection(@QueryParam("socket_id") String socket_id, @QueryParam("channel") String channel);
}

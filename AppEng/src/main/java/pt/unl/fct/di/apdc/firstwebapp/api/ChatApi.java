package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

public interface ChatApi {

    @POST
    @Path("/sync")
    Response sendSyncMsg();
}

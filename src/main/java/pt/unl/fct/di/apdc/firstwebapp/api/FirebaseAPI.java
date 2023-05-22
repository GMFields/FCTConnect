package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

public interface FirebaseAPI {

    @POST
    @Path("/singleMsg")
    void singleTargetMessage();

    @POST
    @Path("/multipleMsg")
    void multipleTargetMessage();

    @POST
    @Path("/topicMsg")
    Response topicTargetMessage();

    @POST
    @Path("/sub")
    Response subscribeToTopic(@QueryParam("token") String token, @QueryParam("topic") String topic);

    @POST
    @Path("/unsub")
    Response unsubscribeToTopic(@QueryParam("token") String token, @QueryParam("topic") String topic);

}
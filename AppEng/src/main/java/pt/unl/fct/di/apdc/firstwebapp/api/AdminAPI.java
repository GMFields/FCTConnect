package pt.unl.fct.di.apdc.firstwebapp.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

public interface AdminAPI {

    /**
     *
     * @param email
     * @param password
     * @return 200: the token of the admin logged in;
     *         404: if the admin credential doesn't match any existing users;
     *         403: if the token given doesn't match any existing token;
     *         500: if there is a server error.
     */
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    Response adminLogin(@QueryParam("email") String email, @QueryParam("password") String password);

    /**
     *
     * @param tokenObjStr
     * @return
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Response listInactiveUsers(@QueryParam("tokenObj") String tokenObjStr);

    /**
     *
     * @param tokenObjStr
     * @return
     */
    @GET
    @Path("/list")
    @Produces(MediaType.APPLICATION_JSON)
    Response listAllUsers(@QueryParam("tokenObj") String tokenObjStr);

    /**
     *
     * @param userEmails
     * @param tokenObjStr
     * @return
     */
    @PUT
    @Path("/activate")
    @Consumes(MediaType.APPLICATION_JSON)
    Response activateUsers(List<String> userEmails, @QueryParam("tokenObj") String tokenObjStr);

    @POST
    @Path("/notification")
    Response sendNotification(@QueryParam("title") String title, @QueryParam("body") String body,
            @QueryParam("interest") String interest);
}

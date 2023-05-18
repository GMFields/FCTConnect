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


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    Response listInactiveUsers();

    @PUT
    @Path("/activate")
    @Consumes(MediaType.APPLICATION_JSON)
    Response activateUsers(List<String> userEmails);

}

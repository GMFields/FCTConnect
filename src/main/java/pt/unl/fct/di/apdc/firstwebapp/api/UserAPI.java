package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.LoginData;
import pt.unl.fct.di.apdc.firstwebapp.util.PasswordData;
import pt.unl.fct.di.apdc.firstwebapp.util.ProfileClass;

import javax.print.attribute.standard.Media;
import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path(UserAPI.PATH)
public interface UserAPI {

    String PATH = "/users";

    /**
     * Registers a new user on the system
     * @param data the user
     * @return 400: if the user enters an invalid email
     * if the user enters an invalid password
     * if the user doesn't fill in the fields.
     * 409 if the user already exists
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    Response registerUser(LoginData data);


    /**
     * Logins a user
     * @param data the user data
     * @return the token of the user logged in
     * 404 if there is the user doesn't exist
     * 500 if there is a server error.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    Response userLogin(LoginData data);

    /**
     * Logouts a user
     * @param tokenObjStr Token object to authenticate the user
     * @return 400 if the token has expired
     * 500 if there was a server error
     */
     @POST
     Response doLogout(@QueryParam("tokenObj") String tokenObjStr);

    /**
     * Updates the users information
     * @param data the new user data
     * @param tokenObjStr Token object to authenticate the user
     * @return 406 if the user doesn't have permissions to change the field
     * 200 if it was successful
     */
     @PUT
     @Consumes(MediaType.APPLICATION_JSON)
     @Produces(MediaType.APPLICATION_JSON)
     Response updateOwnUser(ProfileClass data, @QueryParam("tokenObj") String tokenObjStr);


}

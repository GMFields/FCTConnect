package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.LoginData;
import pt.unl.fct.di.apdc.firstwebapp.util.ProfileClass;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;

import javax.ws.rs.Path;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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
     * @return 400: if the user enters an invalid email;
     *              if the user enters an invalid password;
     *              if the user doesn't fill in the fields;
     *         409: if the user already exists;
     *         500: if there is a server error.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    Response registerUser(LoginData data);


    /**
     * Logins a user
     * @param data the user data
     * @return 200: the token of the user logged in;
     *         404: if the user credential doesn't match any existing users;
     *         403: if the token given doesn't match any existing token;
     *         500: if there is a server error.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    Response userLogin(@PathParam("username") String username, @QueryParam("password") String password);

    /**
     * Logouts a user
     * @param tokenObj Token object to authenticate the user
     * @return 200: if the user seccessfully logged out;
     *         400: if the token has expired;
     *         500: if there was a server error.
     */
     @POST
     @Consumes(MediaType.APPLICATION_JSON)
     Response userLogout(TokenClass tokenObjStr);

    /**
     * Updates the users information
     * @param data the new user data
     * @param tokenObj Token object to authenticate the user
     * @return  200: if the user data was successfully updated;
     *          403: if the token given doesn't match any existing token;
     *          404: if the user given doesn't match any existing user;
     *          500: if there was a server error.
     */
     @PUT
     @Consumes(MediaType.APPLICATION_JSON)
     @Produces(MediaType.APPLICATION_JSON)
     Response updateOwnUser(ProfileClass data, TokenClass tokenObj);

    /**
     * Deletes the user's account
     * @param tokenObj Token object to authenticate the user
     * @return  200: if the user was successfully deleted;
     *          403: if the token given doesn't match any existing token;
     *          404: if the user given doesn't match any existing user;
     *          500: if there was a server error.
     */
     @DELETE
     Response deleteAccount(TokenClass tokenObj);


}

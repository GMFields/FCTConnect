package pt.unl.fct.di.apdc.firstwebapp.api;

import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.ProfileData;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

//@Path(UserAPI.PATH)
public interface UserAPI {

    String PATH = "/users";

    /**
     *
     * @param email
     * @param password
     * @return 200: the token of the user logged in;
     *         404: if the user credential doesn't match any existing users;
     *         403: if the token given doesn't match any existing token;
     *         500: if there is a server error.
     */
    @POST
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
    Response userLogin(@QueryParam("email") String email, @QueryParam("password") String password);

    /**
     * Registers a new user on the system
     * 
     * @param data the user
     * @return 201: if the user was successfully registered;
     *         400: if the user enters an invalid email;
     * 
     * @return 400: if the user enters an invalid email;
     *         if the user enters an invalid password;
     *         if the user doesn't fill in the fields;
     *         409: if the user already exists;
     *         500: if there is a server error.
     */
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    Response registerUser(ProfileData data);

    /**
     * Logouts a user
     * 
     * @param tokenObjStr Token object to authenticate the user
     * @return 200: if the user seccessfully logged out;
     *         400: if the token has expired;
     *         500: if there was a server error.
     */
    @DELETE
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response userLogout(@QueryParam("tokenObj") String tokenObjStr);

    /**
     *
     * @param
     * @return
     */
    @GET
    @Path("/profile")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response getProfile(@QueryParam("tokenObj") String tokenObjStr);

    /**
     * Updates the users information
     * 
     * @param data the new user data
     * @return 200: if the user data was successfully updated;
     *         403: if the token given doesn't match any existing token;
     *         404: if the user given doesn't match any existing user;
     *         500: if there was a server error.
     */
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    Response updateProfile(ProfileData data, @QueryParam("tokenObj") String tokenObjStr);

    /**
     * Deletes the user's account
     * 
     * @param tokenObjStr Token object to authenticate the user
     * @return 200: if the user was successfully deleted;
     *         403: if the token given doesn't match any existing token;
     *         404: if the user given doesn't match any existing user;
     *         500: if there was a server error.
     */
    @DELETE
    @Path("/delete")
    @Consumes(MediaType.APPLICATION_JSON)
    Response deleteAccount(@QueryParam("tokenObj") String tokenObjStr);

    /**
     * Activates the user's account
     * @param activationToken the activation token to authenticate and activate the account
     * @return 200: if the account was successfully activated;
     *         500: if there was an error.
     */
    @GET
    @Path("/activate")
    Response activateAccount(@QueryParam("activationToken") String activationToken);

    @GET
    @Path("/forgotpw")
    Response forgotPassword(@QueryParam("user_email") String email);

    @GET
    @Path("/reset")
    Response resetPassword(@QueryParam("resetToken") String resetToken) throws IOException;

    @PUT
    @Path("/changepwd")
    @Consumes(MediaType.APPLICATION_JSON)
    Response changePassword(@QueryParam("tokenObj") String tokenObjStr, @QueryParam("password") String password);


}
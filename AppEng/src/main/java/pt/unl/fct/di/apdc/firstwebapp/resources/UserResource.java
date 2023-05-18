package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;

import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.UserAPI;
import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.firstwebapp.util.*;

//import com.google.gson.Gson;

import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.Status;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UserResource implements UserAPI {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    //Datastore datastore = DatastoreOptions.newBuilder().setHost("http://localhost:8081").setProjectId("helical-ascent-385614").build().getService();

    KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");
    KeyFactory tokenKeyFactory = datastore.newKeyFactory().setKind("Token");

    KeyFactory emailKeyFactory = datastore.newKeyFactory().setKind("Email");

    private final Gson g = new Gson();
    private static final String INVALID_LOGIN = "Missing or wrong parameter.";
    private static final String INACTIVE_ACCOUNT  = "Account is not active, contact an admin!";
    private static final String WRONG_PASSWORD = "Wrong password";
    private static final String ATTEMPTING_REGISTER = "Attempting to register the user: ";
    private static final String USER_EXISTS = "User already exists";
    private static final String EMAIL_EXISTS = "Email already exists";
    private static final String USER_DOESNT_EXIST = "User doesn't exist";
    private static final long USER_ROLE =   1;
    private static final String INATIVO_STATE = "INATIVO";

    private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

    public UserResource() {}

    @Override
    public Response registerUser(ProfileData data) {
        LOG.info(ATTEMPTING_REGISTER + data.getUsername());

        if(!Authorization.isDataFormatted(data.getUsername(), data.getPassword(), data.getName(), data.getEmail()))
            return Response.status(Status.BAD_REQUEST).entity("Invalid Data").build();

        Transaction txn = datastore.newTransaction();

        Key emailKey = emailKeyFactory.newKey(data.getEmail());

        try {
            Entity email = txn.get(emailKey);

            if(email != null){
                txn.rollback();
                return Response.status(Status.CONFLICT).entity(EMAIL_EXISTS).build();
            }
            else {
                email = Entity.newBuilder(emailKey)
                        .set("user_username", data.getUsername())
                        .build();
                txn.add(email);
                LOG.info("Email entity created");
            }

            Key userKey = userKeyFactory.newKey(email.getString("user_username"));

            Entity user = txn.get(userKey);

            if(user != null){
                txn.rollback();
                return Response.status(Status.CONFLICT).entity(USER_EXISTS).build();
            }

            user = Entity.newBuilder(userKey) //TODO @GMFields faltam itens a serem adicionados na base de dados - a ser discutido!
                    .set("user_name", data.getName())
                    .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
                    .set("user_email", data.getEmail())
                    .set("user_role", data.getRole())
                    .set("user_state", INATIVO_STATE)
                    .set("user_creation_time", Timestamp.now())
                    .set("user_department", data.getDepartment())
                    .build();

            txn.add(user);
            LOG.info("User registered: "+ data.getUsername());
            txn.commit();
            return Response.status(Status.CREATED).entity(data).build(); //TODO @GMFields verificar se é preciso enviar "data" - método não tem tag @produces
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
        finally {
            if(txn.isActive()) {
                txn.rollback();
                return Response.status(Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Override
    public Response userLogin(String email, String password) {
        LOG.info("Attempt to login user with e-mail: " + email);
        Key emailKey = emailKeyFactory.newKey(email);
        Entity emailEntity = datastore.get(emailKey);

        if (emailEntity == null) {
            LOG.info("Failed login attempt! User with email: " + email + " does not exist");
            return Response.status(Status.NOT_FOUND).build();
        }

        Key userKey = userKeyFactory.newKey(emailEntity.getString("user_username"));

        if (userKey == null) {
            LOG.warning("Failed login attempt! User with email: " + email + " does not exist");
            return Response.status(Status.NOT_FOUND).build();
        }
        Entity user = datastore.get(userKey);

        boolean isActive = user.getString("user_state").equals("ATIVO");

        if(!isActive) {
            return Response.status(Status.FORBIDDEN).entity(INACTIVE_ACCOUNT).build();
        }

        Transaction txn = datastore.newTransaction();
        try {
            if (user != null) {
                String hashedPWD = user.getString("user_pwd");
                if (hashedPWD.equals(DigestUtils.sha512Hex(password))) {
                    int userRole = (int) user.getLong("user_role");
                    AuthToken token = new AuthToken(emailEntity.getString("user_username"), userRole);

                    // Create a new token entity
                    Key tokenkey = tokenKeyFactory.newKey(token.getTokenID());

                    Entity tokenid = Entity.newBuilder(tokenkey)
                            .set("username", token.getUsername())
                            .set("user_role", token.getRole())
                            .set("token_creationdata", token.creationData)
                            .set("token_expirationdata", token.expirationData)
                            .build();
                    txn.add(tokenid);

                    txn.commit();
                    return Response.ok(g.toJson(token)).build();
                } else {
                    txn.rollback();
                    return Response.status(Status.FORBIDDEN).entity(WRONG_PASSWORD).build();
                }
            } else {
                txn.rollback();
                LOG.warning("Failed login attempt! User with email: " + email + " does not exist");
                return Response.status(Status.NOT_FOUND).build();
            }
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }


    @Override
    public Response userLogout(AuthToken tokenObj) {
        LOG.fine("Attempt to logout user: " + tokenObj.getUsername());

        Key tokenKey = tokenKeyFactory.newKey(tokenObj.getTokenID());

        Transaction txn = datastore.newTransaction();
        try {
            Entity tokenE = txn.get(tokenKey);

            if(tokenE == null){
                txn.rollback();
                return Response.status(Status.NOT_FOUND).build();
            }

            datastore.delete(tokenKey);
            txn.commit();
            return Response.ok().build();
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Override
    public Response updateOwnUser(ProfileData data) {
        LOG.fine("Attempting to update user :" + data.getName());

        AuthToken tokenObj = data.getToken();

        Key userKey = userKeyFactory.newKey(tokenObj.getUsername());
        Key tokenKey = tokenKeyFactory.newKey(tokenObj.getTokenID());

        Transaction txn = datastore.newTransaction();
        try {
            Entity user = txn.get(userKey);
            if(user == null){
                txn.rollback();
                return Response.status(Status.NOT_FOUND).build();
            }

            Entity tokenE = txn.get(tokenKey);
            if(tokenE == null){
                txn.rollback();
                return Response.status(Status.FORBIDDEN).build();
            }

            user = Entity.newBuilder(userKey) //TODO @GMFields faltam itens a serem adicionados na base de dados - a ser discutido!
                    .set("user_name", data.getName())
                    .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
                    .set("user_email", data.getEmail())
                    .set("user_role", data.getRole()) //TODO @GMFields ver se vale a pena manter isto
                    .set("user_state", data.getState()) //TODO @GMFields ver se vale a pena manter isto
                    .set("user_creation_time", user.getString("user_creation_time"))
                    .build();

            datastore.put(user);
            txn.commit();
            return Response.ok().entity(user).build(); //TODO @GMFields verificar do lado do cliente se está a receber o user em formato json
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Status.INTERNAL_SERVER_ERROR).build();
            }
        }

    }

    @Override
    public Response deleteAccount(AuthToken tokenObj) {
        LOG.fine("Attempting to delete user: " + tokenObj.getUsername());

        Key userKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());
        Key tokenKey = datastore.newKeyFactory().setKind("Token").newKey(tokenObj.getTokenID());

        Transaction txn = datastore.newTransaction();
        try {
            Entity user = txn.get(userKey);
            if(user == null){
                txn.rollback();
                return Response.status(Status.NOT_FOUND).build();
            }

            Entity token = txn.get(tokenKey);
            if(token == null){
                txn.rollback();
                return Response.status(Status.FORBIDDEN).build();
            }

            txn.delete(userKey);
            LOG.info("User deleted: " + tokenObj.getUsername());
            txn.delete(tokenKey);
            txn.commit();
            return Response.ok().build();
        } catch(Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        } finally{
            if (txn.isActive()) {
                txn.rollback();
            }
        }

    }
}
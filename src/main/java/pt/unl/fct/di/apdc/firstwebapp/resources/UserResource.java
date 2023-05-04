package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.appengine.repackaged.org.apache.http.protocol.ResponseServer;
import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;

import pt.unl.fct.di.apdc.firstwebapp.api.UserAPI;
import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.firstwebapp.util.*;


import com.google.gson.Gson;

import java.util.logging.Logger;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;



public class UserResource implements UserAPI {
    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");
    KeyFactory tokenKeyFactory = datastore.newKeyFactory().setKind("Token");

    private final Gson g = new Gson();
    private static String INVALID_LOGIN = "Missing or wrong parameter.";
    private static String INVALID_EMAIL = "Invalid email address";
    private static String INVALID_PASSWORD = "Invalid password";
    private static String ATTEMPTING_REGISTER = "Attempting to register the user: ";
    private static String USER_EXISTS = "User already exists";
    private static long USER_ROLE = 1;
    private static String INATIVO_STATE = "INATIVO";

    private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

    public UserResource() {}

    @Override
    public Response registerUser(LoginData data) {
        /* Deveria ser verificado do lado do cliente?

        if(!Authorization.isValid(data.getUsername(), data.getPassword(), data.getName(), data.getEmail())) {
            return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_LOGIN).build();
        }

        if(!Authorization.isValidEmail(data.getEmail())) {
            return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_EMAIL).build();
        }

        if(!Authorization.isValidPassword(data.getPassword())) {
            return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_PASSWORD).build();
        }
        */
        Key userKey = userKeyFactory.newKey(data.getUsername());

        Transaction txn = datastore.newTransaction();
        try {
            Entity user = txn.get(userKey);

            if(user != null){
                txn.rollback();
                return Response.status(Status.CONFLICT).entity(USER_EXISTS).build();
            }

            user = Entity.newBuilder(userKey) //TODO faltam itens a serem adicionados na base de dados - a ser discutido!
                    .set("user_name", data.getName())
                    .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
                    .set("user_email", data.getEmail())
                    .set("user_role", USER_ROLE)
                    .set("user_state", INATIVO_STATE)
                    .set("user_creation_time", Timestamp.now())
                    .build();

            txn.add(user);
            LOG.info("User registered: "+ data.getUsername());
            txn.commit();
            return Response.status(Status.CREATED).entity(data).build(); //TODO verificar se é preciso enviar "data" - método não tem tag @produces
        } catch(Exception e) {
            txn.rollback();
			LOG.severe(e.getMessage());
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
        finally {
            if(txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response userLogin(String username, String password) {
        LOG.fine("Attempting to login user: " + username);

        Key userKey = userKeyFactory.newKey(username);

        Transaction txn = datastore.newTransaction();
        try{

            Entity user = txn.get(userKey);
            if(user == null){
                txn.rollback();
                return Response.status(Status.NOT_FOUND).build();
            }

            if(user.getString("user_pwd").equals(password)){
                txn.rollback();
                return Response.status(Status.FORBIDDEN).build();
            }

            AuthToken token = new AuthToken(username, 1);
            Key tokenKey = tokenKeyFactory.newKey(token.getTokenID()); //TODO pode mudar a chave do token no futuro
            Entity tokenE = Entity.newBuilder(tokenKey).set("token_owner", username)
                                                        .set("creation_date", String.valueOf(token.getCreationData()))
                                                        .set("expiration_date", String.valueOf(token.getExpirationData()))
                                                        .build();

            txn.put(tokenE);
            LOG.fine("Created token " + token.getTokenID() + " bound to user " + username);
            txn.commit();
            return Response.ok().entity(tokenE).build();
        } catch(Exception e) {
			txn.rollback();
			LOG.severe(e.getMessage());
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		} finally {
			if(txn.isActive()){
				txn.rollback();
				return Response.status(Status.INTERNAL_SERVER_ERROR).build();
			}
		}
    }

    @Override
    public Response userLogout(TokenClass tokenObj) {
        //TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
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
    public Response updateOwnUser(ProfileClass data, TokenClass tokenObj) {
        LOG.fine("Attempting to update user :" + data.getName());

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

            user = Entity.newBuilder(userKey) //TODO faltam itens a serem adicionados na base de dados - a ser discutido!
                    .set("user_name", data.getName())
                    .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
                    .set("user_email", data.getEmail())
                    .set("user_role", data.getRole()) //TODO ver se vale a pena manter isto
                    .set("user_state", data.getState()) //TODO ver se vale a pena manter isto
                    .set("user_creation_time", user.getString("user_creation_time"))
                    .build();

            datastore.put(user);
            txn.commit();
            return Response.ok().entity(user).build(); //TODO verificar do lado do cliente se está a receber o user em formato json
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
    public Response deleteAccount(TokenClass tokenObj) {
        //TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
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

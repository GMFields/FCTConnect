package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;

import pt.unl.fct.di.apdc.firstwebapp.api.UserAPI;
import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.firstwebapp.util.*;


import com.google.gson.Gson;

import java.util.logging.Logger;
import javax.ws.rs.core.Response;



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
    private static long USER_ROLE = 1L;
    private static String INATIVO_STATE = "INATIVO";
    private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

    public UserResource() {}

    @Override
    public Response registerUser(LoginData data) {
        if(!Authorization.isValid(data.getUsername(), data.getPassword(), data.getName(), data.getEmail())) {
            return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_LOGIN).build();
        }

        if(!Authorization.isValidEmail(data.getEmail())) {
            return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_EMAIL).build();
        }

        if(!Authorization.isValidPassword(data.getPassword())) {
            return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_PASSWORD).build();
        }

        Transaction txn = datastore.newTransaction();
        try {
            Key userKey = datastore.newKeyFactory().setKind("Users").newKey(data.getUsername());
            Entity user = txn.get(userKey);

            if(user != null) {
                txn.rollback();
                return Response.status(Response.Status.CONFLICT).entity(USER_EXISTS).build();
            } else {
                user = Entity.newBuilder(userKey)
                        .set("user_name", data.getName())
                        .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
                        .set("user_email", data.getEmail())
                        .set("user_role", USER_ROLE)
                        .set("user_state", INATIVO_STATE)
                        .set("user_creation_time", Timestamp.now())
                        .build();
                txn.add(user);
                LOG.info("User registered: "+data.getUsername());
                txn.commit();
                return Response.status(Response.Status.CREATED).entity(data).build();
            }
        }
        finally {
            if(txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response userLogin(LoginData data) {
        return null;
    }

    @Override
    public Response doLogout(String tokenObjStr) {
        TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);

        LOG.fine("Attempt to logout user: " + tokenObj.getUsername());

        Key tokenKey = tokenKeyFactory.newKey(tokenObj.getTokenID());

        Entity tokenEntity = datastore.get(tokenKey);

        Transaction txn = datastore.newTransaction();
        try {
            if (tokenEntity != null) {
                datastore.delete(tokenKey);
                txn.commit();
                return Response.ok().build();
            } else {
                txn.rollback();
                LOG.warning("Failed logout attempt! Token " + tokenObj.getTokenID() + " does not exist");
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }

    @Override
    public Response updateOwnUser(ProfileClass data, String tokenObjStr) {
        return null;
    }

    @Override
    public Response deleteAccount(String tokenObjStr) {
        TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);

        LOG.fine("Attempting to delete user: " + tokenObj.getUsername());

        Transaction txn = datastore.newTransaction();
        try {
            Key userKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());
            Key tokenKey = datastore.newKeyFactory().setKind("Token").newKey(tokenObj.getTokenID());

            Entity user = txn.get(userKey);
            Entity token = txn.get(tokenKey);

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity("User is null").build();
            } else if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity("Null token").build();
            } else {
                {
                    txn.delete(userKey);
                    LOG.info("User deleted: " + tokenObj.getUsername());
                    txn.commit();
                    return Response.ok().build();
                }
            } finally{
                if (txn.isActive()) {
                    txn.rollback();
                }
            }
        }
    }
}

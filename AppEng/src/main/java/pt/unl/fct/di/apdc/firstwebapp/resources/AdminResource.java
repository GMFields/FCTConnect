package pt.unl.fct.di.apdc.firstwebapp.resources;
import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;

import org.apache.commons.logging.Log;
import pt.unl.fct.di.apdc.firstwebapp.api.AdminAPI;
import pt.unl.fct.di.apdc.firstwebapp.api.UserAPI;
import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.firstwebapp.util.*;


import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.Status;

@Path("/admin")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class AdminResource implements AdminAPI {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");
    KeyFactory tokenKeyFactory = datastore.newKeyFactory().setKind("Token");

    KeyFactory emailKeyFactory = datastore.newKeyFactory().setKind("Email");

    private final Gson g = new Gson();
    private static final String INVALID_LOGIN = "Missing or wrong parameter.";
    private static final String INVALID_EMAIL = "Invalid email address";
    private static final String INVALID_PASSWORD = "Invalid password";
    private static final String ATTEMPTING_REGISTER = "Attempting to register the user: ";
    private static final String USER_EXISTS = "User already exists";
    private static final String EMAIL_EXISTS = "Email already exists";
    private static final String USER_DOESNT_EXIST = "User doesn't exist";
    private static final long USER_ROLE =   1;
    private static final String INATIVO_STATE = "INATIVO";

    private static final String ATIVO_STATE = "ATIVO";


    private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

    @Override
    public Response adminLogin(String email, String password) {
        LOG.info("Attempting to log in admin: "+email );
        Key emailKey = emailKeyFactory.newKey(email);
        Entity emailEntity = datastore.get(emailKey);

        if (emailEntity == null) {
            LOG.info("Failed login attempt! Admin with email: " + email + " does not exist");
            return Response.status(Status.NOT_FOUND).build();
        }

        Key userKey = userKeyFactory.newKey(emailEntity.getString("user_username"));

        if (userKey == null) {
            LOG.warning("Failed login attempt! Admin with email: " + email + " does not exist");
            return Response.status(Status.NOT_FOUND).build();
        }
        Entity user = datastore.get(userKey);


        Transaction txn = datastore.newTransaction();
        try {
            if (user != null) {
                String hashedPWD = user.getString("user_pwd");
                if (hashedPWD.equals(DigestUtils.sha512Hex(password))) {
                    int userRole = (int) user.getLong("user_role");

                    if (userRole != 4) {
                        txn.rollback();
                        return Response.status(Status.FORBIDDEN).build();
                    }


                    AuthToken token = new AuthToken(emailEntity.getString("user_username"), userRole);

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
                    return Response.status(Status.FORBIDDEN).build();
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
    public Response listInactiveUsers(String tokenObjStr) {
       Response r = verifyAdmin(tokenObjStr);

       if(r != null) {
           return r;
       }

        Query<Entity> query =
                Query.newEntityQueryBuilder()
                        .setKind("Users")
                        .setFilter(StructuredQuery.PropertyFilter.eq("user_state", "INATIVO"))
                        .build();

        QueryResults<Entity> results = datastore.run(query);
        if(!results.hasNext()) {
            return Response.status(Status.NOT_FOUND).entity("There are no inactive users!").build();
        }
        List<Entity> resultList = new ArrayList<>();
        while (results.hasNext()) {
            resultList.add(results.next());
        }

        return Response.ok(g.toJson(resultList)).build();
    }

    public Response activateUsers(List<String> userEmails, String tokenObjStr) {
        Response r = verifyAdmin(tokenObjStr);

        if(r != null) {
            return r;
        }

        Transaction txn = datastore.newTransaction();
        try {
            for (String email : userEmails) {
                Key emailKey = emailKeyFactory.newKey(email);
                Entity emailEntity = txn.get(emailKey);

                if (emailEntity == null) {
                    return Response.status(Status.NOT_FOUND).entity("User email not found: " + email).build();
                }
                String username = emailEntity.getString("user_username");
                Key userKey = userKeyFactory.newKey(username);
                Entity userEntity = txn.get(userKey);
                if (userEntity == null) {
                    // User entity not found
                    return Response.status(Status.NOT_FOUND).entity("User not found for email: " + email).build();
                }

                userEntity = Entity.newBuilder(userEntity)
                        .set("user_state", ATIVO_STATE)
                        .build();
                txn.update(userEntity);
            }
            txn.commit();
            return Response.status(Status.OK).entity("Users activated successfully").build();
        } catch (Exception e) {
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

    private Response verifyAdmin(String tokenObjStr) {
        TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);

        Key adminKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());

        Entity user = datastore.get(adminKey);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(USER_DOESNT_EXIST).build();
        }

        int userRole = (int) user.getLong("user_role");
        LOG.info("USER ROLE-> "+userRole);

        if(userRole != 4) {
            return Response.status(Status.FORBIDDEN).entity("User doesn't have permissions").build();
        }

        return null;
    }



}

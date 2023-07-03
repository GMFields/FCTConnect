package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.SearchAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.ProfileData;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

@Path("/search")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class SearchResource implements SearchAPI {
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    private final Gson g = new Gson();

    private static final Logger LOG = Logger.getLogger(UserResource.class.getName());
    public SearchResource() {
    }
    @Override
    public Response getUser(String tokenObjStr, String username) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Key userKey = KeyStore.userKeyFactory(username);
        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);
            Entity user = txn.get(userKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }



            String state = user.getString("user_state");// Ativo ou não

            if(!state.equals("ATIVO")){
                return Response.status(Response.Status.FORBIDDEN).build();
            }



            String email = user.getString("user_email");
            String name = user.getString("user_name");
            int role = (int) user.getLong("user_role");

            String department = user.getString("user_department");
            String profile = user.contains("user_profile") ? user.getString("user_profile") : "";// Publico ou privado

            ProfileData userProfile;


            if(profile.equals("privado")) {
                userProfile = new ProfileData(null, tokenObj.getUsername(),null, name, -1, null,
                        null,
                        null, null, null, null, null, null);
                    return null;
            }

            else {
                userProfile = new ProfileData(email, tokenObj.getUsername(), null, name, role, null,
                        null,
                        null, null, null, null, null, department);
            }

            
            txn.commit();
            return Response.ok(g.toJson(userProfile)).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe(e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }
}

	package pt.unl.fct.di.apdc.firstwebapp.resources.old;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import org.apache.commons.codec.digest.DigestUtils;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.LoginData;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;

import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;

	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public class LoginResource {
	
	/**
	 * Logger object
	 */
		private static final Logger LOG = Logger.getLogger(LoginResource.class.getName());
		
		private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
		
		private final Gson g = new Gson();
		
		KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");
		KeyFactory tokenKeyFactory = datastore.newKeyFactory().setKind("Token");
		
	
		public LoginResource() {}
		
		@POST
		@Consumes(MediaType.APPLICATION_JSON)
		public Response doLogin(LoginData data) {
		    LOG.fine("Attempt to login user: " + data.username);

		    Key userKey = userKeyFactory.newKey(data.username);

		    // Retrieve the entity using the key
		    Entity user = datastore.get(userKey);

		    Transaction txn = datastore.newTransaction();
		    try {
		        if (user != null) {
		            String hashedPWD = user.getString("user_pwd");
		            if (hashedPWD.equals(DigestUtils.sha512Hex(data.getPassword()))) {
		                int userRole = (int) user.getLong("user_role");
		                AuthToken token = new AuthToken(data.username, userRole);

		                // Check for an existing token entity and delete it if it exists
		                Query<Entity> query = Query.newEntityQueryBuilder()
		                        .setKind("Token")
		                        .setFilter( PropertyFilter.eq("username", data.username))
		                        .build();
		                QueryResults<Entity> results = datastore.run(query);
		                while (results.hasNext()) {
		                    Entity existingTokenEntity = results.next();
		                    datastore.delete(existingTokenEntity.getKey());
		                }

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
		                return Response.status(Status.FORBIDDEN).build();
		            }
		        } else {
		            txn.rollback();
		            LOG.warning("Failed login attempt! User " + data.username + " does not exist");
		            return Response.status(Status.NOT_FOUND).build();
		        }
		    } finally {
		        if (txn.isActive()) {
		            txn.rollback();
		            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		        }
		    }
		}

		
		
	

}

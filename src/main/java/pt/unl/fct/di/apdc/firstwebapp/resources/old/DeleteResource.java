package pt.unl.fct.di.apdc.firstwebapp.resources.old;

import java.util.logging.Logger;


import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.firstwebapp.util.Authorization;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;


@Path("/delete")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8") 
public class DeleteResource {
	
	private static final Logger LOG = Logger.getLogger(DeleteResource.class.getName());
	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	private final Gson g = new Gson();

	
	
	public DeleteResource() {}

	@DELETE
	@Path("/{username}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteUser(@PathParam("username") String userDeleted, @QueryParam("tokenObj") String tokenObjStr){
	    LOG.fine("Attempting to delete user: " + userDeleted);

	    TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
	    
	    Transaction txn = datastore.newTransaction();
	    try {
	        Key userKey = datastore.newKeyFactory().setKind("Users").newKey(userDeleted);
	        Key tokenKey = datastore.newKeyFactory().setKind("Token").newKey(tokenObj.getTokenID());

	        Entity user = txn.get(userKey);
	    	Entity token = txn.get(tokenKey);

	        if (user == null) {
	            txn.rollback();
	            return Response.status(Response.Status.NOT_FOUND).entity("User is null").build();
	        }
	        else if(token == null) {
	        	 txn.rollback();
		         return Response.status(Response.Status.NOT_FOUND).entity("Null token").build();
		        } else {
	        	int userDeletedRole = (int) user.getLong("user_role");	
	            int userLoggedInRole = (int) token.getLong("user_role");
	            String userLoggedInName = token.getString("username");
	            int expirationDate = (int) token.getLong("token_expirationdata");	            
	            boolean canDelete = Authorization.canDeleteUser(userDeletedRole, userLoggedInRole);

	            if ((canDelete || userLoggedInName.equals(userDeleted)) && expirationDate < System.currentTimeMillis()) {
	                txn.delete(userKey);
	                LOG.info("User deleted: " + userDeleted);
	                txn.commit();
	                return Response.ok().build();
	            } else { 
	                txn.rollback();
	                return Response.status(Response.Status.FORBIDDEN).entity("User not authorized to delete user").build();
	            }
	        }
	    } finally {
	        if (txn.isActive()) {
	            txn.rollback();
	        }
	    }
	}
	

	
}

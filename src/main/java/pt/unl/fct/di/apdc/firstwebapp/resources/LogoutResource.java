package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.logging.Logger;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;

@Path("/logout")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class LogoutResource {

	public LogoutResource() {}
	
	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	
	KeyFactory tokenKeyFactory = datastore.newKeyFactory().setKind("Token");
	
	private static final Logger LOG = Logger.getLogger(LogoutResource.class.getName());
	
	private final Gson g = new Gson();


	
	@POST
	public Response doLogout(@QueryParam("tokenObj") String tokenObjStr) {
		
		TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
		
	    LOG.fine("Attempt to logout user: " + tokenObj.getUsername());

	    Key tokenKey = tokenKeyFactory.newKey(tokenObj.getTokenID());

	    // Retrieve the entity using the key
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
	            return Response.status(Status.BAD_REQUEST).build();
	        }
	    } finally {
	        if (txn.isActive()) {
	            txn.rollback();
	            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
	        }
	    }
	}

	
	
}	

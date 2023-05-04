package pt.unl.fct.di.apdc.firstwebapp.resources.old;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

import javax.ws.rs.GET;
import javax.ws.rs.PUT;
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
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.firstwebapp.util.Authorization;
import pt.unl.fct.di.apdc.firstwebapp.util.LoginData;
import pt.unl.fct.di.apdc.firstwebapp.util.ProfileData;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;


@Path("/profile")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class EditResource {

	public EditResource() {}
	
	private static final Logger LOG = Logger.getLogger(ListResource.class.getName());
	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	private final Gson g = new Gson();
	
	private static String INVALID_LOGIN = "Missing or wrong parameter.";
	private static String INVALID_EMAIL = "Invalid email address";
	private static String INVALID_PASSWORD = "Invalid password";
	private static String ATTEMPTING_UPDATE = "Attempting to update the user: ";
	private static String USER_NOT_FOUND = "User not found";
	private static String USER_ROLE = "USER";
	private static String INATIVO_STATE = "INATIVO";
	
	
	
	@GET
	@Path("check")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getProfile(@QueryParam("tokenObj") String tokenObjStr) {
		TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
		
		  Key userKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());
		
		  Entity user = datastore.get(userKey);
		
	    if (user == null) {
	        return Response.status(Status.NOT_FOUND).build();
	    } else { 
	        Map<String, Object> responseMap = new HashMap<>();
	        responseMap.put("email", user.getString("user_email"));
	        responseMap.put("password", user.getString("user_pwd"));
	        responseMap.put("name", user.getString("user_name"));
	        String user_role = Integer.toString((int) user.getLong("user_role"));
	        responseMap.put("role", user_role);
	        responseMap.put("state", user.getString("user_state"));
	       
	        if (user.contains("user_profile")) {
	            responseMap.put("profile", user.getString("user_profile"));
	        }
	        if (user.contains("user_landline")) {
	            responseMap.put("landline", user.getString("user_landline"));
	        }
	        if (user.contains("user_phone")) {
	            responseMap.put("phoneNumber", user.getString("user_phone"));
	        }
	        if (user.contains("user_occupation")) {
	            responseMap.put("occupation", user.getString("user_occupation"));
	        }
	        if (user.contains("user_address")) {
	            responseMap.put("address", user.getString("user_address"));
	        }
	        if (user.contains("user_nif")) {
	            responseMap.put("nif", user.getString("user_nif"));
	        }
	        return Response.ok(g.toJson(responseMap)).build();
	    }
	}

	
		@PUT
		@Path("/{username}")
		public Response updateUser(@PathParam("username") String username, ProfileData data, @QueryParam("tokenObj") String tokenObjStr) {
		    LOG.fine(ATTEMPTING_UPDATE + username);
		    
		    TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
		    Transaction txn = datastore.newTransaction();
		    
			  try {	    	
				  //User ao qual vamos mudar a info
				  	Key userKey = datastore.newKeyFactory().setKind("Users").newKey(username);
				  
			        Entity user = txn.get(userKey);
			        if (user == null) {
			            txn.rollback();
			            return Response.status(Response.Status.NOT_FOUND).entity(USER_NOT_FOUND).build();
			        } else {
			        	//Roll da pessoa que vamos mudar
			        	int userRole = (int) user.getLong("user_role");
			        	//Roll da pessoa que esta a alterar os dados
			       	    int tokenRole = tokenObj.getRole();
			       	    //Roll que vem na data
			       	    int dataRole = data.getRole();
			 
			       	    if( (userRole == dataRole && userRole == tokenRole) && (userRole != 5 || dataRole != 5)) {
			       	    	txn.rollback();
			       	    	return Response.status(Response.Status.FORBIDDEN).entity("User doesn't have sufficient permssions").build();
			       	    }
			        	
			        	if(!Authorization.changeRole(userRole, tokenRole, dataRole)) {
			        		txn.rollback();
			        		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("User doesn't have permssions to change role").build();
			        	}
			        	
			        	if(!Authorization.changeState(userRole, tokenRole, dataRole)) {
			        		txn.rollback();
			        		return Response.status(Response.Status.METHOD_NOT_ALLOWED).entity("User doesn't have permssions to change state").build();
			        	}  	
			        	
			        	
			            user = Entity.newBuilder(userKey)
			                    .set("user_name", data.getName())
			                    .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
			                    .set("user_email", data.getEmail())
			                    .set("user_role", data.getRole())
			                    .set("user_state", data.getState())
			                    .set("user_profile", data.getProfile())
			                    .set("user_creation_time", user.getTimestamp("user_creation_time"))
			                    .set("user_landine", data.getLandline())
			            		.set("user_phone", data.getPhoneNumber())
			            		.set("user_occupation", data.getOccupation())
			            		.set("user_address", data.getAddress())
			            		.set("user_nif", data.getNif())
			                    .build();
			            txn.update(user);
			            LOG.info("User updated: " + username);
			            txn.commit();
			            return Response.status(Response.Status.OK).entity(data).build();
			        }    
			    }
			    finally {
			        if (txn.isActive()) {
			            txn.rollback();
			        }
			    }
		}
		
		@PUT
		public Response updateOwnUser(ProfileData data, @QueryParam("tokenObj") String tokenObjStr) {
		    
		    TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
		    Transaction txn = datastore.newTransaction();
		      	
		    	Key userKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());
		    
		    try {	    	
		        Entity user = txn.get(userKey);
		        if (user == null) {
		            txn.rollback();
		            return Response.status(Response.Status.NOT_FOUND).entity(USER_NOT_FOUND).build();
		        } else {
		        	int userRole = (int) user.getLong("user_role");
		       	        	
		        	if(!Authorization.canChangeOwnRole(userRole) && userRole != data.getRole()) {
		        		txn.rollback();
		        		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("User doesn't have permssions to change his "
		        				+ "role").build();
		        	}
		        	
		        	if(!Authorization.canChangeOwnState(userRole) && !user.getString("user_state").equals(data.getState())) {
		        		txn.rollback();
		        		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("User doesn't have permssions to change his "
		        				+ "state").build();
		        	}  	
		            user = Entity.newBuilder(userKey)
		                    .set("user_name", data.getName())
		                    .set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
		                    .set("user_email", data.getEmail())
		                    .set("user_role", data.getRole())
		                    .set("user_state", data.getState())
		                    .set("user_creation_time", user.getTimestamp("user_creation_time"))
		                    .set("user_profile", data.getProfile())
		                    .set("user_landline", data.getLandline())
		            		.set("user_phone", data.getPhoneNumber())
		            		.set("user_occupation", data.getOccupation())
		            		.set("user_address", data.getAddress())
		            		.set("user_nif", data.getNif())
		                    .build();
		            txn.update(user);
		            txn.commit();
		            return Response.status(Response.Status.OK).entity(data).build();
		        }    
		    }
		    finally {
		        if (txn.isActive()) {
		            txn.rollback();
		        }
		    }
		
		}	
	
		
		
	/*
	@PUT
	@Path("/{username}")
	public Response updateUser(@PathParam("username") String username, LoginData userData) {
	    LOG.fine(ATTEMPTING_UPDATE + username);
	    
	    if (!userData.isValid()) {
	        return Response.status(Status.BAD_REQUEST).entity(INVALID_LOGIN).build();
	    }
	    
	    if (!userData.isValidEmail()) {
	        return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_EMAIL).build();
	    }
	    
	    if (!userData.isValidPassword()) {
	        return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_PASSWORD).build();
	    }
	    
	    Transaction txn = datastore.newTransaction();
	    try {
	        Key userKey = datastore.newKeyFactory().setKind("Users").newKey(username);
	        Entity user = txn.get(userKey);
	        
	        if (user == null) {
	            txn.rollback();
	            return Response.status(Response.Status.NOT_FOUND).entity(USER_NOT_FOUND).build();
	        } else {
	            user = Entity.newBuilder(userKey)
	                    .set("user_name", userData.getName())
	                    .set("user_pwd", DigestUtils.sha512Hex(userData.getPassword()))
	                    .set("user_email", userData.getEmail())
	                    .set("user_role", USER_ROLE)
	                    .set("user_state", INATIVO_STATE)
	                    .set("user_creation_time", user.getTimestamp("user_creation_time")) // keep the original creation time
	                    .build();
	            txn.update(user);
	            LOG.info("User updated: " + username);
	            txn.commit();
	            return Response.status(Response.Status.OK).entity(userData).build();
	        }    
	    }
	    finally {
	        if (txn.isActive()) {
	            txn.rollback();
	        }
	    }       
	}
*/
	
	
}

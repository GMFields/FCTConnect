package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.logging.Logger;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.codec.digest.DigestUtils;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Transaction;
import com.google.cloud.Timestamp;

import pt.unl.fct.di.apdc.firstwebapp.util.LoginData;

@Path("/register")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class RegisterResource {
	
	private static final Logger LOG = Logger.getLogger(RegisterResource.class.getName());
	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	
	private static String INVALID_LOGIN = "Missing or wrong parameter.";
	private static String INVALID_EMAIL = "Invalid email address";
	private static String INVALID_PASSWORD = "Invalid password";
	private static String ATTEMPTING_REGISTER = "Attempting to register the user: ";
	private static String USER_EXISTS = "User already exists";
	private static long USER_ROLE = 1L;
	private static String INATIVO_STATE = "INATIVO";




	public RegisterResource() {}
	
	@POST
	public Response registerUser(LoginData userData) {
		LOG.fine(ATTEMPTING_REGISTER+userData.name);
		
			if(!userData.isValid()) {
				return Response.status(Status.BAD_REQUEST).entity(INVALID_LOGIN).build();
			}
			
			if(!userData.isValidEmail()) {
				return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_EMAIL).build();
		    }
			
			if(!userData.isValidPassword()) {
				return Response.status(Response.Status.BAD_REQUEST).entity(INVALID_PASSWORD).build();
		    }
		
		Transaction txn = datastore.newTransaction();
		try {
			Key userKey = datastore.newKeyFactory().setKind("Users").newKey(userData.getUsername());
			Entity user = txn.get(userKey);
			
			if(user != null) {
				txn.rollback();
				return Response.status(Response.Status.CONFLICT).entity(USER_EXISTS).build();
			} else {
				user = Entity.newBuilder(userKey)
						.set("user_name", userData.getName())
						.set("user_pwd", DigestUtils.sha512Hex(userData.getPassword()))
						.set("user_email", userData.getEmail())
						.set("user_role", USER_ROLE)
						.set("user_state", INATIVO_STATE)
						.set("user_creation_time", Timestamp.now())
						.build();			
				txn.add(user);
				LOG.info("User registered: "+userData.getUsername());
				txn.commit();
				return Response.status(Response.Status.CREATED).entity(userData).build();
				}	
		}
		finally {
			if(txn.isActive()) {
				txn.rollback();
			}
		}		
	}
	
	
}

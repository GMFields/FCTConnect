	package pt.unl.fct.di.apdc.firstwebapp.resources.old;
	
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;
import java.util.logging.Logger;
import javax.ws.rs.GET;
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
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;

	
	@Path("/list")
	@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
	public class ListResource {
	
		private static final Logger LOG = Logger.getLogger(ListResource.class.getName());
		private static Logger Log = Logger.getLogger(ListResource.class.getName());
		private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
		private final Gson g = new Gson();
		private static String USER_NOT_FOUND = "User not found";


		public ListResource() {}
		
		@GET
		public Response listUsers(@QueryParam("tokenObj") String tokenObjStr) {
		    
		    TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
		    
		    Key userKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());
		    
		    Entity user = datastore.get(userKey);
		    if (user == null) {
		        return Response.status(Response.Status.NOT_FOUND).entity(USER_NOT_FOUND).build();
		    }
		    
		    int userRole = (int) user.getLong("user_role");

		    Query<Entity> query = Query.newEntityQueryBuilder()
		            .setKind("Users")
		            .build();
		    
		    QueryResults<Entity> results = datastore.run(query);
		    
		    List<List<String>> users = new ArrayList<>();
		    while (results.hasNext()) {
		        Entity entity = results.next();
		        
		        // If the user role is 1, only show private profiles with limited info
		        if (userRole == 1) {
		        	
		        	if(entity.contains("user_profile")) {		        	
		        	if(entity.getString("user_profile").equals("Publico") && (int) entity.getLong("user_role") == 1 && entity.getString("user_state").equals("ATIVO")) {
		            List<String> userData = new ArrayList<>();
		            userData.add(entity.getString("user_name"));
		            userData.add(entity.getString("user_email"));
		            userData.add(entity.getString("user_name"));
		            users.add(userData);
		        	}
		        }
		       }
		        // If the user role is 2, show everything
		        else if (userRole == 2 || userRole == 3) {
		        	if((int) entity.getLong("user_role") == 1) {
		            List<String> userData = new ArrayList<>();
		            userData.add(entity.getString("user_name"));
		            userData.add(entity.getString("user_email"));
		            userData.add(entity.getString("user_pwd"));
		            String user_role = Integer.toString((int) entity.getLong("user_role"));
		            userData.add(user_role);
		            userData.add(entity.getString("user_state"));
		            userData.add(formatter.format(entity.getTimestamp("user_creation_time").toDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())); 
		            
		            if (entity.contains("user_profile")) {
		            	 userData.add(entity.getString("user_profile"));
			        }
			        if (entity.contains("user_landline")) {
			        	 userData.add(entity.getString("user_landline"));
			        }
			        if (entity.contains("user_phone")) {
			        	 userData.add(entity.getString("user_phone"));
			        }
			        if (entity.contains("user_occupation")) {
			        	 userData.add(entity.getString("user_occupation"));
			        }
			        if (entity.contains("user_address")) {
			        	 userData.add(entity.getString("user_address"));
			        }
			        if (entity.contains("user_nif")) {
			        	 userData.add(entity.getString("user_nif"));
			        }
		            
		            users.add(userData);
		        }
		      }
		        else if (userRole == 4) {
		        	if((int) entity.getLong("user_role") == 1 || (int) entity.getLong("user_role") == 2) {
		            List<String> userData = new ArrayList<>();
		            userData.add(entity.getString("user_name"));
		            userData.add(entity.getString("user_email"));
		            userData.add(entity.getString("user_pwd"));
		            String user_role = Integer.toString((int) entity.getLong("user_role"));
		            userData.add(user_role);
		            userData.add(entity.getString("user_state"));
		            userData.add(formatter.format(entity.getTimestamp("user_creation_time").toDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())); 
		            
		            if (entity.contains("user_profile")) {
		            	 userData.add(entity.getString("user_profile"));
			        }
			        if (entity.contains("user_landline")) {
			        	 userData.add(entity.getString("user_landline"));
			        }
			        if (entity.contains("user_phone")) {
			        	 userData.add(entity.getString("user_phone"));
			        }
			        if (entity.contains("user_occupation")) {
			        	 userData.add(entity.getString("user_occupation"));
			        }
			        if (entity.contains("user_address")) {
			        	 userData.add(entity.getString("user_address"));
			        }
			        if (entity.contains("user_nif")) {
			        	 userData.add(entity.getString("user_nif"));
			        }
		            
		            users.add(userData);
		        }
		      }
		        else if (userRole == 5) {
		        	
		            List<String> userData = new ArrayList<>();
		            userData.add(entity.getString("user_name"));
		            userData.add(entity.getString("user_email"));
		            userData.add(entity.getString("user_pwd"));
		            String user_role = Integer.toString((int) entity.getLong("user_role"));
		            userData.add(user_role);
		            userData.add(entity.getString("user_state"));
		            userData.add(formatter.format(entity.getTimestamp("user_creation_time").toDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())); 
		            
		            if (entity.contains("user_profile")) {
		            	 userData.add(entity.getString("user_profile"));
			        }
			        if (entity.contains("user_landline")) {
			        	 userData.add(entity.getString("user_landline"));
			        }
			        if (entity.contains("user_phone")) {
			        	 userData.add(entity.getString("user_phone"));
			        }
			        if (entity.contains("user_occupation")) {
			        	 userData.add(entity.getString("user_occupation"));
			        }
			        if (entity.contains("user_address")) {
			        	 userData.add(entity.getString("user_address"));
			        }
			        if (entity.contains("user_nif")) {
			        	 userData.add(entity.getString("user_nif"));
			        }
		            
		            users.add(userData);
		        }
		    }
		    
		    return Response.status(Response.Status.OK).entity(users).build();
		}
		

		
	}

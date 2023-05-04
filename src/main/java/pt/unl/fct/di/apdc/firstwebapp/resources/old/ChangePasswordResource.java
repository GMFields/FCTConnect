package pt.unl.fct.di.apdc.firstwebapp.resources.old;

import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.apache.commons.codec.digest.DigestUtils;
import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.Transaction;
import com.google.gson.Gson;

import pt.unl.fct.di.apdc.firstwebapp.util.PasswordData;
import pt.unl.fct.di.apdc.firstwebapp.util.TokenClass;

@Path("/changepassword")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class ChangePasswordResource {
	
	private static final Logger LOG = Logger.getLogger(LoginResource.class.getName());
	
	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	
	private final Gson g = new Gson();
		
	KeyFactory userKeyFactory = datastore.newKeyFactory().setKind("Users");	
	
	public ChangePasswordResource() {}

	
	@PUT
    @Consumes(MediaType.APPLICATION_JSON)
    public Response changePwd(PasswordData data, @QueryParam("tokenObj") String tokenObjStr) {

		TokenClass tokenObj = g.fromJson(tokenObjStr, TokenClass.class);
 		
        Key userKey = datastore.newKeyFactory().setKind("Users").newKey(tokenObj.getUsername());
        
        Transaction txn = datastore.newTransaction();

        try {
            Entity user = datastore.get(userKey);
            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).entity("User does not exist").build();
            } else {
            	String hashedPWD = user.getString("user_pwd");
            	if(hashedPWD.equals(DigestUtils.sha512Hex(data.getOldPWD()))) {
            		String newHashedPWD = DigestUtils.sha512Hex(data.getNewPWD());
                Entity updateuser = Entity.newBuilder(user)
                        .set("user_pwd", newHashedPWD)
                        .build();
                txn.put(updateuser);
                LOG.info("Password changed");
                txn.commit();
                return Response.ok("{}").build();
            } else {
            	return Response.status(Response.Status.FORBIDDEN).build();
            }
         }
        } finally {
            if (txn.isActive()) {
                txn.rollback();
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
            }
        }
    }
	
	
}

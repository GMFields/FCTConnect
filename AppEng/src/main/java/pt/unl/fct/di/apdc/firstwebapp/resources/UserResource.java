package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.Timestamp;
import com.google.cloud.datastore.*;

import com.google.gson.Gson;
import io.grpc.netty.shaded.io.netty.util.Constant;
import pt.unl.fct.di.apdc.firstwebapp.api.UserAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.ConstantFactory;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;

import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.firstwebapp.util.*;

//import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.UUID;
import java.util.logging.Logger;

import javax.validation.constraints.Email;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.Status;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class UserResource implements UserAPI {
	Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
	// DatastoreOptions.newBuilder().setHost("http://localhost:8081").setProjectId("helical-ascent-385614").build().getService();

	private final Gson g = new Gson();

	private static final Logger LOG = Logger.getLogger(UserResource.class.getName());

	private EmailSender sender = EmailSender.getInstance();

	public UserResource() {
	}

	@Override
	public Response registerUser(ProfileData data) {
		LOG.info(ConstantFactory.ATTEMPTING_REGISTER.getDesc() + data.getUsername());

		if (!Authorization.isDataFormatted(data.getUsername(), data.getPassword(), data.getName(), data.getEmail()))
			return Response.status(Status.BAD_REQUEST).entity("Invalid Data").build();

		Transaction txn = datastore.newTransaction();
		Key emailKey = KeyStore.emailKeyFactory(data.getEmail());
		try {
			Entity email = txn.get(emailKey);

			if (email != null) {
				txn.rollback();
				return Response.status(Status.CONFLICT).entity(ConstantFactory.EMAIL_EXISTS.getDesc()).build();
			}

			email = Entity.newBuilder(emailKey).set("user_username", data.getUsername()).build();
			txn.add(email);
			LOG.info("Email entity created");

			Key userKey = KeyStore.userKeyFactory(email.getString("user_username"));

			Entity user = txn.get(userKey);

			if (user != null) {
				txn.rollback();
				return Response.status(Status.CONFLICT).entity(ConstantFactory.USER_EXISTS.getDesc()).build();
			}

			if(data.getRole() == 4) {
				return Response.status(Status.FORBIDDEN).entity(ConstantFactory.INSUFFICIENT_PERMISSIONS.getDesc()).build();
			}
			String activationToken = generateActivationToken(data.getUsername());

			user = Entity.newBuilder(userKey)
					.set("user_name", data.getName()).set("user_pwd", DigestUtils.sha512Hex(data.getPassword()))
					.set("user_email", data.getEmail()).set("user_role", data.getRole())
					.set("user_state", ConstantFactory.INATIVO_STATE.getDesc())
					.set("user_creation_time", Timestamp.now())
					.set("user_department", data.getDepartment())
					.set("user_reviews", new ArrayList<>())
					.set("activation_token", activationToken)
					.build();

			txn.add(user);
			LOG.info("User registered: " + data.getUsername());
			txn.commit();
			if(data.getRole() < 3) {
				sender.sendActivationEmail(data.getEmail(), activationToken);
			} else {
				sender.sendDocenteWelcomeEmail(data.getEmail());
			}
			return Response.status(Status.CREATED).entity(g.toJson(user)).build();
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

	@Override
	public Response userLogin(String email, String password) {
		LOG.info("Attempt to login user with e-mail: " + email);

		Key emailKey = KeyStore.emailKeyFactory(email);
		Entity emailEntity = datastore.get(emailKey);

		if (emailEntity == null) {
			LOG.info("Failed login attempt! User with email: " + email + " does not exist");
			return Response.status(Status.NOT_FOUND).build();
		}

		Key userKey = KeyStore.userKeyFactory(emailEntity.getString("user_username"));

		Transaction txn = datastore.newTransaction();

		try {

			Entity user = datastore.get(userKey);

			if (user == null) {
				txn.rollback();
				return Response.status(Status.NOT_FOUND).build();
			}

			if (!user.getString("user_state").equals("ATIVO")) {
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity(ConstantFactory.INACTIVE_ACCOUNT.getDesc()).build();
			}

			String hashedPWD = user.getString("user_pwd");
			if (!hashedPWD.equals(DigestUtils.sha512Hex(password))) {
				txn.rollback();
				return Response.status(Status.FORBIDDEN).entity(ConstantFactory.WRONG_PASSWORD.getDesc()).build();
			}

			int userRole = (int) user.getLong("user_role");
			AuthToken token = new AuthToken(emailEntity.getString("user_username"), userRole);

			Key tokenkey = KeyStore.tokenKeyFactory(token.getTokenID());

			Entity tokenid = Entity.newBuilder(tokenkey).set("username", token.getUsername())
					.set("user_role", token.getRole())
					.set("token_creationdata", token.getCreationData())
					.set("token_expirationdata", token.getExpirationData()).build();
			txn.add(tokenid);

			txn.commit();
			return Response.ok(g.toJson(token)).build();

		} catch (Exception e) {
			txn.rollback();
			LOG.severe(e.getMessage());
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();

		} finally {
			if (txn.isActive()) {
				txn.rollback();
				return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
			}
		}
	}

	@Override
	public Response userLogout(String tokenObjStr) {
		AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
		LOG.fine("Attempt to logout user: " + tokenObj.getUsername());
		Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
		Transaction txn = datastore.newTransaction();

		try {
			Entity tokenE = txn.get(tokenKey);
			if (tokenE == null) {
				txn.rollback();
				return Response.status(Status.NOT_FOUND).build();
			}

			txn.delete(tokenKey);
			txn.commit();
			return Response.ok().build();
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

	@Override
	public Response getProfile(String tokenObjStr) {
		AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

		Key userKey = KeyStore.userKeyFactory(tokenObj.getUsername());
		Transaction txn = datastore.newTransaction();

		try {
			Entity user = datastore.get(userKey);

			String email = user.getString("user_email");
			String password = user.getString("user_pwd");
			String name = user.getString("user_name");
			int role = (int) user.getLong("user_role");
			String state = user.getString("user_state");
			String department = user.getString("user_department");
			String profile = user.contains("user_profile") ? user.getString("user_profile") : "";
			String landline = user.contains("user_landline") ? user.getString("user_landline") : "";
			String phoneNumber = user.contains("user_phone") ? user.getString("user_phone") : "";
			String occupation = user.contains("user_occupation") ? user.getString("user_occupation") : "";
			String address = user.contains("user_address") ? user.getString("user_address") : "";
			String nif = user.contains("user_nif") ? user.getString("user_nif") : "";

			ProfileData userProfile = new ProfileData(email, tokenObj.getUsername(), password, name, role, state,
					profile,
					landline, phoneNumber, occupation, address, nif, department);

			txn.commit();
			return Response.ok(g.toJson(userProfile)).build();
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

	@Override
	public Response updateProfile(ProfileData data, String tokenObjStr) {
		LOG.fine("Attempting to update user :" + data.getName());

		AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

		Key userKey = KeyStore.userKeyFactory(tokenObj.getUsername());
		Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

		Transaction txn = datastore.newTransaction();

		try {
			Entity user = txn.get(userKey);
			if (user == null) {
				txn.rollback();
				return Response.status(Response.Status.NOT_FOUND).entity("USER_NOT_FOUND").build();
			} else {
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
						.set("user_department", data.getDepartment())
						.set("user_reviews", user.getList("user_reviews"))
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


	@Override
	public Response deleteAccount(String tokenObjStr) {
		AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

		Key userKey = KeyStore.userKeyFactory(tokenObj.getUsername());
		Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

		Transaction txn = datastore.newTransaction();

		try {
			Entity user = txn.get(userKey);
			if (user == null) {
				txn.rollback();
				return Response.status(Status.NOT_FOUND).build();
			}

			Entity token = txn.get(tokenKey);
			if (token == null) {
				txn.rollback();
				return Response.status(Status.FORBIDDEN).build();
			}

			txn.delete(userKey);
			LOG.info("User deleted: " + tokenObj.getUsername());
			txn.delete(tokenKey);
			txn.commit();
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			txn.rollback();
			LOG.severe(e.getMessage());
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
		} finally {
			if (txn.isActive()) {
				txn.rollback();
			}
		}
	}

	@Override
	public Response activateAccount(String activationToken) {

	boolean isTokenValid = verifyActivationToken(activationToken);

        if (isTokenValid) {
		activateUserAccount(activationToken);
		return Response.status(Status.OK).build();
	} else {
			return Response.status(Status.INTERNAL_SERVER_ERROR).build();
	}
}

	private boolean verifyActivationToken(String activationToken) {
		boolean isValid = false;
		String tokenParts[] = activationToken.split(",");
		String token = tokenParts[0];
		String username = tokenParts[1];

		if(token != null && !token.isEmpty() && !username.isEmpty() && username != null ) {
			isValid = true;
		}
		LOG.info(String.valueOf(isValid));
		Key userKey = KeyStore.userKeyFactory(username);
		Entity user = datastore.get(userKey);

		if(user.getString("activation_token").equals(token)) {
			isValid = true;
		}

		return isValid;
	}

	private void activateUserAccount(String activationToken) {
		String tokenParts[] = activationToken.split(",");
		String username = tokenParts[1];

		Key userKey = KeyStore.userKeyFactory(username);
		Entity user = datastore.get(userKey);

		user = Entity.newBuilder(user)
				.set("user_state", "ATIVO")
				.build();
		datastore.update(user);
	}

	private String generateActivationToken(String username) {
		String randomUUID = UUID.randomUUID().toString();
		String token = randomUUID+","+username;
		return token;
	}


}
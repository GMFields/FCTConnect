package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.datastore.*;
import pt.unl.fct.di.apdc.firstwebapp.api.AdminAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.ConstantFactory;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.notifications.ApnFormat;
import pt.unl.fct.di.apdc.firstwebapp.notifications.FcmFormat;
import pt.unl.fct.di.apdc.firstwebapp.notifications.WebFormat;

import org.apache.commons.codec.digest.DigestUtils;
import pt.unl.fct.di.apdc.firstwebapp.util.*;

import com.google.gson.Gson;
import com.pusher.pushnotifications.PushNotifications;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.*;
import javax.ws.rs.core.Response.Status;

@Path("/admin")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class AdminResource implements AdminAPI {

	private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

	private final Gson g = new Gson();

	private static final Logger LOG = Logger.getLogger(AdminResource.class.getName());

	private String instanceId = "a5dd11d2-e829-4a6b-bb1b-4bbd9b4862a4";
	private String secretKey = "D346867FB36AD2CA833333F2ADAC62E763BDA15264FC06C1D0F5BE27133EF369";
	private PushNotifications pushNot = new PushNotifications(instanceId, secretKey);

	@Override
	public Response adminLogin(String email, String password) {
		LOG.info("Attempting to log in admin: " + email);
		Key emailKey = KeyStore.emailKeyFactory(email);

		Transaction txn = datastore.newTransaction();

		try {
			Entity emailEntity = txn.get(emailKey);

			if (emailEntity == null) {
				LOG.info("Failed login attempt! Admin with email: " + email + " does not exist");
				return Response.status(Status.NOT_FOUND).build();
			}

			Key userKey = KeyStore.userKeyFactory(emailEntity.getString("user_username"));

			Entity user = txn.get(userKey);

			if (user == null) {
				txn.rollback();
				LOG.warning("Failed login attempt! User with email: " + email + " does not exist");
				return Response.status(Status.NOT_FOUND).build();
			}

			String hashedPWD = user.getString("user_pwd");
			if (!hashedPWD.equals(DigestUtils.sha512Hex(password))) {
				txn.rollback();
				return Response.status(Status.FORBIDDEN).build();
			}

			int userRole = (int) user.getLong("user_role");

			if (userRole != 4) {
				txn.rollback();
				return Response.status(Status.FORBIDDEN).build();
			}

			AuthToken token = new AuthToken(emailEntity.getString("user_username"), userRole);

			Key tokenKey = KeyStore.tokenKeyFactory(token.getTokenID());

			Entity tokenId = Entity.newBuilder(tokenKey).set("username", token.getUsername())
					.set("user_role", token.getRole()).set("token_creationdata", token.getCreationData())
					.set("token_expirationdata", token.getExpirationData()).build();

			txn.add(tokenId);

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
	public Response listAllUsers(String tokenObjStr) {
		Response r = verifyAdmin(tokenObjStr);
		if (r.getStatus() != 200) {
			return r;
		}

		Query<Entity> query = Query.newEntityQueryBuilder().setKind("Users").build();

		QueryResults<Entity> results = datastore.run(query);
		if (!results.hasNext()) {
			return Response.status(Status.NOT_FOUND).entity("There are no users!").build();
		}

		List<List<String>> resultList = new ArrayList<>();
		while (results.hasNext()) {
			Entity entity = results.next();
			List<String> userData = new ArrayList<>();
			userData.add(entity.getString("user_name"));
			userData.add(entity.getString("user_email"));
			userData.add(entity.getString("user_state"));
			if (entity.contains("user_department")) {
				userData.add(entity.getString("user_department"));
			}

			resultList.add(userData);
		}

		return Response.ok(g.toJson(resultList)).build();
	}

	@Override
	public Response listInactiveUsers(String tokenObjStr) {
		Response r = verifyAdmin(tokenObjStr);
		if (r.getStatus() != 200) {
			return r;
		}

		Query<Entity> query = Query.newEntityQueryBuilder().setKind("Users")
				.setFilter(StructuredQuery.PropertyFilter.eq("user_state", "INATIVO"))
				.build();

		QueryResults<Entity> results = datastore.run(query);
		if (!results.hasNext()) {
			return Response.status(Status.NOT_FOUND).entity("There are no inactive users!").build();
		}

		List<List<String>> resultList = new ArrayList<>();
		while (results.hasNext()) {
			Entity entity = results.next();
			List<String> userData = new ArrayList<>();
			userData.add(entity.getString("user_name"));
			userData.add(entity.getString("user_email"));
			userData.add(entity.getString("user_state"));
			if (entity.contains("user_department")) {
				userData.add(entity.getString("user_department"));
			}

			resultList.add(userData);
		}

		return Response.ok(g.toJson(resultList)).build();
	}

	public Response activateUsers(List<String> userEmails, String tokenObjStr) {
		Response r = verifyAdmin(tokenObjStr);
		if (r.getStatus() != 200) {
			return r;
		}

		Transaction txn = datastore.newTransaction();

		try {
			for (String email : userEmails) {
				Key emailKey = KeyStore.emailKeyFactory(email);
				Entity emailEntity = txn.get(emailKey);

				if (emailEntity == null) {
					return Response.status(Status.NOT_FOUND).entity("User email not found: " + email).build();
				}

				String username = emailEntity.getString("user_username");

				Key userKey = KeyStore.userKeyFactory(username);
				Entity userEntity = txn.get(userKey);
				if (userEntity == null) {
					// User entity not found
					return Response.status(Status.NOT_FOUND).entity("User not found for email: " + email).build();
				}

				userEntity = Entity.newBuilder(userEntity).set("user_state", ConstantFactory.ATIVO_STATE.getDesc())
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

	public void sendNotification() { // TBD o que por como argumento
		// need client side code to work
		// flutter client side here:
		// https://pusher.com/docs/beams/getting-started/flutter/configure-fcm-and-apns/?ref=flutter
		// web client side here:
		// https://pusher.com/docs/beams/getting-started/web/sdk-integration/?ref=web
		List<String> interests = Arrays.asList("donuts", "pizza");

		Map<String, Map> publishRequest = new HashMap();

		Map<String, Map> alert = new ApnFormat("secretKey", "instanceId").getApnNotification();
		Map<String, Map> aps = new HashMap<String, Map>();
		aps.put("aps", alert);
		publishRequest.put("apns", aps);

		Map<String, Map> fcm = new FcmFormat("title", "body").getFcmNotification();
		publishRequest.put("fcm", fcm);

		Map<String, Map> web = new WebFormat("title", "body").getWebNotification();
		publishRequest.put("web", web);

		try {
			pushNot.publishToInterests(interests, publishRequest);
		} catch (IOException | InterruptedException | URISyntaxException e) {
			e.printStackTrace();
		}
	}

	private Response verifyAdmin(String tokenObjStr) {
		AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

		Key adminKey = KeyStore.userKeyFactory(tokenObj.getUsername());

		Entity user = datastore.get(adminKey);
		if (user == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(ConstantFactory.USER_DOESNT_EXIST.getDesc())
					.build();
		}

		int userRole = (int) user.getLong("user_role");
		LOG.info("USER ROLE-> " + userRole);

		if (userRole != 4) {
			return Response.status(Status.FORBIDDEN).entity("User doesn't have permissions").build();
		}

		return Response.status(Status.OK).build();
	}

}

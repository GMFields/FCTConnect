package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.AnomalyAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.AnomalyData;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Path("/anomaly")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class AnomalyResource implements AnomalyAPI {

    private static final String USER_DOESNT_EXIST = "User doesn't exist";

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    private static final Logger LOG = Logger.getLogger(AnomalyResource.class.getName());

    private final Gson g = new Gson();

    @Override
    public Response reportAnomaly(String tokenObjStr, String anomalyDescription) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to report an anomaly!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        if (anomalyDescription.equals("")) {
            LOG.warning("Empty anomaly!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            if (token.getLong("token_expirationdata") < System.currentTimeMillis()) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).entity("data expirada").build();
            }

            AnomalyData anomaly = new AnomalyData(anomalyDescription, tokenObj.getUsername());

            Key anomalyKey = KeyStore.anomalyKeyFactory(anomaly.getAnomalyID());

            Entity anomalyEntity = Entity.newBuilder(anomalyKey)
                    .set("anomaly_creator", anomaly.getAnomalyCreator())
                    .set("anomaly_description", anomalyDescription)
                    .set("anomaly_ID", anomaly.getAnomalyID())
                    .set("anomaly_creation_data", anomaly.getCreationData())
                    .set("is_anomaly_solved", anomaly.isSolved())
                    .set("is_anomaly_approved", anomaly.isApproved())
                    .build();
            txn.add(anomalyEntity);

            txn.commit();

            LOG.info("Anomaly reported successfully with ID: " + anomaly.getAnomalyID());
            return Response.status(Response.Status.OK)
                    .entity("Anomaly reported successfully. ID: " + anomaly.getAnomalyID()).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while reporting anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response listApprovedAnomalies(String tokenObjStr, String cursor) {
        int pageSize = 10;
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        Transaction txn = datastore.newTransaction();
        Entity token = txn.get(tokenKey);

        if (token == null) {
            txn.rollback();
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        if (token.getLong("token_expirationdata") < System.currentTimeMillis()) {
            txn.rollback();
            return Response.status(Response.Status.FORBIDDEN).entity("data expirada").build();
        }

        EntityQuery.Builder queryBuilder = Query.newEntityQueryBuilder()
                .setKind("Anomaly")
                .setFilter(StructuredQuery.PropertyFilter.eq("is_anomaly_approved", true))
                .setLimit(pageSize);

        if (cursor != null) {
            queryBuilder.setStartCursor(Cursor.fromUrlSafe(cursor));
        }

        QueryResults<Entity> results = datastore.run(queryBuilder.build());

        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no anomalies!").build();
        }

        List<List<String>> resultList = new ArrayList<>();

        while (results.hasNext()) {
            Entity entity = results.next();
            List<String> anomalyData = new ArrayList<>();
            anomalyData.add(entity.getString("anomaly_creator"));
            anomalyData.add(entity.getString("anomaly_description"));
            anomalyData.add(String.valueOf(entity.getBoolean("is_anomaly_solved")));
            anomalyData.add(entity.getString("anomaly_ID"));
            resultList.add(anomalyData);
        }

        Cursor nextPageCursor = results.getCursorAfter();
        txn.commit();

        Map<String, Object> response = new HashMap<>();
        response.put("anomalies", resultList);
        response.put("cursor", nextPageCursor.toUrlSafe());

        return Response.ok(g.toJson(response)).build();
    }




    @Override
    public Response approveAnomaly(String tokenObjStr, String anomalyID) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }

        Key anomalyKey = KeyStore.anomalyKeyFactory(anomalyID);
        Transaction txn = datastore.newTransaction();
        try {
            Entity anomalyEntity = txn.get(anomalyKey);
            if (anomalyEntity == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            anomalyEntity = Entity.newBuilder(anomalyEntity)
                    .set("is_anomaly_approved", true)
                    .build();
            txn.update(anomalyEntity);
            txn.commit();

            LOG.info("Anomaly approved successfully: " + anomalyID);
            return Response.status(Response.Status.OK).entity("Anomaly approved successfully: " + anomalyID).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while approving anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response solveAnomaly(String tokenObjStr, String anomalyID) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }
        Key anomalyKey = KeyStore.anomalyKeyFactory(anomalyID);
        Transaction txn = datastore.newTransaction();
        try {
            Entity anomalyEntity = txn.get(anomalyKey);
            if (anomalyEntity == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            anomalyEntity = Entity.newBuilder(anomalyEntity)
                    .set("is_anomaly_solved", true)
                    .build();
            txn.update(anomalyEntity);
            txn.commit();

            LOG.info("Anomaly solved successfully: " + anomalyID);
            return Response.status(Response.Status.OK).entity("Anomaly solved successfully: " + anomalyID).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while solving anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }
    @Override
    public Response solveAllAnomalies(String tokenObjStr) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }

        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Anomaly")
                .setFilter(StructuredQuery.PropertyFilter.eq("is_anomaly_approved", false))
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no unapproved anomalies!").build();
        }

        while (results.hasNext()) {
            Entity anomalyEntity = results.next();
            anomalyEntity = Entity.newBuilder(anomalyEntity)
                    .set("is_anomaly_approved", true)
                    .build();
            datastore.update(anomalyEntity);
        }

        LOG.info("All anomalies approved successfully");
        return Response.status(Response.Status.OK).entity("All anomalies approved successfully").build();
    }


    @Override
    public Response listAllAnomalies(String tokenObjStr) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }
        Query<Entity> query = Query.newEntityQueryBuilder()
                .setKind("Anomaly")
                .build();

        QueryResults<Entity> results = datastore.run(query);
        if (!results.hasNext()) {
            return Response.status(Response.Status.NOT_FOUND).entity("There are no anomalies!").build();
        }

        List<List<String>> resultList = new ArrayList<>();
        while (results.hasNext()) {
            Entity entity = results.next();
            List<String> anomalyData = new ArrayList<>();
            anomalyData.add(entity.getString("anomaly_creator"));
            anomalyData.add(entity.getString("anomaly_description"));
            anomalyData.add(String.valueOf(entity.getBoolean("is_anomaly_solved")));
            anomalyData.add(entity.getString("anomaly_ID"));
            anomalyData.add(String.valueOf(entity.getLong("anomaly_creation_data")));

            resultList.add(anomalyData);
        }
        return Response.ok(g.toJson(resultList)).build();
    }

    @Override
    public Response deleteAnomaly(String tokenObjStr, String anomalyID) {
        Response r = verifyAdmin(tokenObjStr);
        if (r != null) {
            return r;
        }
        Key anomalyKey = KeyStore.anomalyKeyFactory(anomalyID);
        Transaction txn = datastore.newTransaction();
        try {
            Entity anomalyEntity = txn.get(anomalyKey);
            if (anomalyEntity == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            txn.delete(anomalyKey);
            txn.commit();

            LOG.info("Anomaly deleted successfully: " + anomalyID);
            return Response.status(Response.Status.OK).entity("Anomaly deleted successfully: " + anomalyID).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while deleting anomaly: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    private Response verifyAdmin(String tokenObjStr) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class);
        Key adminKey = KeyStore.userKeyFactory(tokenObj.getUsername());
        Entity user = datastore.get(adminKey);
        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Entity token = datastore.get(tokenKey);


        if (token == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        if(token.getLong("token_expirationdata") < System.currentTimeMillis()){
            return Response.status(Response.Status.FORBIDDEN).entity("data expirada").build();
        }
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(USER_DOESNT_EXIST).build();
        }

        int userRole = (int) user.getLong("user_role");

        if (userRole != 4) {
            return Response.status(Response.Status.FORBIDDEN).entity("User doesn't have permissions").build();
        }

        return null;
    }
}

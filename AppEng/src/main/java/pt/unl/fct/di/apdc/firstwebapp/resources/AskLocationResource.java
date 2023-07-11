package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.AskLocationAPI;
import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;
import pt.unl.fct.di.apdc.firstwebapp.util.Answer;
import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.Event;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Path("/aasklocation")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class AskLocationResource implements AskLocationAPI {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    private static final Logger LOG = Logger.getLogger(AskLocationResource.class.getName());
    private final Gson g = new Gson();

    public Response askLocation(String tokenObjStr, String username) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is asking for location!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Key userKey = KeyStore.userKeyFactory(username);


        Transaction txn = datastore.newTransaction();


        try {
            Entity user = txn.get(userKey);
            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }


            Key locationKey = KeyStore.askLocationKeyFactory(username);
            Entity locationEntity = txn.get(locationKey);

            Entity newLocationEntity;
            if (locationEntity != null) {
                newLocationEntity = Entity.newBuilder(locationEntity)
                        .set(tokenObj.getUsername(), tokenObj.getUsername())
                        .build();

            } else {
                newLocationEntity = Entity.newBuilder(locationKey)
                        .set(tokenObj.getUsername(), tokenObj.getUsername())
                        .build();

            }
            txn.put(newLocationEntity);
            txn.commit();

            LOG.info("ask location successfully");
            return Response.status(Response.Status.OK)
                    .build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while asking for location: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response anwserLocation(String tokenObjStr, String username, Answer answer) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to answer an asked location!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Key userKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        Transaction txn = datastore.newTransaction();


        try {


            Entity user = txn.get(userKey);

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }


            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Key locationKey = KeyStore.askLocationKeyFactory(tokenObj.getUsername());
            Entity askLocationEntity = txn.get(locationKey);


            if (askLocationEntity == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            Key answerKey = KeyStore.answerLocationKeyFactory(username);
            Entity answerLocationEntity = txn.get(answerKey);

            Entity newAskLocationEntity;
            if (answerLocationEntity != null) {
                newAskLocationEntity = Entity.newBuilder(answerLocationEntity)
                        .set(tokenObj.getUsername(), tokenObj.getUsername())
                        .set("location", answer.getAnswer())
                        .build();

            } else {
                newAskLocationEntity = Entity.newBuilder(answerKey)
                        .set(tokenObj.getUsername(), tokenObj.getUsername())
                        .set("location", answer.getAnswer())
                        .build();

            }


            txn.put(newAskLocationEntity);

            askLocationEntity = Entity.newBuilder(askLocationEntity).remove(tokenObj.getUsername())
                    .build();
            txn.put(askLocationEntity);




            txn.commit();

            LOG.info("answering an asked location successfully");
            return Response.status(Response.Status.OK)
                    .build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while answering an asked location: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response getAsk(String tokenObjStr, String username) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to get asked locations!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Key userKey = KeyStore.CalendarAccessKeyFactory(tokenObj.getUsername());


        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);
            Entity user = txn.get(userKey);

            if (!username.equals(tokenObj.getUsername()) && (user == null ||  user.getString(username) == null))
                return Response.status(Response.Status.FORBIDDEN).build();


            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Key locationKey = KeyStore.askLocationKeyFactory(username);
            Entity askLocationEntity = txn.get(locationKey);

            if (askLocationEntity == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }



            Map<String, Value<?>> pp = askLocationEntity.getProperties();

            List<Object> values = pp.values().stream()
                    .map(Value::get)
                    .collect(Collectors.toList());


            txn.commit();

            LOG.info("Get all events successfully");
            return Response.status(Response.Status.OK)
                    .entity(g.toJson(values)).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while getting event: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response getAnswer(String tokenObjStr, String username) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to get answered locations!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Key userKey = KeyStore.CalendarAccessKeyFactory(tokenObj.getUsername());


        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);
            Entity user = txn.get(userKey);

            if (!username.equals(tokenObj.getUsername()) && (user == null ||  user.getString(username) == null))
                return Response.status(Response.Status.FORBIDDEN).build();


            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Key locationKey = KeyStore.answerLocationKeyFactory(username);
            Entity askLocationEntity = txn.get(locationKey);

            if (askLocationEntity == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            Map<String, Object> properties = new HashMap<>();
            for (String propertyName : askLocationEntity.getNames()) {
                Value<?> value = askLocationEntity.getValue(propertyName);
                properties.put(propertyName, value.get());

            }

            txn.commit();

            LOG.info("Get all answered locations successfully");
            return Response.status(Response.Status.OK)
                    .entity(g.toJson(properties)).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while getting answerd locations: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response removeAsk(String tokenObjStr, String username) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to delete an asked location!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());
        Key userKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        Transaction txn = datastore.newTransaction();


        try {


            Entity user = txn.get(userKey);

            if (user == null) {
                txn.rollback();
                return Response.status(Response.Status.NOT_FOUND).build();
            }


            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Key locationKey = KeyStore.askLocationKeyFactory(username);
            Entity askLocationEntity = txn.get(locationKey);


            if (askLocationEntity == null) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }

            askLocationEntity = Entity.newBuilder(askLocationEntity).remove(tokenObj.getUsername())
                    .build();
            txn.put(askLocationEntity);




            txn.commit();

            LOG.info("Remove an asked location successfully");
            return Response.status(Response.Status.OK)
                    .build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while deleting asked location: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }
}

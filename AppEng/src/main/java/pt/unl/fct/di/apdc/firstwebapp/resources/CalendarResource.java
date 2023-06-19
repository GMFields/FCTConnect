package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.cloud.datastore.*;
import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.CalendarAPI;

import pt.unl.fct.di.apdc.firstwebapp.factory.KeyStore;

import pt.unl.fct.di.apdc.firstwebapp.util.AuthToken;
import pt.unl.fct.di.apdc.firstwebapp.util.EntityWithKey;
import pt.unl.fct.di.apdc.firstwebapp.util.Event;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;


@Path("/calendar")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class CalendarResource implements CalendarAPI {

    private final Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    private static final Logger LOG = Logger.getLogger(CalendarResource.class.getName());
    private final Gson g = new Gson();

    @Override
    public Response addEvent(String tokenObjStr, Event event) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to add an event!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());

        LOG.info("event_title: " + event.getTitle());
        LOG.info("event_description: " + event.getDescription());
        LOG.info("event_date: " + event.getDate());
        LOG.info("event_end_date: " + event.getEndDate());
        LOG.info("username: " + tokenObj.getUsername());


        if (event.getTitle().equals("")) {
            LOG.warning("Empty event!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }
            Event event1 = new Event(event.getTitle(), event.getDescription(), event.getDate(), event.getDuration());

            Key eventKey = KeyStore.calendarKeyFactory(event1.getEventID());

            LOG.info("id: " + event1.getEventID());

            Entity eventEntity = Entity.newBuilder(eventKey)
                    .set("event_title", event1.getTitle())
                    .set("event_description", event1.getDescription())
                    .set("event_date", event1.getDate())
                    .set("event_end_date", event1.getEndDate())
                    .set("username", tokenObj.getUsername())
                    .build();

            EntityWithKey<Entity> entityWithKey = new EntityWithKey<>(eventKey, eventEntity);
            txn.add(eventEntity);

            txn.commit();

            LOG.info("Event added successfully with ID: " + event1.getEventID());
            return Response.status(Response.Status.OK)
                    .entity(g.toJson(entityWithKey)).build();
        } catch (Exception e) {
            txn.rollback();
            LOG.severe("An error occurred while adding event: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        } finally {
            if (txn.isActive()) {
                txn.rollback();
            }
        }
    }

    @Override
    public Response removeEvent(String tokenObjStr, String eventID) {
        return null;
    }

    @Override
    public Response editEvent(String tokenObjStr, String eventID) {
        return null;
    }

    @Override
    public Response getEvent(String tokenObjStr, String eventID) {
        AuthToken tokenObj = g.fromJson(tokenObjStr, AuthToken.class); // Pode ser passado como TokenClass
        LOG.fine("User: " + tokenObj.getUsername() + " is attempting to add an event!");

        Key tokenKey = KeyStore.tokenKeyFactory(tokenObj.getTokenID());




        if (eventID.equals("")) {
            LOG.warning("Empty id!");
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        Transaction txn = datastore.newTransaction();

        try {
            Entity token = txn.get(tokenKey);

            if (token == null) {
                txn.rollback();
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            Key eventKey = KeyStore.calendarKeyFactory(eventID);

            Entity event = txn.get(eventKey);

            txn.commit();

            LOG.info("Event get successfully with ID: " + eventID);
            return Response.status(Response.Status.OK)
                    .entity(g.toJson(event)).build();
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
    public Response getEvents(String tokenObjStr) {
        return null;
    }
}
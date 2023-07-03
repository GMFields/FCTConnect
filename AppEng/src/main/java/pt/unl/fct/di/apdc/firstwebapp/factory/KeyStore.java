package pt.unl.fct.di.apdc.firstwebapp.factory;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.PathElement;

public class KeyStore {
    private final static Datastore datastore = DatastoreOptions.getDefaultInstance().getService();

    public KeyStore() {
    }

    public static Key userKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Users").newKey(keyString);
    }

    public static Key tokenKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Token").newKey(keyString);
    }

    public static Key anomalyKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Anomaly").newKey(keyString);
    }

    public static Key calendarKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Calendar").newKey(keyString);
    }

    public static Key emailKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Email").newKey(keyString);
    }

    public static Key mapKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Waypoint").newKey(keyString);
    }

    public static Key postKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("Post").newKey(keyString);
    }

    public static Key replyKeyFactory(String keyString, String parentId) {
        return datastore.newKeyFactory().addAncestor(PathElement.of("Post", parentId)).setKind("Reply")
                .newKey(keyString);
    }

    public static Key CalendarAccessKeyFactory(String keyString) {
        return datastore.newKeyFactory().setKind("CalendarAccess").newKey(keyString);
    }
}

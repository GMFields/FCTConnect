package pt.unl.fct.di.apdc.firstwebapp.factory;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Key;

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
}

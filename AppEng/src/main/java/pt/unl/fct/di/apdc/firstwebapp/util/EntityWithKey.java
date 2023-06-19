package pt.unl.fct.di.apdc.firstwebapp.util;
import com.google.cloud.datastore.*;
public class EntityWithKey<T> {
    private Key key;
    private T entity;

    public EntityWithKey(Key key, T entity) {
        this.key = key;
        this.entity = entity;
    }

    public Key getKey() {
        return key;
    }

    public T getEntity() {
        return entity;
    }
}
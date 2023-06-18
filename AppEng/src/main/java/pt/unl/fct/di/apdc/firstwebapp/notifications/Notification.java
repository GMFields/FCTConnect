package pt.unl.fct.di.apdc.firstwebapp.notifications;

import java.util.HashMap;
import java.util.Map;

public abstract class Notification {

    private String title, body;
    Map<String, String> notification;

    public Notification(String title, String body) {
        this.title = title;
        this.body = body;
        this.notification = new HashMap<>();
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return this.body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Map<String, String> getNotificationBody() {
        notification.put("title", getTitle());
        notification.put("body", getBody());

        return notification;
    }
}

package pt.unl.fct.di.apdc.firstwebapp.notifications;

import java.util.HashMap;
import java.util.Map;

public class ApnFormat extends Notification {

    Map<String, Map> alert;

    public ApnFormat(String title, String body) {
        super(title, body);
        alert = new HashMap<String, Map>();
    }

    public Map<String, Map> getApnNotification() {
        alert.put("alert", getNotificationBody());
        return alert;
    }
}

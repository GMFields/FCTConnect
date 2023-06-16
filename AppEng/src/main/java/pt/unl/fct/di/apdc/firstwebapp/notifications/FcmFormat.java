package pt.unl.fct.di.apdc.firstwebapp.notifications;

import java.util.HashMap;
import java.util.Map;

public class FcmFormat extends Notification {

    Map<String, Map> fcm;

    public FcmFormat(String title, String body) {
        super(title, body);
        fcm = new HashMap<String, Map>();
    }

    public Map<String, Map> getFcmNotification() {
        fcm.put("notification", getNotificationBody());
        return fcm;
    }
}

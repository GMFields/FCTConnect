package pt.unl.fct.di.apdc.firstwebapp.notifications;

import java.util.HashMap;
import java.util.Map;

public class WebFormat extends Notification {

    private Map<String, Map> web;

    private String icon, deep_link, focus;

    public WebFormat(String title, String body) {
        super(title, body);
        web = new HashMap<String, Map>();
    }

    public Map<String, Map> getWebNotification() {
        web.put("notification", getNotificationBody());
        return web;
    }

    public String getIcon() {
        return this.icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
        getNotificationBody().put("icon", icon);
    }

    public String getDeep_link() {
        return this.deep_link;
    }

    public void setDeep_link(String deep_link) {
        this.deep_link = deep_link;
        getNotificationBody().put("deep_link", deep_link);
    }

    public String getFocus() {
        return this.focus;
    }

    public void setFocus(String focus) {
        this.focus = focus;
        getNotificationBody().put("hide_notification_if_site_has_focus", focus);
    }

}

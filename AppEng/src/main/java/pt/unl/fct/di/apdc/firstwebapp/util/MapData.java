package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class MapData {

    private double latitude, longitude;
    private long creationData;
    private String name, wayPointID;

    public MapData() {
    }

    public MapData(double latitude, double longitude, String name) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.name = name;
        this.wayPointID = UUID.randomUUID().toString();
        this.creationData = System.currentTimeMillis();

    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public long getCreationData() {
        return creationData;
    }

    public String getName() {
        return name;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public void setCreationData(long creationData) {
        this.creationData = creationData;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWayPointID() {
        return this.wayPointID;
    }

    public void setWayPointIDID(String wayPointID) {
        this.wayPointID = wayPointID;
    }
}

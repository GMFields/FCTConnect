package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class MapData {
    
    private double latitude;
    
    private double longitude;

    private long creationData;

    private String name;

    private  String mapID;

    public MapData() {}

    public MapData(double latitude, double longitude, String name) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.creationData = System.currentTimeMillis();
        this.name = name;
        this.mapID = UUID.randomUUID().toString();
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

    public String getMapID() {
        return this.mapID;
    }

    public void setMapID(String mapID) {
        this.mapID = mapID;
    }
}

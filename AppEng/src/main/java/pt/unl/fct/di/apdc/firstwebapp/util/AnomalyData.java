package pt.unl.fct.di.apdc.firstwebapp.util;

import java.util.UUID;

public class AnomalyData {

    private String description, anomalyID, anomalyCreator;

    private long creationData;

    private boolean isSolved, isApproved;

    public AnomalyData() {
    }

    public AnomalyData(String description, String anomalyCreator) {
        this.anomalyCreator = anomalyCreator;
        this.description = description;
        this.anomalyID = UUID.randomUUID().toString();
        this.creationData = System.currentTimeMillis();
        this.isSolved = false;
        this.isApproved = false;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAnomalyID() {
        return anomalyID;
    }

    public void setAnomalyID(String anomalyID) {
        this.anomalyID = anomalyID;
    }

    public String getAnomalyCreator() {
        return anomalyCreator;
    }

    public void setAnomalyCreator(String anomalyCreator) {
        this.anomalyCreator = anomalyCreator;
    }

    public long getCreationData() {
        return creationData;
    }

    public void setCreationData(long creationData) {
        this.creationData = creationData;
    }

    public boolean isSolved() {
        return isSolved;
    }

    public void setSolved(boolean solved) {
        isSolved = solved;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }
}

package pt.unl.fct.di.apdc.firstwebapp.util;


import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

import java.util.UUID;

public class Event {
    private String title;
    private String date;
    private long duration;
    private String description;

    private String eventID;

    private static String dateFormat = "yyyy-MM-dd'T'HH:mm:ssXXX";
    private static DateTimeFormatter formatter = DateTimeFormatter.ofPattern(dateFormat);








    public Event(){
    }

    public Event(String title, String description, String date, long duration){
        this.title = title;
        this.description = description;
        this.date = date;
        this.duration = duration;
        this.eventID = UUID.randomUUID().toString();
    }

    public Event(String title, String description, String date, long duration, String eventID){
        this.title = title;
        this.description = description;
        this.date = date;
        this.duration = duration;
        this.eventID = eventID;
        System.out.println();
    }



    public String getTitle(){
        return this.title;
    }

    public String getDate(){
        return this.date;
    }

    public long getDuration(){
        return this.duration;
    }

    public String getEndDate() {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(date, formatter);
        OffsetDateTime updatedEndDate = offsetDateTime.plusNanos(duration * 1_000_000);
        return updatedEndDate.format(formatter);
    }

    public String getDescription(){
        return this.description;
    }

    public String getEventID() {
        return this.eventID;
    }
}
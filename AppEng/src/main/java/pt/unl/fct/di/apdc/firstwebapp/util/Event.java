package pt.unl.fct.di.apdc.firstwebapp.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

public class Event {
    private String title;
    private String date;
    private long duration;
    private String description;

    private String eventID;

    private String dateFormat = "yyyy-MM-dd'T'HH:mm:ssXXX";



    DateFormat formatter = new SimpleDateFormat(dateFormat);

    public Event(){
    }

    public Event(String title, String description, String date, long duration){
        this.title = title;
        this.description = description;
        this.date = date;
        this.duration = duration;
        this.eventID = UUID.randomUUID().toString();
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
        Date enddate = null;
        try {
            enddate = formatter.parse(date);
        } catch (ParseException e) {
            // Handle the parsing exception
        }
        Date calendar = new Date(enddate.getTime() + duration);
        Date updatedEndDate = calendar;
        String formattedEndDate = formatter.format(updatedEndDate);
        return formattedEndDate;
    }

    public String getDescription(){
        return this.description;
    }

    public String getEventID() {
        return this.eventID;
    }
}
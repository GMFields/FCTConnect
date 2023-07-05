package pt.unl.fct.di.apdc.firstwebapp.api;


import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.resources.UserResource;

import javax.ws.rs.GET;
import javax.ws.rs.core.Response;
import java.util.logging.Logger;

public interface EmailAPI {

    @GET
    Response parseEmails();

}

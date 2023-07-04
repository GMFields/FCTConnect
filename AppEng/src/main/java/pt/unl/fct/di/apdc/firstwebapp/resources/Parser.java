package pt.unl.fct.di.apdc.firstwebapp.resources;

import com.google.gson.Gson;
import pt.unl.fct.di.apdc.firstwebapp.api.EmailAPI;
import pt.unl.fct.di.apdc.firstwebapp.util.EmailParser;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.logging.Logger;

@Path("/parser")
@Produces(MediaType.APPLICATION_JSON + ";charset=utf-8")
public class Parser implements EmailAPI {

    public Parser() {}

    private final Gson g = new Gson();

    private static final Logger LOG = Logger.getLogger(Parser.class.getName());


    @Override
    public Response parseEmails() {
        EmailParser emailParser = new EmailParser();

        LOG.info("não deu buracada");

        List<String> parsedEmails = emailParser.parseEmails();

        LOG.info("ja deu");

        return Response.ok(g.toJson(parsedEmails)).build();


    }
}
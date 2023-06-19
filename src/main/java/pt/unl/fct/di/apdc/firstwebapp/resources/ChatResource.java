package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.Collections;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.pusher.rest.Pusher;

@Path("/chat")
public class ChatResource {
    Pusher pusher = new Pusher("1606850", "863de6ade90e73639f5e", "ff606b79d556ed99f074");

    public ChatResource() {
        pusher.setCluster("eu");
        pusher.setEncrypted(true);
    }

    public void random() {
        pusher.trigger("my-channel", "client-my-event", Collections.singletonMap("message", "hello world"));
    }

    @POST
    @Path("/auth")
    public Response authenticateConnection(String socketId, String channel) {
        String auth = pusher.authenticate(socketId, channel);

        return Response.ok(auth).build();
    }
}
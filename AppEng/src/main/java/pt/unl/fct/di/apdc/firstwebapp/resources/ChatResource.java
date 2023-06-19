package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.Collections;
import java.util.Map;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.pusher.rest.Pusher;

import pt.unl.fct.di.apdc.firstwebapp.api.ChatApi;

@Path("/chat")
public class ChatResource implements ChatApi {

    private final Pusher pusher = new Pusher("1606850", "863de6ade90e73639f5e", "ff606b79d556ed99f074");

    public ChatResource() {
        pusher.setCluster("eu");
        pusher.setEncrypted(true);
    }

    @Override
    public Response sendSyncMsg() { // Only the body of the method, needs work
        Map<String, String> message = Collections.singletonMap("message", "message content");
        pusher.trigger("server-channel", "main", message);

        return Response.ok().entity(message).build();
    }

    @Override
    public Response authenticateConnection(String socketId, String channel) {
        String auth = pusher.authenticate(socketId, channel);

        return Response.ok(auth).build();
    }

}

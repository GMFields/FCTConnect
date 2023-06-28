package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.inject.Singleton;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.pusher.rest.Pusher;

import pt.unl.fct.di.apdc.firstwebapp.api.ChatApi;

@Singleton
@Path("/chat")
public class ChatResource implements ChatApi {

    private final Pusher pusher = new Pusher("1606850", "863de6ade90e73639f5e", "ff606b79d556ed99f074");
    List<String> onlineUsers;

    public ChatResource() {
        pusher.setCluster("eu");
        pusher.setEncrypted(true);
        onlineUsers = new LinkedList<>();
    }

    @Override
    public Response sendSyncMsg() { // Only the body of the method, needs work
        Map<String, String> message = Collections.singletonMap("message", "message content");
        pusher.trigger("server-channel", "main", message);

        return Response.ok().build();
    }

    public void onlineUser(String name) {
        onlineUsers.add(name);
    }

    public Response getOnlineUsers() {
        if (onlineUsers.isEmpty())
            return Response.status(Status.NO_CONTENT).build();

        return Response.ok().entity(onlineUsers).build();
    }

    @Override
    public Response authenticateConnection(String socket_id, String channel) {
        String auth = pusher.authenticate(socket_id, channel);

        return Response.ok(auth).build();
    }

}

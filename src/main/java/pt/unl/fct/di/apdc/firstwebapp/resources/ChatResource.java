package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.Collections;

import com.pusher.rest.Pusher;

public class ChatResource {
    public static void main(String[] args) {
        Pusher pusher = new Pusher("1606850", "863de6ade90e73639f5e", "ff606b79d556ed99f074");
        pusher.setCluster("eu");
        pusher.setEncrypted(true);

        pusher.trigger("my-channel", "client-my-event", Collections.singletonMap("message", "hello world"));
    }
}
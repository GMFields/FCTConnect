package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.TopicManagementResponse;

import pt.unl.fct.di.apdc.firstwebapp.api.FirebaseAPI;

//SEE: @GMFields https://firebase.google.com/docs/cloud-messaging/send-message?hl=pt-br#java
@Path("/firebase")
public class FirebaseResource implements FirebaseAPI {

    FirebaseApp instance = initiateApp();

    private FirebaseApp initiateApp() {
        if (!FirebaseApp.getApps().isEmpty())
            return FirebaseApp.getInstance();

        // TODO @GMFields mudar a conta no firebase

        FileInputStream serviceAccount;
        try {
            serviceAccount = new FileInputStream("discipulosamd-firebase-adminsdk-cpxm5-28c80ef78e.json");
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

        FirebaseOptions options;
        try {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            return null;
        }

        return FirebaseApp.initializeApp(options);
    }

    @Override
    public void singleTargetMessage() {
        // This registration token comes from the client FCM SDKs.
        String registrationToken = "YOUR_REGISTRATION_TOKEN";

        // See documentation on defining a message payload.
        Message message = Message.builder()
                .putData("score", "850")
                .putData("time", "2:45")
                .setToken(registrationToken)
                .build();

        // Send a message to the device corresponding to the provided
        // registration token.
        String response;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return;
        }

        // Response is a message ID string.
        System.out.println("Successfully sent message: " + response);
    }

    @Override
    public void multipleTargetMessage() {

        // Create a list containing up to 500 registration tokens.
        // These registration tokens come from the client FCM SDKs.
        List<String> registrationTokens = Arrays.asList(
                "YOUR_REGISTRATION_TOKEN_1",
                // ...
                "YOUR_REGISTRATION_TOKEN_n");

        MulticastMessage message = MulticastMessage.builder()
                .putData("score", "850")
                .putData("time", "2:45")
                .addAllTokens(registrationTokens)
                .build();

        BatchResponse response;
        try {
            response = FirebaseMessaging.getInstance().sendMulticast(message);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return;
        }
        // See the BatchResponse reference documentation
        // for the contents of response.
        System.out.println(response.getSuccessCount() + " messages were sent successfully");
    }

    @Override
    public Response topicTargetMessage() {

        // The topic name can be optionally prefixed with "/topics/".
        String topic = "fct";

        // See documentation on defining a message payload.
        Message message = Message.builder()
                .putData("score", "850")
                .putData("time", "2:45")
                .setTopic(topic)
                .build();

        // Send a message to the devices subscribed to the provided topic.
        String response;
        try {
            response = FirebaseMessaging.getInstance().send(message);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
        // Response is a message ID string.
        System.out.println("Successfully sent message: " + response);
        return Response.ok().build();
    }

    @Override
    public Response subscribeToTopic(String token, String topic) {
        // These registration tokens come from the client FCM SDKs.
        List<String> registrationTokens = Arrays.asList(token);

        // Subscribe the devices corresponding to the registration tokens to the
        // topic.
        TopicManagementResponse response;
        try {
            response = FirebaseMessaging.getInstance().subscribeToTopic(registrationTokens, topic);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
        // See the TopicManagementResponse reference documentation
        // for the contents of response.
        System.out.println(response.getSuccessCount() + " tokens were subscribed successfully");
        return Response.ok().build();
    }

    @Override
    public Response unsubscribeToTopic(String token, String topic) {
        // These registration tokens come from the client FCM SDKs.
        List<String> registrationTokens = Arrays.asList(token);

        // Unsubscribe the devices corresponding to the registration tokens from
        // the topic.
        TopicManagementResponse response;
        try {
            response = FirebaseMessaging.getInstance().unsubscribeFromTopic(registrationTokens, topic);
        } catch (FirebaseMessagingException e) {
            e.printStackTrace();
            return Response.status(Status.INTERNAL_SERVER_ERROR).build();
        }
        // See the TopicManagementResponse reference documentation
        // for the contents of response.
        System.out.println(response.getSuccessCount() + " tokens were unsubscribed successfully");
        return Response.ok().build();
    }
}

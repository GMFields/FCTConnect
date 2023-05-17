package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.MulticastMessage;

//SEE: @GMFields https://firebase.google.com/docs/cloud-messaging/send-message?hl=pt-br#java
public class FirebaseResource {

    private void initiateApp(){
        FileInputStream serviceAccount;
        try {
            serviceAccount = new FileInputStream("./discipulosamd-firebase-adminsdk-cpxm5-1227d61c6a.json");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return;
        }

        FirebaseOptions options;
        try {
            options = new FirebaseOptions.Builder().setCredentials(GoogleCredentials.fromStream(serviceAccount)).build();
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }
        
        FirebaseApp.initializeApp(options);
    }

    public void singleTargetMessage(){
        initiateApp();

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

    public void multipleTargetMessage(){
        initiateApp();

        // Create a list containing up to 500 registration tokens.
        // These registration tokens come from the client FCM SDKs.
        List<String> registrationTokens = Arrays.asList(
            "YOUR_REGISTRATION_TOKEN_1",
            // ...
            "YOUR_REGISTRATION_TOKEN_n"
        );

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

    public void topicTargetMessage(){
        initiateApp();

        // The topic name can be optionally prefixed with "/topics/".
        String topic = "highScores";

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
            return;
        }
        // Response is a message ID string.
        System.out.println("Successfully sent message: " + response);
    }
}

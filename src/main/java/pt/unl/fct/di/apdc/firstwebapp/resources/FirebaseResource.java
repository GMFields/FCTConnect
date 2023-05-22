package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.io.ByteArrayInputStream;
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
        if(!FirebaseApp.getApps().isEmpty())
            return FirebaseApp.getInstance();

        //TODO @GMFields mudar a conta no firebase
        String adminSDKJson = "{\"type\":\"service_account\",\"project_id\":\"discipulosamd\",\"private_key_id\":\"1227d61c6a27a4aebce3ce4a15b6694fef784a0a\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDbEvK/9Xdwr/mt\\nlL2aD5KSsp6s8UEKilhCxe+S/1jVNWsCb+OKc2OLvTsy/9Gmp1zKhBZFLMVN/zqO\\nVC1KQLZ9z1k0x21QDHSrdzl0Km0lBisuotEaJeC4b5pCMGV369MmoRpS3tlJl1pQ\\n5Z+jl3fOoNaXemVEoL0olu+m5Db579xur98wVHtVTPftzxUGOjdwB/KdHjKKnKXw\\nZNCjNyJQqVKwt7k3RLWmm/pFhAlhoGTxJNPYX8uYYxpg6C7h5jxyEXXu53B8SW6L\\nCBZVWmP1bJGkJgN84ORcfvjT/u+woYwcZjHiedW8JPiZBKcWY47qRFVr6paC5qcR\\nhGoenEX1AgMBAAECggEAUowwwSkmwOTmMURvLxp4EePRS3w6lFStzjdUPzENUYVn\\n1YrAk/5Hv7Nll6FyZ5f/rGWaGKW2kN2/vDq2uBhrSzuysuMEaxnOan+pu/5ykvVg\\nlxmNrgsgwo5280LWMRpAvXkN+LT07jhkNUBY52UfJVJQmdJqTzI8JIu/MMUkfAd1\\ngV4q7RUS2L8qzMZ5k96d05La7lVzYUtdXUQR+rmlKQBTuZIZRJi7QVRnoQ0+ma45\\n1ZECqFr4NfsEwrRDsJ2t7VZM3xMvj9iLkewOdhOknKWLJl50Dihl8KqdAA0EEMZG\\nG3I1Dm64O8bBT70QrXRY0HiQbGSTBy2P143qKEtM/wKBgQD36DcgLf0lFkrToARg\\nJMpxm0eUoQutocAGZYQ6DII/NS7loOFJBwmBC/fybQ/jY4qqw9FiiPsMmuAArDVq\\n1Q8DpNMTacJf2lVn38jHEFxn0mMM9slAhpZD1ymDx4AT3znOPgPOjQEdKVgkZQRs\\nhWrW0egJBVi3H5+eImMeKxScHwKBgQDiOcWgqHjvoNKyvh9Q1VjYRs8Xy4q9RqGO\\nsf3QhmdYdjpwxjHP1FH+NEtFhHGE1TdOBgxXJWGZXWwZdGoMwhPbLMUyORge6ZNU\\n6r9BpXP4qTjNhQOf2/3hqMGXIKiX/bAsxjtc1R+/SoS/nBq4wSfX4EiCcU9Jye6/\\nMdeZBoBbawKBgDbUjnS4lze/sXcS+kTFfl0YKgHOiMWzc8Q2acNpBtmyCphRN+Ku\\nAsUe/40H4C670myoeMQhZd1I1+huLjZdvz9gEitGBe6rXJ5n2YFltfpkhvHUF3kF\\nC3EfwpfZ5RMAGUnrX24ss6VegpcyHINgEtxGetqb6x49iVExa9i9UIajAoGACjGC\\nNygAMwPzGny4moLSewRNxou0V6z8EJryjdfQhkrlfTlg+zVc8HBYx+wc1VhqIojh\\nO3gCus9b1JXLRYHlNSYCSK4L6TCrI9NkBMg4voaZeaE5tZVLDkT1XCLrldWnf4z7\\nFcbApHTuIFgfWB3T9sUzXzVN1kxUBqdvSITjebsCgYBLW9VoP/PFvZtIweV2kUz3\\nocHUo/ttUisXXqDvGhEH7oZvBqXyS//BeoIv0QRSUgVCqMSKosfYAkaKTcH7pPRy\\nW1Xtzzz2Dbc8dLe/rS3zM1PP/lvpkNIYqgTMRKNDqtmVUruQdZHSHCHi9Tfi1ayg\\nnE5UclMSbZX0jFTz278fOg==\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"firebase-adminsdk-cpxm5@discipulosamd.iam.gserviceaccount.com\",\"client_id\":\"105400094402048769478\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cpxm5%40discipulosamd.iam.gserviceaccount.com\",\"universe_domain\":\"googleapis.com\"}";  
    
        ByteArrayInputStream serviceAccountStream = new ByteArrayInputStream(adminSDKJson.getBytes());
    
        FirebaseOptions options;
        try {
            options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccountStream))
                    .build();
        } catch (IOException e) {
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

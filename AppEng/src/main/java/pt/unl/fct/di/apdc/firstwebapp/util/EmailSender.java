package pt.unl.fct.di.apdc.firstwebapp.util;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;

public class EmailSender {

    private final String MAILJET_API_KEY = "9618a0d57d3132e7531937792f774415";
    private final String MAILJET_SECRET_KEY = "5512f8165aeb37bd4202876185b2db36";

    private static EmailSender instance;

    MailjetClient client;

    public final static EmailSender getInstance() {
        if(instance == null)
            instance = new EmailSender();

        return instance;
    }

    private EmailSender() {
        ClientOptions options = ClientOptions.builder()
                .apiKey(MAILJET_API_KEY)
                .apiSecretKey(MAILJET_SECRET_KEY)
                .build();

        client = new MailjetClient(options);
    }

    private boolean sendEmail(String subject, String body) {
        try {
            TransactionalEmail message = TransactionalEmail
                    .builder()
                    .to(new SendContact("ane.nunes@gmail.com", null))
                    .from(new SendContact("afonsonunes19@gmail.com", "afonso"))
                    .subject(subject)
                    .textPart(body)
                    .build();

            SendEmailsRequest request = SendEmailsRequest
                    .builder()
                    .message(message)
                    .build();

            request.sendWith(client);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean welcomeMail(String userEmail) {
        String body = "Bem vindo à plataforma";

        return sendEmail("Welcome", body);
    }


}
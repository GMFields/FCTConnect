package pt.unl.fct.di.apdc.firstwebapp.util;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.transactional.SendContact;
import com.mailjet.client.transactional.SendEmailsRequest;
import com.mailjet.client.transactional.TransactionalEmail;

public class EmailUtils {

    private final String MAILJET_API_KEY = "9618a0d57d3132e7531937792f774415";
    private final String MAILJET_SECRET_KEY = "5512f8165aeb37bd4202876185b2db36";

    private final String SENDER_EMAIL = "afonsonunes19@gmail.com";
    private final String SENDER_NAME = "Afonso";

    private final String ACCOUNT_ACTIVATION_EMAIL_SUBJECT = "Activate your account";

    private final String USER_ACCOUNT_ACTIVATION_BODY_FMT = "Hello,\n\nYou have successfully created your FCTFocus account.\n\n"
            + "To activate it, click the following link: %s";

    private final String ADMIN_ACCOUNT_ACTIVATION_BODY_FMT = "Hello,\n\nAn administrator account has been assigned to this email.\n\n"
            + "The account's password is %s. It can be changed in the account's settings once logged in.\n\n"
            + "To activate the account, click the following link: %s";

    private static EmailUtils instance;

    MailjetClient client;

    public final static EmailUtils getInstance() {
        if(instance == null)
            instance = new EmailUtils();

        return instance;
    }

    private EmailUtils() {
        ClientOptions options = ClientOptions.builder()
                .apiKey(MAILJET_API_KEY)
                .apiSecretKey(MAILJET_SECRET_KEY)
                .build();

        client = new MailjetClient(options);
    }

    private boolean sendEmail(String recipientEmail, String recipientName, String subject, String body) {
        try {
            TransactionalEmail message = TransactionalEmail
                    .builder()
                    .to(new SendContact(recipientEmail, null))
                    .from(new SendContact(SENDER_EMAIL, SENDER_NAME))
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

    public boolean sendUserAccountActivationEmail(String userEmail, String activationCode) {
        String body = String.format(USER_ACCOUNT_ACTIVATION_BODY_FMT, activationCode);

        return sendEmail(userEmail, null, ACCOUNT_ACTIVATION_EMAIL_SUBJECT, body);
    }

    public boolean sendAdminAccountActivationEmail(String adminEmail, String password, String activationCode) {
        String body = String.format(ADMIN_ACCOUNT_ACTIVATION_BODY_FMT, password, activationCode);

        return sendEmail(adminEmail, null, ACCOUNT_ACTIVATION_EMAIL_SUBJECT, body);
    }

}
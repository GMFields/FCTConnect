package pt.unl.fct.di.apdc.firstwebapp.util;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;

import java.io.IOException;

public class EmailSender {

    private static final String SENDGRID_API_KEY = "SENDGRID_API_KEY";
    private static final String ACCOUNT_ACTIVATION_MESSAGE = "Bem vindo à EduVersity. Por favor ativa a tua conta clicando no link: ";
    private static final String DOCENTE_WELCOME_MESSAGE = "Bem vindo à EduVersity. Por favor contacte um admnistrador para se autenticar e ativar a sua conta ";
    private static final String RESET_MESSAGE = "Parece que recebemos um pedido para recuperar a tua password. Se não foste tu ignora este e-mail, caso contrário clica no link: ";
    private static final String NEW_PASSWORD_MESSAGE = "A tua palavra passe foi alterada com sucesso. \n A tua nova password é: ";
    private static final String NEW_PASSWORD_MESSAGE2 = "\nPor favor para mais segurança, muda a password assim que entrares.";
    private static final String FROM_EMAIL = "amddiscipulos@gmail.com";
    private static final String SUBJECT = "Ativação da conta";
    private static final String SUBJECT_ONE = "Recuperação de passowrd";

    private static EmailSender instance;

    private EmailSender() {
    }

    public static EmailSender getInstance() {
        if (instance == null)
            instance = new EmailSender();

        return instance;
    }

    public void sendActivationEmail(String toEmail, String activationToken) throws IOException {
        String activationLink = "https://helical-ascent-385614.oa.r.appspot.com/rest/users/activate?activationToken="
                + activationToken;
        String emailBody = ACCOUNT_ACTIVATION_MESSAGE + activationLink;
        sendEmail(FROM_EMAIL, toEmail, SUBJECT, emailBody);
    }

    public void sendDocenteWelcomeEmail(String toEmail) throws IOException {
        String emailBody = DOCENTE_WELCOME_MESSAGE;
        sendEmail(FROM_EMAIL, toEmail, SUBJECT, emailBody);

    }

    public void sendResetPasswordEmail(String toEmail, String resetToken) throws IOException {
        String resetLink = "https://helical-ascent-385614.oa.r.appspot.com/rest/users/reset?resetToken=" + resetToken;
        String emailBody = RESET_MESSAGE + resetLink;
        sendEmail(FROM_EMAIL, toEmail, SUBJECT_ONE, emailBody);
    }

    public void sendResetPasswordConfirmationEmail(String toEmail, String newPassword) throws IOException {
        String emailBody = NEW_PASSWORD_MESSAGE + newPassword + NEW_PASSWORD_MESSAGE2;
        sendEmail(FROM_EMAIL, toEmail, SUBJECT_ONE, emailBody);

    }

    public void sendEmail(String fromEmail, String toEmail, String subject, String body) throws IOException {
        Email from = new Email(fromEmail);
        Email to = new Email(toEmail);
        Content content = new Content("text/plain", body);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sg = new SendGrid(SENDGRID_API_KEY);
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sg.api(request);
            System.out.println(response.getStatusCode());
            System.out.println(response.getBody());
            System.out.println(response.getHeaders());
        } catch (IOException ex) {
            throw ex;
        }
    }
}

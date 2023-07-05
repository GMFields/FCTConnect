package pt.unl.fct.di.apdc.firstwebapp.util;



import javax.mail.*;
import javax.mail.internet.MimeMultipart;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

public class EmailParser {
    String username = "ane.nunes@campus.fct.unl.pt";
    String password = "bgbpoqgtshyhplfj";

    private static final Logger LOG = Logger.getLogger(EmailParser.class.getName());


    public EmailParser() {

    }

    public List<String> parseEmails() {
        List<String> emailContents = new ArrayList<>();

        Properties props = new Properties();
        LOG.info("1");
        props.put("mail.store.protocol", "imaps");
        try {
            LOG.info("2");
            Session session = Session.getDefaultInstance(props, null);
            Store store = session.getStore();
            LOG.info("STORE  ANTES"+store);
            LOG.info("3");
            store.connect("imap.gmail.com", username, password);
            LOG.info("4");
            LOG.info("STORE DEPOIS"+store);
            Folder inbox = store.getFolder("INBOX");
            LOG.info("5");
            inbox.open(Folder.READ_ONLY);
            LOG.info("6");
            Message[] messages = inbox.getMessages();
            LOG.info("7");
            int counter = 0;
            LOG.info("8");
            for (int i = messages.length - 1; i >= 0; i--) {
                Message message = messages[i];
                LOG.info("MESSAGE ->"+message);
                LOG.info("SUBJECT ->"+message.getSubject());
                LOG.info("CONTENT -> "+message.getContent());
                LOG.info("CONTENT TYPE DO  DA MESSAGE"+message.getContentType());
                String subject = message.getSubject();
                LOG.info("9");
                LOG.info("subject dA MESSAGE->"+subject);
                if (subject != null && subject.contains(" Hoje na FCT") && counter < 5) {
                    // Parse the message content
                    LOG.info("ENTROU NO CICLE");
                    String contentType = message.getContentType();
                    LOG.info("CONTENT TYPE DO CICLE"+contentType);

                    if (contentType.contains("TEXT/PLAIN") || contentType.contains("text/html") || contentType.contains("multipart/RELATED") || contentType.contains("multipart/ALTERNATIVE")) {
                        Object content = message.getContent();
                        LOG.info("CONTENT TYPE DO if "+content);
                        if (content instanceof String) {
                            String messageContent = (String) content;
                            emailContents.add(messageContent);
                        } else if (content instanceof MimeMultipart) {
                            MimeMultipart multipart = (MimeMultipart) content;
                            String messageContent = getTextFromMimeMultipart(multipart);
                            emailContents.add(messageContent);
                        }
                    }
                    LOG.info("CONTENT TYPE"+contentType);
                    System.out.println("CONTENT TYPE ->" + contentType);

                    counter++;
                    LOG.info("10");
                }
                if (counter >= 5) {
                    break;
                }
            }
            LOG.info("11");
            // Close the connection
            inbox.close(false);
            LOG.info("12");
            store.close();
            LOG.info("13");
        } catch (Exception e) {
            e.printStackTrace();
        }

        return emailContents;
    }


    private String getTextFromMimeMultipart(MimeMultipart mimeMultipart) throws Exception {
        StringBuilder result = new StringBuilder();
        int count = mimeMultipart.getCount();
        for (int i = 0; i < count; i++) {
            BodyPart bodyPart = mimeMultipart.getBodyPart(i);
            if (bodyPart.isMimeType("text/plain") || bodyPart.isMimeType("text/html")) {
                String content = (String) bodyPart.getContent();
                result.append(content);
            } else if (bodyPart.getContent() instanceof MimeMultipart) {
                result.append(getTextFromMimeMultipart((MimeMultipart) bodyPart.getContent()));
            }
        }
        return result.toString();
    }
}
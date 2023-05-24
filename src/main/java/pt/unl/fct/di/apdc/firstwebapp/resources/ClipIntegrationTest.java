package pt.unl.fct.di.apdc.firstwebapp.resources;

import java.util.concurrent.TimeUnit;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

@Path("/clip")
public class ClipIntegrationTest {
    private static WebDriver driver;
    // private final static String FCT_CODE = "97747";

    @GET
    @Path("/title")
    public Response getClipTitle() {
        System.setProperty("webdriver.chrome.driver",
                "drivers/chromedriver.exe");

        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS);

        // Open the web app
        driver.navigate().to(
                "https://clip.fct.unl.pt/utente/eu/aluno/ano_lectivo/hor%E1rio?ano_lectivo=2023&institui%E7%E3o=97747&aluno=106373&tipo_de_per%EDodo_lectivo=s&per%EDodo_lectivo=2");
        // driver.manage().window().maximize();
        String title = driver.getTitle();

        Authenticate();
        return Response.ok(title).build();
    }

    private void Authenticate() {
        WebElement usernameInput = driver.findElement(By.name("identificador"));
        WebElement passwordInput = driver.findElement(By.name("senha"));
        WebElement loginButton = driver.findElement(By.className("button"));

        usernameInput.sendKeys("gm.campos");
        passwordInput.sendKeys("#Ferrari8215900");
        loginButton.click();
    }
}

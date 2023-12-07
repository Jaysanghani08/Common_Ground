// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class LoginStudentTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void loginStudent() {
    driver.get("https://potential-eureka-pxr75pp55pxf7pg7-3000.app.github.dev/");
    driver.manage().window().setSize(new Dimension(1552, 840));
    driver.findElement(By.cssSelector(".caret")).click();
    driver.findElement(By.linkText("Student Login")).click();
    driver.findElement(By.name("email")).click();
    driver.findElement(By.name("email")).sendKeys("jahnvi.verma1220@gmail.com");
    driver.findElement(By.name("password")).click();
    driver.findElement(By.name("password")).sendKeys("169773@Jv");
    driver.findElement(By.name("password")).sendKeys(Keys.ENTER);
    {
      WebElement element = driver.findElement(By.cssSelector(".studentlogin_btn__DxLYW"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    driver.close();
  }
}

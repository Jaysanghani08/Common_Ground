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
public class EditProfileTest {
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
  public void editProfile() {
    // Test name: Edit Profile
    // Step # | name | target | value
    // 1 | open | https://potential-eureka-pxr75pp55pxf7pg7-3001.app.github.dev/ | 
    driver.get("https://potential-eureka-pxr75pp55pxf7pg7-3001.app.github.dev/");
    // 2 | setWindowSize | 1228x824 | 
    driver.manage().window().setSize(new Dimension(1228, 824));
    // 3 | click | css=.dropdown-toggle | 
    driver.findElement(By.cssSelector(".dropdown-toggle")).click();
    // 4 | click | linkText=Student Login | 
    driver.findElement(By.linkText("Student Login")).click();
    // 5 | click | css=li:nth-child(4) > .page-scroll | 
    driver.findElement(By.cssSelector("li:nth-child(4) > .page-scroll")).click();
    // 6 | click | linkText=Edit Profile | 
    driver.findElement(By.linkText("Edit Profile")).click();
    // 7 | click | name=interests | 
    driver.findElement(By.name("interests")).click();
    // 8 | click | css=.spn-submit-button | 
    driver.findElement(By.cssSelector(".spn-submit-button")).click();
    // 9 | close |  | 
    driver.close();
  }
}

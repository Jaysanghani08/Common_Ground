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
public class LoginEducatorTest {
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
  public void loginEducator() {
    // Test name: Login (Educator)
    // Step # | name | target | value
    // 1 | open | / | 
    driver.get("http://localhost:3000/homepage/");
    // 2 | setWindowSize | 1228x824 | 
    driver.manage().window().setSize(new Dimension(1228, 824));
    // 3 | click | css=.dropdown-toggle | 
    driver.findElement(By.cssSelector(".dropdown-toggle")).click();
    // 4 | click | linkText=Educator Login | 
    driver.findElement(By.linkText("Educator Login")).click();
    // 5 | click | name=email | 
    driver.findElement(By.name("email")).click();
    // 6 | type | name=email | 202101200@daiict.ac.in
    driver.findElement(By.name("email")).sendKeys("202101200@daiict.ac.in");
    // 7 | click | name=password | 
    driver.findElement(By.name("password")).click();
    // 8 | type | name=password | palakvaria@27
    driver.findElement(By.name("password")).sendKeys("palakvaria@27");
    // 9 | click | css=.studentlogin_btn__DxLYW | 
    driver.findElement(By.cssSelector(".studentlogin_btn__DxLYW")).click();
    // 10 | close |  | 
    driver.close();
  }
}

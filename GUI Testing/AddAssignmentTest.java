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
public class AddAssignmentTest {
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
  public void addAssignment() {
    // Test name: Add Assignment
    // Step # | name | target | value
    // 1 | open | http://localhost:3000/homepage | 
    driver.get("http://localhost:3000/homepage");
    // 2 | setWindowSize | 1552x840 | 
    driver.manage().window().setSize(new Dimension(1552, 840));
    // 3 | click | css=.dropdown-toggle | 
    driver.findElement(By.cssSelector(".dropdown-toggle")).click();
    // 4 | click | linkText=Educator Login | 
    driver.findElement(By.linkText("Educator Login")).click();
    // 5 | click | name=email | 
    driver.findElement(By.name("email")).click();
    // 6 | type | name=email | dhyey@gmail.com
    driver.findElement(By.name("email")).sendKeys("dhyey@gmail.com");
    // 7 | click | name=password | 
    driver.findElement(By.name("password")).click();
    // 8 | type | name=password | 123456@DB
    driver.findElement(By.name("password")).sendKeys("123456@DB");
    // 9 | sendKeys | name=password | ${KEY_ENTER}
    driver.findElement(By.name("password")).sendKeys(Keys.ENTER);
    // 10 | mouseOver | css=.studentlogin_btn__VnjUF | 
    {
      WebElement element = driver.findElement(By.cssSelector(".studentlogin_btn__VnjUF"));
      Actions builder = new Actions(driver);
      builder.moveToElement(element).perform();
    }
    // 11 | click | css=li:nth-child(2) > .page-scroll | 
    driver.findElement(By.cssSelector("li:nth-child(2) > .page-scroll")).click();
    // 12 | click | linkText=View Course | 
    driver.findElement(By.linkText("View Course")).click();
    // 13 | click | id=simple-tab-1 | 
    driver.findElement(By.id("simple-tab-1")).click();
    // 14 | click | css=.MuiButton-root | 
    driver.findElement(By.cssSelector(".MuiButton-root")).click();
    // 15 | click | id=outlined-basic | 
    driver.findElement(By.id("outlined-basic")).click();
    // 16 | type | id=outlined-basic | Lab1
    driver.findElement(By.id("outlined-basic")).sendKeys("Lab1");
    // 17 | click | name=deadline | 
    driver.findElement(By.name("deadline")).click();
    // 18 | type | name=deadline | 2023-12-02T23:22
    driver.findElement(By.name("deadline")).sendKeys("2023-12-02T23:22");
    // 19 | click | css=.MuiDialogContent-root | 
    driver.findElement(By.cssSelector(".MuiDialogContent-root")).click();
    // 20 | click | css=.bn-submit-button > .MuiButtonBase-root | 
    driver.findElement(By.cssSelector(".bn-submit-button > .MuiButtonBase-root")).click();
    // 21 | selectFrame | index=0 | 
    driver.switchTo().frame(0);
    // 22 | click | css=button | 
    driver.findElement(By.cssSelector("button")).click();
    // 23 | selectFrame | relative=parent | 
    driver.switchTo().defaultContent();
    // 24 | click | css=.MuiDialog-container | 
    driver.findElement(By.cssSelector(".MuiDialog-container")).click();
    // 25 | close |  | 
    driver.close();
  }
}

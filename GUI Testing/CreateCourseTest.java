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
public class CreateCourseTest {
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
  public void createCourse() {
    // Test name: Create Course
    // Step # | name | target | value
    // 1 | open | https://common-ground.netlify.app/ | 
    driver.get("https://common-ground.netlify.app/");
    // 2 | setWindowSize | 1228x824 | 
    driver.manage().window().setSize(new Dimension(1228, 824));
    // 3 | click | css=.dropdown-toggle | 
    driver.findElement(By.cssSelector(".dropdown-toggle")).click();
    // 4 | click | linkText=Educator Login | 
    driver.findElement(By.linkText("Educator Login")).click();
    // 5 | click | css=li:nth-child(3) > .page-scroll | 
    driver.findElement(By.cssSelector("li:nth-child(3) > .page-scroll")).click();
    // 6 | click | name=courseTitle | 
    driver.findElement(By.name("courseTitle")).click();
    // 7 | type | name=courseTitle | Digital Communication
    driver.findElement(By.name("courseTitle")).sendKeys("Digital Communication");
    // 8 | click | name=courseCode | 
    driver.findElement(By.name("courseCode")).click();
    // 9 | type | name=courseCode | CT303
    driver.findElement(By.name("courseCode")).sendKeys("CT303");
    // 10 | click | name=visibility | 
    driver.findElement(By.name("visibility")).click();
    // 11 | select | name=visibility | label=Public
    {
      WebElement dropdown = driver.findElement(By.name("visibility"));
      dropdown.findElement(By.xpath("//option[. = 'Public']")).click();
    }
    // 12 | click | name=courseDescription | 
    driver.findElement(By.name("courseDescription")).click();
    // 13 | type | name=courseDescription | Quantization, Sampling, matched filter
    driver.findElement(By.name("courseDescription")).sendKeys("Quantization, Sampling, matched filter");
    // 14 | click | name=courseLevel | 
    driver.findElement(By.name("courseLevel")).click();
    // 15 | select | name=courseLevel | label=Beginner
    {
      WebElement dropdown = driver.findElement(By.name("courseLevel"));
      dropdown.findElement(By.xpath("//option[. = 'Beginner']")).click();
    }
    // 16 | click | name=coursePrice | 
    driver.findElement(By.name("coursePrice")).click();
    // 17 | type | name=coursePrice | -1
    driver.findElement(By.name("coursePrice")).sendKeys("-1");
    // 18 | click | name=coursePrice | 
    driver.findElement(By.name("coursePrice")).click();
    // 19 | type | name=coursePrice | 0
    driver.findElement(By.name("coursePrice")).sendKeys("0");
    // 20 | click | name=coursePrice | 
    driver.findElement(By.name("coursePrice")).click();
    // 21 | type | name=coursePrice | 1
    driver.findElement(By.name("coursePrice")).sendKeys("1");
    // 22 | click | name=coursePrice | 
    driver.findElement(By.name("coursePrice")).click();
    // 23 | type | name=coursePrice | 0
    driver.findElement(By.name("coursePrice")).sendKeys("0");
    // 24 | click | name=coursePrice | 
    driver.findElement(By.name("coursePrice")).click();
    // 25 | click | name=prerequisites | 
    driver.findElement(By.name("prerequisites")).click();
    // 26 | type | name=prerequisites | Signal and system
    driver.findElement(By.name("prerequisites")).sendKeys("Signal and system");
    // 27 | click | name=language | 
    driver.findElement(By.name("language")).click();
    // 28 | select | name=language | label=English
    {
      WebElement dropdown = driver.findElement(By.name("language"));
      dropdown.findElement(By.xpath("//option[. = 'English']")).click();
    }
    // 29 | click | name=tags | 
    driver.findElement(By.name("tags")).click();
    // 30 | type | name=tags | digital communication, engineering
    driver.findElement(By.name("tags")).sendKeys("digital communication, engineering");
    // 31 | click | name=courseDescriptionLong | 
    driver.findElement(By.name("courseDescriptionLong")).click();
    // 32 | click | css=.ccsubmit | 
    driver.findElement(By.cssSelector(".ccsubmit")).click();
    // 33 | click | name=courseDescriptionLong | 
    driver.findElement(By.name("courseDescriptionLong")).click();
    // 34 | type | name=courseDescriptionLong | CT303 - sample description - gui testing
    driver.findElement(By.name("courseDescriptionLong")).sendKeys("CT303 - sample description - gui testing");
    // 35 | click | css=.ccsubmit | 
    driver.findElement(By.cssSelector(".ccsubmit")).click();
    // 36 | close |  | 
    driver.close();
  }
}

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
public class SignUpRegisterEducatorTest {
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
  public void signUpRegisterEducator() {
    // Test name: Sign Up / Register (Educator)
    // Step # | name | target | value
    // 1 | open | / | 
    driver.get("http://localhost:3000/homepage/");
    // 2 | setWindowSize | 1228x824 | 
    driver.manage().window().setSize(new Dimension(1228, 824));
    // 3 | click | css=.dropdown-toggle | 
    driver.findElement(By.cssSelector(".dropdown-toggle")).click();
    // 4 | click | linkText=Educator Login | 
    driver.findElement(By.linkText("Educator Login")).click();
    // 5 | click | linkText=Sign up | 
    driver.findElement(By.linkText("Sign up")).click();
    // 6 | click | name=fname | 
    driver.findElement(By.name("fname")).click();
    // 7 | type | name=fname | Jyoti
    driver.findElement(By.name("fname")).sendKeys("Jyoti");
    // 8 | click | name=lname | 
    driver.findElement(By.name("lname")).click();
    // 9 | type | name=lname | Verma
    driver.findElement(By.name("lname")).sendKeys("Verma");
    // 10 | click | name=email | 
    driver.findElement(By.name("email")).click();
    // 11 | type | name=email | jahnviverma20@gmail.com
    driver.findElement(By.name("email")).sendKeys("jahnviverma20@gmail.com");
    // 12 | click | name=phone | 
    driver.findElement(By.name("phone")).click();
    // 13 | type | name=phone | 9016493012
    driver.findElement(By.name("phone")).sendKeys("9016493012");
    // 14 | click | name=bio | 
    driver.findElement(By.name("bio")).click();
    // 15 | type | name=bio | I am very good teacher
    driver.findElement(By.name("bio")).sendKeys("I am very good teacher");
    // 16 | click | name=upiID | 
    driver.findElement(By.name("upiID")).click();
    // 17 | type | name=upiID | jahnvi.verma1220@okssbi
    driver.findElement(By.name("upiID")).sendKeys("jahnvi.verma1220@okssbi");
    // 18 | click | name=dob | 
    driver.findElement(By.name("dob")).click();
    // 19 | type | name=dob | 1998-08-14
    driver.findElement(By.name("dob")).sendKeys("1998-08-14");
    // 20 | click | css=.gender1:nth-child(3) > label | 
    driver.findElement(By.cssSelector(".gender1:nth-child(3) > label")).click();
    // 21 | click | id=educationLevel | 
    driver.findElement(By.id("educationLevel")).click();
    // 22 | select | id=educationLevel | label=Doctorate
    {
      WebElement dropdown = driver.findElement(By.id("educationLevel"));
      dropdown.findElement(By.xpath("//option[. = 'Doctorate']")).click();
    }
    // 23 | click | id=country | 
    driver.findElement(By.id("country")).click();
    // 24 | select | id=country | label=India
    {
      WebElement dropdown = driver.findElement(By.id("country"));
      dropdown.findElement(By.xpath("//option[. = 'India']")).click();
    }
    // 25 | click | name=username | 
    driver.findElement(By.name("username")).click();
    // 26 | type | name=username | jyotiverma1220
    driver.findElement(By.name("username")).sendKeys("jyotiverma1220");
    // 27 | click | name=password | 
    driver.findElement(By.name("password")).click();
    // 28 | type | name=password | jyotiverma123@
    driver.findElement(By.name("password")).sendKeys("jyotiverma123@");
    // 29 | click | css=.studentlogin_btn__DxLYW | 
    driver.findElement(By.cssSelector(".studentlogin_btn__DxLYW")).click();
    // 30 | close |  | 
    driver.close();
  }
}

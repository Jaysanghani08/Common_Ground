import React from "react"
import "./Footer.css"

const Footer = () => {
  return (
    <>
    
      
    
      <footer>
        <div className='container padding'>
          <div className='box logo2'>
            <h1>COMMON GROUND</h1>
            <span>ONLINE EDUCATION & LEARNING</span>
            <p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
          </div>
          <div className='box link'>
            <h3>Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='box link'>
            <h3>Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Student Login</li>
              <li>Educator Login</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
         
          <div className='box last'>
            <h3>Have a Questions?</h3>
            <ul>
              <li>
              <i className='fa fa-map-marker'></i>

                Daiict college, Reliance Cross Rd, Gandhinagar, Gujarat 382007
              </li>
              <li>
              <i className='fa fa-phone'></i>

                +91 0000000000
              </li>
              <li>
                <i className='fa fa-paper-plane'></i>
                info@domain.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2022 All rights reserved | Common Ground <i className='fa fa-heart'></i>
        </p>
      </div>
    </>
  )
}

export default Footer

  import React from "react";
  import "./AboutUs.css";
  import aboutBackgroundImg from "../Images/about-us.png";

  const AboutUs = ({id}) => {
    return (
      <div id={id}>
      <div className="container">
        <div className="about-container">
          <div className="about__background">
            <img src={aboutBackgroundImg} alt="about Us Background" />
          </div>
          <div className="about__content">
            <h2>About Us</h2>
            <h5>
            We believe in pushing the boundaries 
            of what s possible. We are a team of experts committed to delivering outstanding results. We believe in the 
            power of collaboration and hard work. Together, we strive to make a positive impact in the world.
            </h5>
          </div>
        </div>
      </div>
      </div>
    );
  };

  export default AboutUs;

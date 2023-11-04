import React from "react";
import "./AboutUs.css";
import aboutBackgroundImg from "../Images/about-us.png";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="about-container">
        <div className="about__background">
          <img src={aboutBackgroundImg} alt="about Us Background" />
        </div>
        <div className="about__content">
          <h2>About Us</h2>
          <h5>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt
            mollitia nostrum harum eos praesentium odit a sed quod aut fugit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit
            omnis, culpa eligendi inventore perspiciatis minus. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Dolores cupiditate facilis
            provident quidem accusamus impedit tenetur laboriosam debitis nisi
            eius!
          </h5>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

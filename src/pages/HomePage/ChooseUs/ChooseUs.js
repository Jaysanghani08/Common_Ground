import React from "react";
import "./ChooseUs.css";
import chooseBackgroundImg from "../Images/why-choose-us.png";

const ChooseUs = () => {
  return (
    <div className="container">
      <div className="choose-container">
        <div className="choose__content">
          <h2>Why Choose Us</h2>
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
        <div className="choose__background">
          <img src={chooseBackgroundImg} alt="Choose Us Background" />
        </div>
      </div>
    </div>
  );
};

export default ChooseUs;

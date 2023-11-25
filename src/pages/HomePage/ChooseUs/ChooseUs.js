import React from "react";
import "./ChooseUs.css";
import chooseBackgroundImg from "../Images/why-choose-us.png";

const ChooseUs = ({id}) => {
  return (
    <div id={id}>
    <div className="container">
      <div className="choose-container">
        <div className="choose__content">
          <h5>
          Our team comprises dedicated 
          educators, industry experts, and 
          tech enthusiasts who believe in 
the power of education to 
transform lives. We aim to break 
down barriers to education, 
making it accessible to anyone, 
anywhere. Join us on this 
educational journey, where 
curiosity meets expertise, and 
together, let s unlock the door to 
endless possibilities.
          </h5>
        </div>
        <div className="choose__background">
          <img src={chooseBackgroundImg} alt="Choose Us Background" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ChooseUs;

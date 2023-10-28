import React from 'react';
import './Coursescard.css';
function Coursescard() {
  return (
    <div className="courses_container">
    <div className="courses_card">
      <div className="courses_card-head">
        <div className="courses_detail">
          <h2>Computer Networks</h2>
          Covers fundamental concepts like protocols, IP addressing, and network architecture.
        </div>
        <span className="courses_text">IT304</span>
      </div>
      <div className="courses_card-body">
        <div className="courses_desc">
          <span className="courses_title">
          <b>Computer Networks</b>

          </span>
          <span className="courses_caption">By PS Kalyan</span>
          <span className="courses_rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star grey"></i>
          </span>
        </div>
        <div className="courses_properties">
          <span className="courses_Progress">
            <h4>Progress: <b>60</b>%</h4>
            
          </span>
          <span className="courses_student">
            <h4>Number of Student : 30</h4>
    
          </span>
          <span className="courses_continue">
            <b>Continue</b>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Coursescard;

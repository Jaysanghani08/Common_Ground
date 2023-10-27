import React from 'react';
import './Coursescard.css';
function Coursescard() {
  return (
    <div className="courses_container">
    <div className="courses_card">
      <div className="courses_card-head">
        <div className="courses_product-detail">
          <h2>Computer Networks</h2>
          Covers fundamental concepts like protocols, IP addressing, and network architecture.
        </div>
        <span className="courses_back-text">IT304</span>
      </div>
      <div className="courses_card-body">
        <div className="courses_product-desc">
          <span className="courses_product-title">
          <b>Computer Networks</b>
            {/* <span className="courses_badge">New</span> */}
          </span>
          <span className="courses_product-caption">By PS Kalyan</span>
          <span className="courses_product-rating">
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star"></i>
            <i className="fa fa-star grey"></i>
          </span>
        </div>
        <div className="courses_product-properties">
          <span className="courses_product-size">
            <h4>Progress</h4>
            {/* <ul className="courses_ul-size">
              <li><a href="#">7</a></li>
              <li><a href="#">8</a></li>
              <li><a href="#">9</a></li>
              <li><a href="#" className="courses_active">10</a></li>
              <li><a href="#">11</a></li>
            </ul> */}
          </span>
          <span className="courses_product-color">
            <h4>Number of Student : 30</h4>
            {/* <ul className="courses_ul-color">
              <li><a href="#" className="courses_orange courses_active"></a></li>
              <li><a href="#" className="courses_green"></a></li>
              <li><a href="#" className="courses_yellow"></a></li>
            </ul> */}
          </span>
          <span className="courses_product-price">
            <b>Continue</b>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Coursescard;

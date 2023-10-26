import React from 'react';
import './Mycourses.css';
function Mycourses() {
  return (
    <div className="courses_container">
    <div className="courses_card">
      <div className="courses_card-head">
        <div className="courses_product-detail">
          <h2>Hartbeespoort</h2>
          Support and Nike Zoom Air come together for a more supportive feel with high-speed responsiveness
        </div>
        <span className="courses_back-text">FAS</span>
      </div>
      <div className="courses_card-body">
        <div className="courses_product-desc">
          <span className="courses_product-title">
            Hartbee<b>spoort</b>
            <span className="courses_badge">New</span>
          </span>
          <span className="courses_product-caption">Basket Ball Collection</span>
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
            <h4>Size</h4>
            <ul className="courses_ul-size">
              <li><a href="#">7</a></li>
              <li><a href="#">8</a></li>
              <li><a href="#">9</a></li>
              <li><a href="#" className="courses_active">10</a></li>
              <li><a href="#">11</a></li>
            </ul>
          </span>
          <span className="courses_product-color">
            <h4>Colour</h4>
            <ul className="courses_ul-color">
              <li><a href="#" className="courses_orange courses_active"></a></li>
              <li><a href="#" className="courses_green"></a></li>
              <li><a href="#" className="courses_yellow"></a></li>
            </ul>
          </span>
          <span className="courses_product-price">
            USD<b>23,453</b>
          </span>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Mycourses;

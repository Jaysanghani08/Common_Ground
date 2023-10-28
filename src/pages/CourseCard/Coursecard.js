import React from 'react'
import Star from "./../Educator/EduOfferedCourses/stars"
import { NavLink } from 'react-router-dom'
import "./Coursecard.css"

const Coursecard = ({course}) => {
    return (
        <div key={course.Index} className="card_container">
            <div className="courses_card">
                <div className="courses_card-head">
                    {/* <span className="courses_back-text">IT304</span> */}
                </div>
                <div className="courses_card-body">
                    <div className="courses_product-detail">
                        <h2>{course.coursename}</h2>
                        {course.coursedescription.slice(0, 95)}
                    </div>
                    <div className="courses_product-desc">
                        <span className="courses_product-caption">By {course.instructor}</span>
                        <span className="courses_product-rating">
                            <Star stars={course.courserating} />
                        </span>
                    </div>
                    <div className="courses_product-properties">
                        <span className="courses_product-size">
                            <h4>Progress</h4>
                        </span>
                        <span className="courses_product-color">
                            <h4>{course.totalstudentenrolled} students enrolled</h4>
                        </span>
                        <span className="courses_product-price">
                            <span> {course.price === 0 ? "Free" : course.price} </span>
                            <button type="button" class="btn" ><NavLink to={`/view-course/${course.course_id}`} style={{ color: "white" }}>View Course </NavLink></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coursecard

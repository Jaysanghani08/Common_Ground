import React from 'react'
import Star from "./../Educator/EduOfferedCourses/stars"
import { NavLink } from 'react-router-dom'
import "./Coursecard.css"

const Coursecard = ({ course }) => {

    if(!course){
        return(
            // changes at end
            <h2 className="">
                You have not created any courses.
            </h2>
        )
    }

    return (
        <div key={course.courseCode} className="card_container">
            <div className="courses_card">
                <div className="courses_card-head">
                    {/* <span className="courses_back-text">IT304</span> */}
                </div>
                <div className="courses_card-body">
                    <div className="courses_product-detail">
                        <h2>{course.courseTitle}</h2>
                        {course.courseDescription}
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
                            <h4>{course.enrolledStudents ? course.enrolledStudents.length : 0} students enrolled</h4>
                        </span>
                        <span className="courses_product-price">
                            <span> {course.coursePrice === 0 ? "Free" : `Rs. ${course.price}`} </span>
                            <button type="button" class="btn" ><NavLink to={`/view-course/${course._id}`} style={{ color: "white" }}>View Course </NavLink></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Coursecard

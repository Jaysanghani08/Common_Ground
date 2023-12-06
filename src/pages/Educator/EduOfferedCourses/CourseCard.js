import React from 'react'
import Star from "./stars"
import { NavLink } from 'react-router-dom'
import "./CourseCard.css"


const truncateText = (text, limit) => {
    if (text.split(' ').length > limit) {
      return text
        .split(' ')
        .slice(0, limit)
        .join(' ') + '...'; // Append an ellipsis (...) at the end
    }
    return text;
  };
const CourseCard = ({ course }) => {

    if(!course){
        return(
            // changes at end
            <h2 className="">
                You have not created any courses.
            </h2>
        )
    }
 
    const truncatedDescription = truncateText(course.courseDescription, 25);
    return (
        <div key={course.courseCode} className="edu_card_container">
            <div className="edu_courses_card">
                <div className="edu_courses_card-head">
                    {/* <span className="courses_back-text">IT304</span>  */}
                </div>
                <div className="edu_courses_card-body edu_courses_height">
                    <div className="edu_courses_product-detail">
                        <h2>{course.courseTitle}</h2>
                        <p className="courses_description"  >{truncatedDescription}</p> 
                    </div>
                    <div className="edu_courses_product-desc">
                        {/* <span className="edu_courses_product-caption">By {`${course.createdBy?.fname} ${course.createdBy?.lname}`}</span> */}
                        <span className="edu_courses_product-rating">
                            <Star stars={course.rating >= 5 ? 5 : course.rating} />
                        </span>
                    </div>
                    <div className="edu_courses_product-properties">
                        {/* <span className="courses_product-size">
                            <h4>Progress</h4>
                        </span> */}
                        <span className="edu_courses_product-color">
                            <h4>{course.enrolledStudents ? course.enrolledStudents.length : 0} Students Enrolled</h4>
                        </span>
                        <span className="edu_courses_product-price">
                            <span> {course.coursePrice === 0 ? "Free" : `Rs. ${course.coursePrice}`} </span>
                            <button type="button" className="btn" ><NavLink to={`/course/${course._id}`} style={{ color: "white" }}>View Course </NavLink></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard

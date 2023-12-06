import React from 'react'
import Star from "./../../Educator/EduOfferedCourses/stars"
import { NavLink } from 'react-router-dom'
import "./StuCourseCard.css"


const truncateText = (text, limit) => {
    if (text.split(' ').length > limit) {
      return text
        .split(' ')
        .slice(0, limit)
        .join(' ') + '...'; // Append an ellipsis (...) at the end
    }
    return text;
  };
const StuCourseCard = (props ) => {

    if(!props){
        return(
            // changes at end
            <h2 className="">
                You have not created any courses.
            </h2>
        )
    }
 
    const truncatedDescription = truncateText(props.courseDescription, 25);
    return (
        <div key={props.courseCode} className="stu_card_container">
            <div className="stu_courses_card">
                <div className="stu_courses_card-head">
                    {/* <span className="courses_back-text">IT304</span>  */}
                </div>
                <div className="stu_courses_card-body stu_courses_height">
                    <div className="stu_courses_product-detail">
                        <h2>{props.courseTitle}</h2>
                         <p className="courses_description"  >{truncatedDescription}</p> 
                    </div>
                    <div className="stu_courses_product-desc">
                        <span className="stu_courses_product-caption">By {props.instructor}</span>
                        <span className="stu_courses_product-color">
                            <h4>{props.enrolledStudents ? props.enrolledStudents.length : 0} Students Enrolled</h4>
                        </span>
                        <span className="stu_courses_product-rating">
                            
                            {
                                (props.courserating >= 5) ? <Star stars={5} /> : <Star stars={props.courserating} />
                            }
                        </span>

                    </div>
                    <div className="stu_courses_product-properties">
                        {/* <span className="courses_product-size">
                            <h4>Progress</h4>
                        // </span>  */}
                        
                        <span className="stu_courses_product-price">
                            <span> {props.coursePrice === 0 ? "Free" : `Rs. ${props.coursePrice}`} </span>
                            <button type="button" className="btn" ><NavLink to={`/course/${props._id}`} style={{ color: "white" }}>View Course </NavLink></button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StuCourseCard

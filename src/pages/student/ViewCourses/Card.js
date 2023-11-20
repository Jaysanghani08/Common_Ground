import React from "react";
import Star from "../../Educator/EduOfferedCourses/stars";
import { NavLink } from "react-router-dom";

const Card = ({ course }) => {

    return (
        <div style={{width:"400px"}} className="stu-viewcourses-courses_card-body">
            <div className="stu-viewcourses-courses_product-detail">
                <h2>{course.courseTitle || "Computer Networks"}</h2>
            </div>

            <h4 style={{color:"white"}} className="stu-viewcourses-courses_product-caption">By {course.createdBy.fname + " " + course.createdBy.lname}</h4>
            <h4 style={{color:"white"}} className="stu-viewcourses-courses_product-caption stu-viewcourses-enrolled-students">{course.enrolledStudents ? course.enrolledStudents.length : 0} Students Enrolled</h4>

            <span style={{ color:"white", display:"block"}} className="stu-viewcourses-courses_product-caption stu-viewcourses-course-desc">{course.courseDescription || "A computer network is a group of interconnected nodes or computing devices that exchange data and resources with each other. jhgfdrt gfcde ffghvnb gyfcdxrtyv fc tgcf ftxd"}</span>
            <span className="stu-viewcourses-courses_product-rating">
                <Star stars={course.rating} />
            </span>

            <span className="stu-viewcourses-courses_product-button">
                <button type="button" className="btn" ><NavLink to={`/course/${course._id}`} style={{ color: "white" }}>View Course </NavLink></button>
            </span>
        </div>
    );
}

export default Card
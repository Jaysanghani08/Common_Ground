import React from "react";
import Star from "../../Educator/EduOfferedCourses/stars";
import { NavLink } from "react-router-dom";

const Card = ({ course }) => {
    return (
        <div className="stu-viewcourses-courses_card-body">
            <div className="stu-viewcourses-courses_product-detail">
                <h2>{course.courseTitle || "Computer Networks"}</h2>
            </div>

            <span className="stu-viewcourses-courses_product-caption">By PS Kalyan</span>
            <span className="stu-viewcourses-courses_product-caption stu-viewcourses-enrolled-students">{course.enrolledStudents ? course.enrolledStudents.length : 0} Students Enrolled</span>

            <span className="stu-viewcourses-courses_product-caption stu-viewcourses-course-desc">{course.courseDescription || "A computer network is a group of interconnected nodes or computing devices that exchange data and resources with each other. jhgfdrt gfcde ffghvnb gyfcdxrtyv fc tgcf ftxd"}</span>
            <span className="stu-viewcourses-courses_product-rating">
                <Star stars={course.courserating || 3.5} />
            </span>

            <span className="stu-viewcourses-courses_product-button">
                <button type="button" class="btn" ><NavLink to={`/view-course/${course._id}`} style={{ color: "white" }}>View Course </NavLink></button>
            </span>
        </div>
    );
}

export default Card
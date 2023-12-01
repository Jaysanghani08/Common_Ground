import React from 'react'
import "./CourseHeader.css"
import Star from "./../../../Educator/EduOfferedCourses/stars"
import { FaCalendarDay, FaChalkboardTeacher, FaRupeeSign, FaUserFriends } from "react-icons/fa";
import CourseImg from "./../../../../data/imgs/couse_img.jpg";


// fetch data from backend and display it here

const CourseHeader = ({courseCode, courseTitle, courseDescriptionLong, createdBy, enrolledStudents, coursePrice,rating,dateCreated,language, courseLevel}) => {
    const formattedDate = new Date(dateCreated).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    return (
        <div className="course-header">
            <div className="course-title">
                <h2>{courseTitle}</h2>
            </div>
            <div className="course-description">
                <h5>
                    {courseDescriptionLong}
                </h5>
                {/* <img src={CourseImg } art=''></img> */}
            </div>
            <div className="course-rating">
                <Star stars={rating} />
            </div>
            <div className="course-header-botttom ">
                <div className="course-instructor">
                    <FaChalkboardTeacher />
                    By {createdBy}
                </div>
                <div className="course-date">
                    <FaCalendarDay />
                    {/* have to change */}
                    {formattedDate}
                </div>
                <div className="course-enrolled-students">
                    <FaUserFriends />
                    {enrolledStudents} Students
                </div>
                <div className="course-enrolled-students">
                    <FaRupeeSign />
                    {/* have to change */}
                    {coursePrice}
                </div>
            </div>
        </div>
    )
}

export default CourseHeader

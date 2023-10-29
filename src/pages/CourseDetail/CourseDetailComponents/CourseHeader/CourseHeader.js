import React from 'react'
import "./CourseHeader.css"
import Star from "./../../../Educator/EduOfferedCourses/stars"
import { FaCalendarDay, FaChalkboardTeacher, FaRupeeSign, FaUserFriends } from "react-icons/fa";

const CourseHeader = () => {
    return (
        <div className="course-header">
            <div className="course-title">
                <h2>Computer Networks</h2>
            </div>
            <div className="course-description">
                <h5>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolor, et veniam commodi quasi perferendis, quae, iure non porro laudantium assumenda voluptate soluta nam magnam dolorum corrupti nihil? Aliquam, cupiditate.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolor, et veniam commodi quasi perferendis, quae, iure non porro laudantium assumenda voluptate soluta nam magnam dolorum corrupti nihil? Aliquam, cupiditate.
                </h5>
            </div>
            <div className="course-rating">
                <Star stars={3.9} />
            </div>
            <div className="course-header-botttom ">
                <div className="course-instructor">
                    <FaChalkboardTeacher />
                    By PS Kalyan
                </div>
                <div className="course-date">
                    <FaCalendarDay />
                    2 April, 2023
                </div>
                <div className="course-enrolled-students">
                    <FaUserFriends />
                    430 students
                </div>
                <div className="course-enrolled-students">
                    <FaRupeeSign />
                    600
                </div>
            </div>
        </div>
    )
}

export default CourseHeader

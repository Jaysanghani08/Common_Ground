import React, { useEffect, useState } from 'react'
import "./CourseHeader.css"
import Star from "./../../../Educator/EduOfferedCourses/stars"
import { FaCalendarDay, FaChalkboardTeacher, FaRupeeSign, FaUserFriends } from "react-icons/fa";
import CourseImg from "./../../../../data/imgs/couse_img.jpg";
import RateCourseDialog from '../RateCourse';
import getToken from '../../../../services/getToken';
import { UnenrollInCourse, enrollInCourse, getCourseData } from '../../../../services/Apis';
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import { ToastContainer, toast } from 'react-toastify';
import CertificateDownloadButton from '../../Certificate';
// fetch data from backend and display it here

const CourseHeader = ({courseCode, courseTitle, courseDescriptionLong, createdBy, enrolledStudents, coursePrice,rating,dateCreated, isEnrolled, usertype}) => {
    const formattedDate = new Date(dateCreated).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });


    const { courseId } = useParams();

    

    const handleEnroll = async () => {
        const res = await enrollInCourse(courseId);

        if (res?.status === 200) {
            toast.success("You are Successfully enrolled.")
            window.location.reload();
        }
        else {
            toast.error("Error Enrolling in course.")
        }
    }


    const handleUnenroll = async () => {
        const res = await UnenrollInCourse(courseId);

        if (res?.status === 200) {
            toast.success("You are Successfully Unenrolled.")
            window.location.reload();
        }
        else {
            toast.error("Error Enrolling in course.")
        }
    }

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
                <div className="student-button">
                {
                                    usertype === 'student' && !isEnrolled &&
                                    <Button variant="contained" color="success" onClick={handleEnroll}>Enroll in the Course.</Button>
                                }
                                {
                                    usertype === 'student' && isEnrolled &&
                                    <Button variant="contained" color="error" onClick={handleUnenroll}>UnEnroll from this  the Course.</Button>
                                }
                                {
                                     usertype === 'student' && isEnrolled &&
                                    <RateCourseDialog />
                                }     
                                {
                                    usertype === 'student' && isEnrolled &&
                                    <CertificateDownloadButton/>
                                }
                           
                
                </div>
                              

                                
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

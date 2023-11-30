import React, { useEffect, useState } from 'react'
import EdNavbar from './../Educator/Dashboard/Sidebar/Navbar'
import "./CourseDetails.css"
import CourseHeader from './CourseDetailComponents/CourseHeader/CourseHeader'
import BasicTabs from './CourseDetailComponents/CourseHeader/TabMenu'
import LoadingComponent from '../Loading/Loading'
import getToken from '../../services/getToken'
import { UnenrollInCourse, enrollInCourse, getCourseData } from '../../services/Apis';
import { useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import StuNavbar from './../student/Dashboard/Sidebar/Sidebar'
import RateCourseDialog from './CourseDetailComponents/RateCourse';
import AssignmentSubmission from './CourseDetailComponents/CourseHeader/AssignmentSubmission'
import Button from '@mui/material/Button'
import CertificateDownloadButton from './Certificate'

const CourseDetails = () => {

    const { courseId } = useParams()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coursedata, setcoursedata] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [usertype, setUserType] = useState(null);

    console.log(coursedata)

    useEffect(() => {

        const Edutoken = getToken('educator');
        const Stutoken = getToken('student');

        const fetchData = async () => {
            try {
                // if (token) {
                const [coursedata] = await Promise.all([
                    getCourseData(courseId),
                    // getStudentProfile()
                ]);
                setcoursedata(coursedata);
                if (coursedata?.enrolledStudents.some(user => user._id === Stutoken.userId)) {
                    console.log("sdfafasdnshfdfkd")
                    setIsEnrolled(true);
                }
                else {
                    console.log("dfsdfdsfdd")
                    setIsEnrolled(false);
                }
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        const fetchUsertype = async () => {
            if (Edutoken) {
                setUserType('educator')
            }
            else if (Stutoken) {
                setUserType('student')
            }
        }

        fetchData();
        fetchUsertype();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

 

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
        <>
            <div>
                {
                    usertype === 'educator' ? <EdNavbar /> : <StuNavbar />
                }
                <div className="course-container">
                    {

                        coursedata &&
                        <>
                            <CourseHeader
                                courseCode={coursedata.courseCode}
                                courseTitle={coursedata.courseTitle}
                                courseDescriptionLong={coursedata.courseDescriptionLong}
                                createdBy={`${coursedata.createdBy.fname} ${coursedata.createdBy.lname}`}
                                enrolledStudents={coursedata.enrolledStudents.length || 0}
                                language={coursedata.language}
                                courseLevel={coursedata.courseLevel}
                                coursePrice={coursedata.coursePrice}
                                rating={coursedata.rating}
                            />



                            <div className="course-content">
                                {
                                    usertype === 'student' && !isEnrolled &&
                                    <Button variant="contained" color="success" onClick={handleEnroll}>Enroll in the Course.</Button>
                                }

                                <BasicTabs sections={coursedata.courseSections} enrolledStudents={coursedata.enrolledStudents} courseAssignments={coursedata.courseAssignments} discussionData={coursedata.discussionForum?.messages} usertype={usertype} createdby={coursedata.createdBy?._id} isEnrolled={isEnrolled} />
                                {
                                    usertype === 'student' && !isEnrolled &&
                                <RateCourseDialog />

                                }

                                {
                                    usertype === 'student' && isEnrolled &&
                                    <Button variant="contained" color="error" onClick={handleUnenroll}>UnEnroll from this  the Course.</Button>
                                }

                                {/* <CertificateDownloadButton/> */}
                            </div>

                        </>
                    }
                </div>
            </div>

            <ToastContainer />
        </>


    )
}

export default CourseDetails

import React, { useEffect, useState } from 'react'
import Sidebar from './../student/Dashboard/Sidebar/Sidebar'
import "./CourseDetails.css"
import CourseHeader from './CourseDetailComponents/CourseHeader/CourseHeader'
import BasicTabs from './CourseDetailComponents/CourseHeader/TabMenu'
import DicussionForum from './CourseDetailComponents/DicussionForum/DicussionForum'
import BasicTextFields from './CourseDetailComponents/Buttons/button'
import LoadingComponent from '../Loading/Loading'
import getToken from '../../services/getToken'
import { getCourseData, getStudentProfile } from '../../services/Apis';
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

const CourseDetails = ({ courseId = "654d072a4f095401ca4384d0" }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coursedata, setcoursedata] = useState(null);
    const [profile, setProfile] = useState(null);

    console.log(coursedata)
    // console.log(profile)

    const token = getToken('educator');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const [coursedata, profile] = await Promise.all([
                        getCourseData(courseId),
                        getStudentProfile()
                    ]);
                    setcoursedata(coursedata);
                    setProfile(profile);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (!token) {
        return <Navigate to="/educator/login" />;
    }

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div>
                <Sidebar />
                <div className="course-container">
                    <CourseHeader
                        courseCode={coursedata.courseCode}
                        courseTitle={coursedata.courseTitle}
                        courseDescriptionLong={coursedata.courseDescriptionLong}
                        createdBy={`${coursedata.createdBy.fname} ${coursedata.createdBy.lname}`}
                        enrolledStudents={coursedata.enrolledStudents.length || 0}
                        language={coursedata.language}
                        courseLevel={coursedata.courseLevel}
                    />

                    <div className="course-content">
                        <BasicTabs sections={coursedata.courseSections} courseId={coursedata._id} />
                        <BasicTextFields />
                        <div className="dicussion-forum">
                            <DicussionForum />
                        </div>
                    </div>
                </div>

            </div>

            <ToastContainer />
        </>


    )
}

export default CourseDetails

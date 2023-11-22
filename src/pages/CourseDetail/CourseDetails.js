import React, { useEffect, useState } from 'react'
import EdNavbar from './../Educator/Dashboard/Sidebar/Navbar'
import "./CourseDetails.css"
import CourseHeader from './CourseDetailComponents/CourseHeader/CourseHeader'
import BasicTabs from './CourseDetailComponents/CourseHeader/TabMenu'
import DicussionForum from './CourseDetailComponents/DicussionForum/DicussionForum'
import BasicTextFields from './CourseDetailComponents/Buttons/button'
import LoadingComponent from '../Loading/Loading'
import getToken from '../../services/getToken'
import { getCourseData, getStudentProfile, checkIfenrolled } from '../../services/Apis';
import { Navigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import StuNavbar from './../student/Dashboard/Sidebar/Sidebar'

const CourseDetails = () => {

    const { courseId } = useParams()

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [coursedata, setcoursedata] = useState(null);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [usertype, setUserType] = useState(null);

    console.log(coursedata)


    useEffect(() => {

        const fetchUsertype = async () => {
            const Edutoken = getToken('educator');
            const Stutoken = getToken('student');
            if (Edutoken) {
                setUserType('educator')
            }
            else if (Stutoken) {
                setIsEnrolled(await checkIfenrolled());
                setUserType('student')
            }
        }

        const fetchData = async () => {
            try {
                // if (token) {
                const [coursedata] = await Promise.all([
                    getCourseData(courseId),
                    // getStudentProfile()
                ]);
                setcoursedata(coursedata);
                // setProfile(profile);
                setLoading(false);
                // }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
        fetchUsertype();
    }, []);

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                            />

                            <div className="course-content">
                                <BasicTabs sections={coursedata.courseSections} enrolledStudents={coursedata.enrolledStudents} courseAssignments={coursedata.courseAssignments} discussionData={coursedata.discussionForum?.messages} usertype={usertype} createdby={coursedata.createdBy?._id} isEnrolled={isEnrolled}/>
                                {/* <BasicTextFields courseId={coursedata._id} /> */}
                                {/* <div className="dicussion-forum">
                                 <DicussionForum 
                                    data={coursedata.discussionForum.messages}
                        //   currentUserId={profile?._id} 
                          />
                                </div> */}
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

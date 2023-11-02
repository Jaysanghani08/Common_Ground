import React from 'react'
import Sidebar from './../student/Dashboard/Sidebar/Sidebar'
import "./CourseDetails.css"
import CourseHeader from './CourseDetailComponents/CourseHeader/CourseHeader'
import BasicTabs from './CourseDetailComponents/CourseHeader/TabMenu'
import DicussionForum from './CourseDetailComponents/DicussionForum/DicussionForum'


const CourseDetails = () => {
    return (
        <div>
            <Sidebar />
            <div className="course-container">
                <CourseHeader />
                <div className="course-content">
                    <BasicTabs />
                    <DicussionForum/>
                </div>
                
            </div>
        </div>
    )
}

export default CourseDetails

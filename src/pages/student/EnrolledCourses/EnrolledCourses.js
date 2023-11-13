import React from 'react'
import Navbar from '../Dashboard/Sidebar/Sidebar'
import StuCourseCard from './StuCourseCard';
import Button from '@mui/material/Button';
import './EnrolledCourses.css'

const EnrolledCourses = () => {
    return (
        <div className='EC-container stu_background_img'>
             <Navbar /> 
       

         <div className='edc_container1'>
       <div className='edu_search_bar stu_margin'> 
            <input
                                className='edu_stu-viewcourses-large-input'
                                type="text"
                                placeholder="Search by course title"/>

            <Button variant="contained">Search</Button>  

 </div>
        <div className='stu-main-container'>
           

            {/* <video src='http://localhost:8000/Campus_Diaries_S1_Ep1.mp4' style={{ margin: "80px" }}> </video> */}

            {/* <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                height="700"
                controls
                controlsList="nodownload"
            >
                <source src="http://localhost:8000/Campus_Diaries_S1_Ep1.mp4" />
            </video> */}


            <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1"/>
            <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1"/>
            <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1"/>
            <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1"/>
            <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1"/>
            <StuCourseCard courseCode="IT213" courseDescription="This is Course Description" courseTitle="Software" instructor="DK joshi" courserating="4" enrolledStudents="1" coursePrice="20000" _id="1"/>

        </div>
        </div>
        </div>
        
        
    )
}

export default EnrolledCourses

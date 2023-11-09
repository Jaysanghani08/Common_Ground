import React from 'react';
import './EduCourseCard.css';
import { NavLink } from 'react-router-dom'
import CourseCard from './CourseCard';

function Coursescard({ coursesData }) {
    return (
        <>
        {/* // <div className='edu_courses_main_container' id='edu_courses_main_container'> */}
            {/* //  <div className="edu_overlay"> */}
                {/* <div className="edu_course_main_container_title"> */}
                    {/* <h2>Our Courses</h2> */}
                    {/* <button type="button" class="btn view_all_courses_btn" ><NavLink to={`/student/view-courses/`} style={{ color: "white" }}> All Courses </NavLink></button> */}
                {/* </div> */}
                {/* <div className="edu_courses_container"> */}
                    {coursesData.map(course => (
                        <CourseCard course={course} />
                    ))}
                {/* </div> */}
            {/* // </div>
        //    </div> */}
        </>
    );
}

export default Coursescard;

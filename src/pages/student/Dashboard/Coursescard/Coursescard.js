import React from 'react';
import './Coursescard.css';
import { NavLink } from 'react-router-dom'
import Coursecard from '../../../CourseCard/Coursecard';

function Coursescard({ coursesData }) {
    return (
        <div className='courses_main_container' id='courses_main_container'>
            <div className="overlay">
                <div className="course_main_container_title">
                    <h2>Our Courses</h2>
                    <button type="button" class="btn view_all_courses_btn" ><NavLink to={`/student/view-courses/`} style={{ color: "white" }}> All Courses >> </NavLink></button>
                </div>
                <div className="courses_container">
                    {coursesData.map(course => (
                        <Coursecard course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Coursescard;

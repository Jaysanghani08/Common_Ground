import React from 'react';
import './Coursescard.css';
import { NavLink } from 'react-router-dom'
import Coursecard from '../../../CourseCard/Coursecard';


// const coursesData = [
//     {
//         "coursedescription": "Computer Network is Group of interconnected Nodes or computing devices that exchange data and resources with each other. A network between these devices can be establish using cable or wireless media. The world’s first banner ad was placed on the HotWired website in 1994. It was a simple message that read “Have you ever clicked your mouse right here? You will.",
//         "totalstudentenrolled": 50,
//         "courserating": 3,
//         "coursename": "Computer Networks",
//         "Index": "1",
//         "course_id": "1",
//         "price": "8",
//         "instructor": "PS Kalyan"
//     },
//     {
//         "coursedescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta. In hac habitasse platea dictumst. Vestibulum id odio at nunc soda Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta",
//         "totalstudentenrolled": 92,
//         "courserating": 3,
//         "coursename": "coursename 3",
//         "Index": "3",
//         "course_id": "3",
//         "price": "100",
//         "instructor": "PS Kalyan"
//     },
//     {
//         "coursedescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta. In hac habitasse platea dictumst. Vestibulum id odio at nunc soda Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta. In hac ",
//         "totalstudentenrolled": 8,
//         "courserating": 3.7,
//         "coursename": "coursename 4",
//         "Index": "4",
//         "course_id": "7",
//         "price": "39",
//         "instructor": "PS Kalyan"
//     }
// ]

function Coursescard({coursesData}) {
    return (
        <div className='courses_main_container' id='courses_main_container'>
            <div className="course_main_container_title">
                <h2>Our Courses</h2>
                <button type="button" class="btn view_all_courses_btn" ><NavLink to={`/student/view-courses/`} style={{ color: "white" }}> All Courses      >> </NavLink></button>
            </div>
            <div className="courses_container">
                {coursesData.map(course => (
                    <Coursecard course={course} />
                ))}
            </div>
        </div>
    );
}

export default Coursescard;

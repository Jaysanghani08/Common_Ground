import Sidebar from '../Dashboard/Sidebar/Sidebar'
import Star from './stars'
import './EduOfferedCourses.css'
import React, { useState, useEffect } from 'react';
import Coursescard from '../../student/Dashboard/Coursescard/Coursescard';

const EduOfferedCourses = () => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const handleSearch = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = courses.filter(course =>
            course.coursename.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredCourses(filtered);
    };
    useEffect(() => {
        fetch('https://6517e4a9582f58d62d353374.mockapi.io/anand')
            .then(response => response.json())
            .then(data => {setCourses(data); console.log(data)})
            .catch(error => console.error('Error fetching data:', error));
    }, []);


    return (
        <div className="container1">
            <Sidebar />
            <Coursescard />
            {/* <div className="maindash">
                <div className="oc-search-bar">
                    <input
                        type="text"
                        placeholder="Search Courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="oc-search-button" onClick={handleSearch}>Search</button>
                </div>
                {courses.length === 0 ? (
                    <div className="oc-loading-spinner">
                        <div className="oc-spinner"></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div>
                        {courses.map(course => (
                            <div key={course.Index} className="oc-course-container">
                                <div className="oc-index inside-div">{course.Index}.</div>
                                <div className="oc-title-discription inside-div">
                                    <div className="oc-coursename inside-div">{course.coursename}</div>
                                    <div className="oc-coursedescription inside-div">{course.coursedescription}</div>
                                </div>
                                <div className="oc-totalstudentenrolled inside-div">{course.totalstudentenrolled} Students enrolled </div>
                                <div className="oc-courserating inside-div">
                                    Reviews
                                    <div className="inside-div oc-star">
                                        <Star stars={course.courserating} />
                                    </div>
                                </div>
                                <button className="oc-view"> View </button>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default EduOfferedCourses

import Sidebar from '../Dashboard/Sidebar/Sidebar'
import Star from './stars'
import './EduOfferedCourses.css'
import React, { useState, useEffect } from 'react';
import Coursescard from '../../student/Dashboard/Coursescard/Coursescard';
import getToken from '../../../services/getToken';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import LoadingComponent from '../../Loading/Loading';
import { getEducatorcourses, getEducatorProfile } from '../../../services/Apis';

const EduOfferedCourses = () => {

    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [offeredcourses, setofferedcourses] = useState(null);
    const [profile, setProfile] = useState(null);

    console.log(offeredcourses)


    const token = getToken('educator');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {

                    const [offeredcourses, profile] = await Promise.all([
                        getEducatorcourses(),
                        getEducatorProfile()
                    ]);
                    setofferedcourses(offeredcourses);
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

    const handleSearch = () => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = courses.filter(course =>
            course.coursename.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredCourses(filtered);
    };

    if (loading) {
        return <LoadingComponent />; // Render your loading component while data is being fetched
    }

    if (!token) {
        return <Navigate to="/educator/login" />;
    }


    return (
        <div className="container1">
            <Sidebar />
            <Coursescard coursesData={offeredcourses}/>
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

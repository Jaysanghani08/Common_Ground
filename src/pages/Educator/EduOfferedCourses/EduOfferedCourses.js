import Sidebar from '../Dashboard/Sidebar/Sidebar'
import Star from './stars'
import './EduOfferedCourses.css'
import React, { useState, useEffect } from 'react';
import Coursescard from './EduCourseCard';
import getToken from '../../../services/getToken';
import { Navigate } from 'react-router-dom';
import LoadingComponent from '../../Loading/Loading';
import { getEducatorcourses, getEducatorProfile } from '../../../services/Apis';
import EdNavbar from '../Dashboard/Sidebar/Navbar';

const EduOfferedCourses = () => {

    // const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    // const [filteredCourses, setFilteredCourses] = useState([]);
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

    // const handleSearch = () => {
    //     const lowerCaseQuery = searchQuery.toLowerCase();
    //     const filtered = offeredcourses.filter(course =>
    //         course.coursename.toLowerCase().includes(lowerCaseQuery)
    //     );
    //     setFilteredCourses(filtered);
    // };

    const filteredCs = offeredcourses.filter(course =>
        course.courseTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );



    if (loading) {
        return <LoadingComponent />; // Render your loading component while data is being fetched
    }

    if (!token) {
        return <Navigate to="/educator/login" />;
    }


    return (
        <div className="container1">
            <EdNavbar />
            {/* <div className='edc_container1'>
                <div className="edu_overlay">
                    <div className='edc_background_img '>
                        <div className="search-bar">

                            <div className='edu_search_bar'>
                                <input
                                    className='edu_stu-viewcourses-large-input'
                                    type="text"
                                    placeholder="Search by course title" />

                                <Button variant="contained">Search</Button>

                            </div>
                        </div>
                        <div className='edc_align_items'>
                            <Coursescard coursesData={offeredcourses} />
                            <Coursescard coursesData={offeredcourses} />
                            <Coursescard coursesData={offeredcourses} />
                            <Coursescard coursesData={offeredcourses} />
                            <Coursescard coursesData={offeredcourses} />
                            <Coursescard coursesData={offeredcourses} />
                        </div>
                    </div>
                </div>
            </div> */}


            <div className="edc_container1">
                <div className="edu_overlay">
                    <div className='edc_background_img '>
                        <div className="search-bar" style={{ zIndex: '15', position:'relative' }} >
                            <input
                                className='large-input'
                                style={{ width: '65vw' }}
                                type="text"
                                placeholder="Search Courses"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {/* <button className="oc-search-button" onClick={handleSearch}>Search</button> */}
                        </div>
                        {filteredCs.length === 0 ? (
                            <div className="oc-loading-spinner">
                                {/* <div className="oc-spinner"></div> */}
                                <h2 style={{color:'white'}}>No Courses</h2>
                            </div>
                        ) : (
                            <div className='edc_align_items'>
                                <Coursescard coursesData={filteredCs} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EduOfferedCourses

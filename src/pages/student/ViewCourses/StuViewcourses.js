import React, { useState, useEffect } from 'react';
import './StuViewCourses.css';
// import backgroundImage from './background.jpg'; // Import your background image
import Navbar from '../Dashboard/Sidebar/Sidebar';
// import Coursescard from '../Dashboard/Coursescard/Coursescard';
import Card from './Card.js'
import CategoryCard from './CategoryCard.js';
import coding from "./../../../data/imgs/Categories/coding.png"
import design from "./../../../data/imgs/Categories/sketch.png"
import pd from "./../../../data/imgs/Categories/growth.png"
import dm from "./../../../data/imgs/Categories/digital-marketing.png"
import getToken from '../../../services/getToken';
import LoadingComponent from '../../Loading/Loading';
import { Navigate } from 'react-router-dom';
import { getRecommendedCourses, getStudentProfile, getFilteredCourses } from '../../../services/Apis';
import {toast} from 'react-toastify';

const coursesData = [
    {
        "_id": "654a495aac365ab95062b4a1",
        "courseTitle": "Software Engineering",
        "courseDescription": "Short Change",
        "courseCode": "IT314",
        "courseLevel": "Intermidiate",
        "coursePrice": 50,
        "language": "English",
        "createdBy": {
            "fname": "Saurabh",
            "lname": "Tiwari"
        },
        "rating": 0,
        "ratio": 0
    },
    {
        "_id": "654a9c9696e13c973b41443a",
        "courseTitle": "Digital logic",
        "courseDescription": "The Software Engineering course introduces the basic principles, practices, tools.",
        "coursePrice": 50000,
        "courseLevel": "Beginner",
        "courseCode": "IT31452",
        "language": "English",
        "createdBy": {
            "fname": "Param",
            "lname": "Patel"
        },
        "rating": 0,
        "ratio": 0
    }
]
const categoryData = [
    {
        "index": "1",
        "categoryName": "Development",
        "course_id": "1",
        "image": coding
    },
    {
        "index": "2",
        "categoryName": "Designing",
        "course_id": "2",
        "image": design
    },
    {
        "index": "3",
        "categoryName": "Personality Development",
        "course_id": "3",
        "image": pd

    },
    {
        "index": "4",
        "categoryName": "Digital Marketing",
        "course_id": "4",
        "image": dm
    },

]

const StuViewCourses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [priceLimit, setPriceLimit] = useState('');
    const [maxRating, setmaxRating] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');
    const [language, setLanguage] = useState('');
    const [courseCode, setCourseCode] = useState('');

    const [courses, setCourses] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    //console.log(courses)
    // //console.log(profile)


    const token = getToken('student');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const [recommendedCourses, profile] = await Promise.all([
                        getRecommendedCourses(),
                        getStudentProfile()
                    ]);
                    setCourses(recommendedCourses);
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

    const handleSearchSubmit = async () => {
        try {
            const filteredCourses = await getFilteredCourses({
                title: searchTerm,
                price: priceLimit,
                rating: maxRating,
                level: category,
                tag: tags,
                language: language,
                courseCode: courseCode,
            });
            setCourses(filteredCourses);
        } catch (error) {
            toast.error('Error performing search:', error);
        }
    };

    if (!token) {
        return <Navigate to="/student/login" />;
    }

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Navbar />
            <div className="stu-viewcourses">
                <div className="stu-viewcourses-background-image"></div>
                <div className="stu-viewcourses-content">
                    <div className="stu-viewcourses-section-cover stu-viewcourses-section1-cover"></div>
                    <div className="stu-viewcourses-section1">
                        <div className='viewcourse-title'>
                        <h1 className='stu-viewcourses-heading' >
                            We help you to upgrade your knowledege effectively
                        </h1>
                        <h2 className='stu-viewcourses-subheading'>
                            Enjoy the freedom to learn the way you want
                        </h2>
                        </div>
                        <div className="stu-viewcourses-search-bar">
                            <input
                                className='stu-viewcourses-large-input'
                                type="text"
                                placeholder="Search by course title"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <input
                                className='stu-viewcourses-small-input'
                                type="number"
                                placeholder="Price Limit"
                                value={priceLimit}
                                onChange={(e) => setPriceLimit(e.target.value)}
                            />
                            <input
                                className='stu-viewcourses-small-input'
                                type="text"
                                placeholder="Course Code"
                                value={courseCode}
                                onChange={(e) => setCourseCode(e.target.value)}
                            />
                            <input
                                className='stu-viewcourses-small-input'
                                type="text"
                                placeholder="Tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <select
                                value={maxRating}
                                onChange={(e) => setmaxRating(e.target.value)}
                            >
                                <option value="">Rating</option>
                                <option value="1"> 1</option>
                                <option value="2"> 2</option>
                                <option value="3"> 3</option>
                                <option value="4"> 4</option>
                                <option value="5"> 5</option>
                                {/* Add more category options as needed */}
                            </select>
                            
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Difficulty Level</option>
                                <option value="beginner">Beginner </option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                                {/* Add more category options as needed */}
                            </select>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="">Language</option>
                                <option value="english">English </option>
                                <option value="hindi">Hindi</option>
                                <option value="spanish">Spanish</option>
                                {/* Add more category options as needed */}
                            </select>
                            {/* <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Language</option>
                                <option value="l1">English</option>
                                <option value="l2">Hindi</option>
                                {/* Add more category options as needed 
                            </select> */}
                            
                            <button onClick={handleSearchSubmit}>Search</button>

                        </div>
                    </div>

                    <div className="stu-viewcourses-section-cover stu-viewcourses-section2-cover"></div>
                    <div className="stu-viewcourses-section2">
                        <h2>Explore Our Courses</h2>
                        <div className="stu-viewcourses-card-container">
                            {courses.map((course, index) => (
                                <Card course={course} key={index} />
                            ))}
                        </div>
                    </div>

                    <div className="stu-viewcourses-section-cover stu-viewcourses-section3-cover"></div>
                    <div className="stu-viewcourses-section3">
                        <h2>Top Categories</h2>
                        <div className="stu-viewcourses-card-container">
                            {categoryData.map((category, index) => (
                                <CategoryCard category={category} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StuViewCourses;

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

const coursesData = [
    {
        "_id": "6542229da115d21516a05823",
        "courseTitle": "Software Engineering",
        "courseDescription": "rfedvhbgtvrfedfrgvth",
        "courseDescriptionLong": "dcfrgvhbyhtgfds",
        "coursePrice": 50,
        "thumbnail": "uploads/course/IW212-Software gfxdgfhfjgk/Software gfxdgfhfjgk-Thumbnail-Screenshot 2023-10-03 at 3.46.25 PM.png",
        "tags": [
            "dtufchgh",
            " cgj",
            " vghvihjhb"
        ],
        "courseLevel": "beginner",
        "courseCode": "IW212",
        "language": "spanish",
        "courseSections": [],
        "courseAssignments": [],
        "prerequisites": [
            "IT203",
            " IT123",
            " It123"
        ],
        "visibility": "public",
        "createdBy": "65420b2f5a21c7fb3483d956",
        "enrolledStudents": [
            "65423daebfe3173d23a49899",
            "6540d1ac8af5f77c89278b39"
        ],
        "dateCreated": "2023-11-01T10:04:13.398Z",
        "courseFeedback": [
            {
                "student": "65423daebfe3173d23a49899",
                "rating": 10,
                "comment": "hello",
                "_id": "6543a950c4fb28f4d9ab5011"
            },
            {
                "_id": "65453f22a0cbc35d709b837a",
                "student:": "5849583498938988858445",
                "rating": 100,
                "comment": "jay"
            }
        ],
        "__v": 8
    },
    {
        "_id": "6542229da115d21516a05823",
        "courseTitle": "Software Engineering",
        "courseDescription": "rfedvhbgtvrfedfrgvth",
        "courseDescriptionLong": "dcfrgvhbyhtgfds",
        "coursePrice": 50,
        "thumbnail": "uploads/course/IW212-Software gfxdgfhfjgk/Software gfxdgfhfjgk-Thumbnail-Screenshot 2023-10-03 at 3.46.25 PM.png",
        "tags": [
            "dtufchgh",
            " cgj",
            " vghvihjhb"
        ],
        "courseLevel": "beginner",
        "courseCode": "IW212",
        "language": "spanish",
        "courseSections": [],
        "courseAssignments": [],
        "prerequisites": [
            "IT203",
            " IT123",
            " It123"
        ],
        "visibility": "public",
        "createdBy": "65420b2f5a21c7fb3483d956",
        "enrolledStudents": [
            "65423daebfe3173d23a49899",
            "6540d1ac8af5f77c89278b39"
        ],
        "dateCreated": "2023-11-01T10:04:13.398Z",
        "courseFeedback": [
            {
                "student": "65423daebfe3173d23a49899",
                "rating": 10,
                "comment": "hello",
                "_id": "6543a950c4fb28f4d9ab5011"
            },
            {
                "_id": "65453f22a0cbc35d709b837a",
                "student:": "5849583498938988858445",
                "rating": 100,
                "comment": "jay"
            }
        ],
        "__v": 8
    },
    {
        "_id": "6542229da115d21516a05823",
        "courseTitle": "Software Engineering",
        "courseDescription": "rfedvhbgtvrfedfrgvth",
        "courseDescriptionLong": "dcfrgvhbyhtgfds",
        "coursePrice": 50,
        "thumbnail": "uploads/course/IW212-Software gfxdgfhfjgk/Software gfxdgfhfjgk-Thumbnail-Screenshot 2023-10-03 at 3.46.25 PM.png",
        "tags": [
            "dtufchgh",
            " cgj",
            " vghvihjhb"
        ],
        "courseLevel": "beginner",
        "courseCode": "IW212",
        "language": "spanish",
        "courseSections": [],
        "courseAssignments": [],
        "prerequisites": [
            "IT203",
            " IT123",
            " It123"
        ],
        "visibility": "public",
        "createdBy": "65420b2f5a21c7fb3483d956",
        "enrolledStudents": [
            "65423daebfe3173d23a49899",
            "6540d1ac8af5f77c89278b39"
        ],
        "dateCreated": "2023-11-01T10:04:13.398Z",
        "courseFeedback": [
            {
                "student": "65423daebfe3173d23a49899",
                "rating": 10,
                "comment": "hello",
                "_id": "6543a950c4fb28f4d9ab5011"
            },
            {
                "_id": "65453f22a0cbc35d709b837a",
                "student:": "5849583498938988858445",
                "rating": 100,
                "comment": "jay"
            }
        ],
        "__v": 8
    }
]
const categoryData = [
    {
        "index": "1",
        "categoryName" : "Development",
        "course_id" : "1",
        "image" : coding
    }, 
    {
        "index": "2",
        "categoryName" : "Designing",
        "course_id" : "2",
        "image" : design
    }, 
    {
        "index": "3",
        "categoryName" : "Personality Development",
        "course_id" : "3",
        "image" : pd
        
    }, 
    {
        "index": "4",
        "categoryName" : "Digital Marketing",
        "course_id" : "4",
        "image" : dm
    }, 

]

const StuViewCourses = () => {

    // const cardsData = [];
    const [searchTerm, setSearchTerm] = useState('');
    const [priceLimit, setPriceLimit] = useState('');
    const [enrollmentLimit, setEnrollmentLimit] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState('');

    const [filteredCourses, setFilteredCourses] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses data from API using Axios (replace with your API endpoint)
        // axios.get('https://api.example.com/courses')
        //     .then(response => {
        //         setCourses(response.data); // Assuming the response data is an array of courses
        //     })
        //     .catch(error => {
        //         console.error('Error fetching courses:', error);
        //     });

        //     console.log(getCourses)
    }, []);

    const applyFilters = () => {
        const filtered = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = !priceLimit || course.price <= parseInt(priceLimit);
            const matchesEnrollment = !enrollmentLimit || course.enrollment <= parseInt(enrollmentLimit);
            const matchesCategory = !category || course.category === category;
            const matchesTags = !tags || course.tags.includes(tags);

            return matchesSearch && matchesPrice && matchesEnrollment && matchesCategory && matchesTags;
        });

        setFilteredCourses(filtered);
    };

    const handleSearch = () => {
        applyFilters();
    };

    useEffect(() => {
        applyFilters();
    }, [searchTerm, priceLimit, enrollmentLimit, category, tags, courses]);

    const handleSearchSubmit = () => {
        // Perform Axios POST request with search and filter parameters
        // axios.post('https://api.example.com/search', {
        //     searchTerm,
        //     priceLimit,
        //     enrollmentLimit,
        //     category,
        //     tags,
        // })
        //     .then(response => {
        //         // Handle the response if needed
        //         console.log('Search results:', response.data);
        //     })
        //     .catch(error => {
        //         // Handle errors
        //         console.error('Error performing search:', error);
        //     });

        console.log("search submit");
    };

    return (
        <>
            <Navbar />
            <div className="stu-viewcourses">
                <div className="stu-viewcourses-background-image"></div>
                <div className="stu-viewcourses-content">
                    <div className="stu-viewcourses-section-cover stu-viewcourses-section1-cover"></div>
                    <div className="stu-viewcourses-section1">
                        <h1 className='stu-viewcourses-heading'>
                            We help you to upgrade your knowledege effectively
                        </h1>
                        <h2 className='stu-viewcourses-subheading'>
                            Enjoy the freedom to learn the way you want
                        </h2>
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
                                type="number"
                                placeholder="Enrollment Limit"
                                value={enrollmentLimit}
                                onChange={(e) => setEnrollmentLimit(e.target.value)}
                            />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                {/* Add more category options as needed */}
                            </select>
                            <input
                                className='stu-viewcourses-small-input'
                                type="text"
                                placeholder="Tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                            />
                            <button onClick={handleSearchSubmit}>Search</button>

                        </div>
                    </div>

                    <div className="stu-viewcourses-section-cover stu-viewcourses-section2-cover"></div>
                    <div className="stu-viewcourses-section1 stu-viewcourses-section2">
                        <h2>Recommended Courses</h2>
                        <div className="stu-viewcourses-card-container">
                            {coursesData.map((course, index) => (
                                <Card course />
                            ))}
                        </div>
                    </div>

                    <div className="stu-viewcourses-section-cover stu-viewcourses-section3-cover"></div>
                    <div className="stu-viewcourses-section1 stu-viewcourses-section3">
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

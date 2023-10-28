import React, { useState } from 'react';
import './CreateCourseForm.css';
import Sidebar from '../Dashboard/Sidebar/Sidebar'
import image from './ss.jpg';

function EduCreateCourse() {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [coursePrice, setCoursePrice] = useState('');
    const [currency, setCurrency] = useState('');
    const [courseLevel, setCourseLevel] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [prerequisites, setPrerequisites] = useState('');
    const [hasDiscussionForum, setHasDiscussionForum] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Handle form submission here
    };

    return (
        <div className="container1">
            <Sidebar />
            <div className="create-course-container maindash">
                <div className="create-course-form">
                    <form className='ccform' onSubmit={handleSubmit}>
                        <h1 style={{ color: "#f35e3d" }}>Create Course</h1>
                        <div className="form-group">
                            <label>Course Title</label>
                            <input
                                type="text"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                placeholder="Enter Your Course Name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Course Description</label>
                            <input
                                type="text"
                                className="description"
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                placeholder="Enter Your Course Description"
                            />

                        </div>

                        <div className="form-group">
                            <label>Course Price</label>
                            <input
                                type="number"
                                value={coursePrice}
                                onChange={(e) => setCoursePrice(e.target.value)}
                                placeholder="Enter Price"
                            />
                            <n></n>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                            >
                                <option value="Rupee">Rupee(₹)</option>
                                <option value="Dollar">Dollar($)</option>
                                <option value="Euro">Euro(€)</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Course Level</label>
                            <select
                                value={courseLevel}
                                onChange={(e) => setCourseLevel(e.target.value)}
                            >
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Course Language</label>
                            <select
                                value={courseLanguage}
                                onChange={(e) => setCourseLanguage(e.target.value)}
                            >
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="spanish">Hindi</option>
                                <option value="spanish">Gujarati</option>

                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Prerequisites Required</label>
                            <input
                                type="text"
                                value={prerequisites}
                                onChange={(e) => setPrerequisites(e.target.value)}
                                placeholder="Enter the prerequisites required for the course"
                            />
                        </div>

                        <div className="form-group">
                            <label>Does this course have a discussion forum?</label>
                            <div className='radiolabel'>
                                <label>
                                    <input
                                        type="radio"
                                        value="yes"
                                        checked={hasDiscussionForum}
                                        onChange={() => setHasDiscussionForum(true)}
                                    />
                                    Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        value="no"
                                        checked={!hasDiscussionForum}
                                        className="no-button"
                                        onChange={() => setHasDiscussionForum(false)}
                                    />
                                    No
                                </label>
                            </div>
                        </div>

                        <button className='ccsubmit' type="submit">Create Course</button>
                    </form>
                    <div className="create-course-image">
                        <img src={image} alt="Profile" />
                    </div>
                </div>


            </div>
        </div>
    );
}

export default EduCreateCourse;

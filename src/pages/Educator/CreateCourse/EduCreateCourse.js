import React, { useState } from 'react';
import './CreateCourseForm.css';
import Sidebar from '../Dashboard/Sidebar/Sidebar'
// import image from './123.jpg';
import { ToastContainer, toast } from 'react-toastify'
import { educreatecoursefunction } from '../../../services/Apis';
import getToken from '../../../services/getToken';
import { Navigate, useNavigate } from 'react-router-dom';
import EdNavbar from '../Dashboard/Sidebar/Navbar';

function EduCreateCourse() {

    const [inputdata, setInputdata] = useState({
        courseTitle: '',
        courseDescription: '',
        courseDescriptionLong: '',
        coursePrice: '',
        prerequisites: '',
        courseCode: '',
        thumbnail: '',
        tags: ''
    });

    const [courseLevel, setCourseLevel] = useState('');
    const [courseLanguage, setCourseLanguage] = useState('');
    const [visibility, setVisibility] = useState('');
    // console.log(inputdata)

    const token = getToken('educator');
    const navigate = useNavigate();

    if (!token) {
        return <Navigate to="/educator/login" />;
    }


    const handleFileUpload = (event) => {

        const file = event.target.files[0];

        setInputdata({
            ...inputdata,
            "thumbnail": file
        })
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputdata({
            ...inputdata,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            ...inputdata,
            courseLevel,
            tags: inputdata.tags.split(','),
            // language:"English",
            prerequisites: inputdata.prerequisites.split(','),
            language: courseLanguage,
            discussionForum: true,
            visibility: visibility
        }

        if (formData.courseCode === "") {
            toast.error("Enter Course Code")
        }
        else if (formData.courseTitle === "") {
            toast.error("Enter Course Title")
        }
        else if (formData.courseDescription === "" || formData.courseDescription.length > 100) {
            toast.error("Enter Course short Description in less then 100 charactors")
        }
        else if (formData.courseDescriptionLong === "") {
            toast.error("Enter Course Long Description.")
        }
        else if (formData.coursePrice === "" || formData.coursePrice < 0) {
            toast.error("Enter Valid Course Price. ")
        }
        else {
            // console.log(formData)

            const response = await educreatecoursefunction(formData, token);
            // const response = {};

            // console.log(response)

            if (response?.status === 201) {
                setInputdata({
                    ...inputdata,
                    courseTitle: '',
                    courseDescription: '',
                    courseDescriptionLong: '',
                    coursePrice: '',
                    prerequisites: '',
                    courseCode: '',
                });
                setCourseLevel('');
                setCourseLanguage('');
                setVisibility('');
                toast.success("course created successfully")
                navigate("/educator/offered-courses")
            } else {
                toast.error("error in creating course");
            }
        }
    }

    return (
        <>

            <div className="container1">

                <EdNavbar />
                <div className="create-course-container">
                    <form className='course-form' encType='multipart/form-data'>
                        <h1>Create A New Course</h1>
                        <div>
                            <div className='ccform'>

                                <div className='form-pair'>
                                    <div className="form-group">
                                        <label>Course Title</label>
                                        <input
                                            type="text"
                                            name="courseTitle"
                                            value={inputdata.courseTitle}
                                            onChange={handleChange}
                                            placeholder="Course Name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Course Code</label>
                                        <input
                                            type="text"
                                            name="courseCode"
                                            value={inputdata.courseCode}
                                            onChange={handleChange}
                                            placeholder="Course Code"
                                        />
                                    </div>
                                </div>
                                <div className='form-pair'>
                                    <div className="form-group">
                                        <label>Visibility</label>
                                        <select
                                            name='visibility'
                                            value={visibility}
                                            onChange={(e) => setVisibility(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="Public">Public</option>
                                            <option value="Protected">Protected</option>
                                            <option value="Private">Private</option>
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label>Short Description</label>
                                        <input
                                            type="text"
                                            className="description"
                                            value={inputdata.courseDescription}
                                            onChange={handleChange}
                                            placeholder="Enter Your Course Description-short"
                                            name="courseDescription"
                                        />
                                    </div>
                                </div>

                                <div className='form-pair'>
                                    <div className="form-group">
                                        <label>Course Level</label>
                                        <select
                                            name='courseLevel'
                                            value={courseLevel}
                                            onChange={(e) => setCourseLevel(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="beginner">Beginner</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="advanced">Advanced</option>
                                        </select>
                                    </div>


                                    <div className="form-group">
                                        <label>Course Price (Rs)</label>
                                        <input
                                            type="number"
                                            value={inputdata.coursePrice}
                                            onChange={handleChange}
                                            placeholder="Enter Price (Enter '0' for free)"
                                            name="coursePrice"
                                        />
                                    </div>
                                </div>

                                <div className='form-pair'>
                                    <div className="form-group">
                                        <label>Prerequisites</label>
                                        <input
                                            name='prerequisites'
                                            type="text"
                                            value={inputdata.prerequisites}
                                            onChange={handleChange}
                                            placeholder="Enter Course Prerequisites"
                                        />
                                    </div>


                                    <div className="form-group">
                                        <label>Course Language</label>
                                        <select
                                            name='language'
                                            value={courseLanguage}
                                            onChange={(e) => setCourseLanguage(e.target.value)}
                                        >
                                            <option value="">Select</option>
                                            <option value="english">English</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="spanish">Hindi</option>
                                            <option value="spanish">Gujarati</option>

                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='form-pair'>
                                    <div className="form-group">
                                        <label>Tags</label>
                                        <input
                                            name='tags'
                                            type="text"
                                            value={inputdata.tags}
                                            onChange={handleChange}
                                            placeholder="Enter Values Seperated by '' , ''"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Course Thumbnail</label>
                                        <input
                                            type="file"
                                            name="thumbnail"
                                            accept='.png'
                                            // value={inputdata.thumbnail}
                                            onChange={handleFileUpload}
                                        />
                                    </div>



                                </div>
                                <div className="form-group form-group-v">
                                    <label>Long Description</label>
                                    <input
                                        type="text"
                                        className="description"
                                        name='courseDescriptionLong'
                                        value={inputdata.courseDescriptionLong}
                                        onChange={handleChange}
                                        placeholder="Enter Your Course Description"
                                    />

                                </div>
                                <button className='ccsubmit' onClick={handleSubmit}>Create Course</button>

                            </div>
                        </div>



                    </form>
                </div >

            </div >

            <ToastContainer />
        </>

    );
}


export default EduCreateCourse;

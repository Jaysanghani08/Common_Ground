import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './EditStuProfile.css'
import { Link } from 'react-router-dom';
import Navbar from '../Dashboard/Sidebar/Sidebar'
import { Navigate } from 'react-router-dom';
import getToken from '../../../services/getToken';
import { editStudentProfile, getStudentProfile } from '../../../services/Apis';
import LoadingComponent from './../../Loading/Loading'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EditStuProfile = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    // console.log(profile)

    const token = getToken('student');

    const [inputData, setInputData] = useState({
        username: "",
        fname: "",
        lname: "",
        gender: "",
        country: "",
        dob: "",
        educationLevel: "",
        email: "",
        phone: "",
        profilePic: ""
    });

    const [profilePic, setProfilePic] = useState(null);
    const [interests, setInterests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const [profile] = await Promise.all([
                        getStudentProfile()
                    ]);
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

    console.log(profile)

    if (!token) {
        return <Navigate to="/student/login" />;
    }

    if (loading) {
        return <LoadingComponent />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const currentDate = new Date();

        let ageDiff = currentDate.getFullYear() - birthDate.getFullYear();

        // Adjust age if birthday hasn't occurred yet this year
        if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
        ) {
            ageDiff--;
        }

        return ageDiff;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value,
        });
    }

    const handleInterestChange = (e) => {
        const { value } = e.target;
        setInterests(value.split(','));
    }

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        setProfilePic(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            username: inputData.username? inputData.username : profile.username,
            fname: inputData.fname? inputData.fname : profile.fname,
            lname: inputData.lname? inputData.lname : profile.lname ,
            gender: inputData.gender?inputData.gender : profile.gender ,
            location: inputData.country? inputData.country : profile.country ,
            dob: inputData.dob? inputData.dob : profile.dob ,
            educationLevel: inputData.educationLevel? inputData.educationLevel : profile.educationLevel ,
            email: inputData.email? inputData.email : profile.email ,
            phone: inputData.phone? inputData.phone : profile.phone ,
            interests: interests ? interests : profile.interests ,
            profilePic: profilePic ? profilePic : profile.profilePic
        };

        console.log(formData);

        const edited = await editStudentProfile(formData);

        if (edited?.status === 200) {
            toast.success('Profile edited successfully');
            navigate('/student/profile')
            window.location.reload(true);
        }
        else {
            toast.error('Error in editing profile');
        }
    }

    return (

        <div className='spn-container1'>

            <Navbar />
            <div className='spn-edit-profile'>

                <div className='spn-edit-upper'>

                    <div className='spn-edit-sub-upper'>

                        <div className='spn-edit-image-container1'>
                            <div className='spn-edit-img1'>
                                {profile?.profilePic ? <img src={`http://localhost:8000/${profile?.profilePic?.split('/').pop()}`} onClick={() => document.getElementById('file-input').click()} style={{cursor: 'pointer'}}/>
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image' onClick={() => document.getElementById('file-input').click()} style={{cursor: 'pointer'}}/>
                                }
                                <input
                                    type="file"
                                    id="file-input"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleProfilePictureChange}
                                />

                            </div>
                        </div>

                        <div className='spn-edit-user'>
                            <div className='spn-edit-username1'>
                                <input className="sdp-edit-user-control" type="text" name='username' onChange={handleChange} value={inputData.username} placeholder={profile.username} />
                            </div>

                        </div>

                    </div>

                </div>

                <div className='spn-edit-lover'>

                    <div className='spn-edit-basicinfo'>

                        <div className='spn-edit-basic-heading'>Basic Info</div>

                        <div className='spn-edit-Sub-basicinfo'>

                            <div className='spn-edit-info-main'>
                                <div className='spn-edit-info-submain'>FName</div>
                                <div className='spn-edit-info-submain'>LName</div>
                                <div className='spn-edit-info-submain'>Gender</div>
                                {/* <div className='spn-edit-info-submain'>Country</div> */}
                                <div className='spn-edit-info-submain'>Dob</div>
                                {/* <div className='spn-edit-info-submain'>Education Level</div> */}
                                <div className='spn-edit-info-submain'>Email</div>
                                <div className='spn-edit-info-submain'>Phone</div>
                                <div className='spn-edit-info-submain'>Interests</div>
                            </div>

                            <div className='spn-edit-personalinfo'>

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="text" name='fname' onChange={handleChange} value={inputData.fname} placeholder={profile.fname} />
                                </div>

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="text" name='lname' onChange={handleChange} value={inputData.lname} placeholder={profile.lname} />
                                </div>

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="text" name='gender' onChange={handleChange} value={inputData.gender} placeholder={profile.gender} />
                                </div>

                                {/* <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="text" name='country' value="India" />
                                </div> */}

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="date" name='dob' onChange={handleChange} value={inputData.dob} placeholder={profile.dob} />
                                </div>

                                {/* <div className='spn-edit-info-submain2'>
                                  <input className="sdp-edit-form-control" type="text" name='educationLevel' value="" />
                                </div> */}

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="email" name='email' onChange={handleChange} value={inputData.email} placeholder={profile.email} />
                                </div>

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="string" name='phone' onChange={handleChange} value={inputData.phone} placeholder={profile.phone} />
                                </div>

                                <div className='spn-edit-info-submain2'>
                                    <input className="sdp-edit-form-control" type="string" name='interests' onChange={handleInterestChange} value={interests} placeholder={profile.interests} />
                                </div>

                            </div>

                        </div>

                        <Link to={'/student/profile'} className='spn-cancel-button'>Cancel</Link>
                        <button className='spn-submit-button' onClick={handleSubmit}>Submit</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default EditStuProfile

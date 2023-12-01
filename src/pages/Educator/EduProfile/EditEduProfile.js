import React from 'react'
import { useState, useEffect } from 'react';
import './EditEduProfile.css'
import { Link } from 'react-router-dom';
import EdNavbar from '../Dashboard/Sidebar/Navbar';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editEduProfile, getEducatorProfile } from '../../../services/Apis';
import getToken from './../../../services/getToken';
import LoadingComponent from './../../Loading/Loading';

const EduProfile = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    // console.log(profile)

    const token = getToken('educator');

    const [inputData, setInputData] = useState({
        username: "",
        bio: "",
        fname: "",
        lname: "",
        gender: "",
        location: "",
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
                        getEducatorProfile()
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

    // console.log(profile)

    if (!token) {
        return <Navigate to="/educator/login" />;
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
            username: inputData.username ? inputData.username : profile.username,
            bio: inputData.bio ? inputData.bio : profile.bio,
            location: inputData.location ? inputData.location : profile.location,
            fname: inputData.fname ? inputData.fname : profile.fname,
            lname: inputData.lname ? inputData.lname : profile.lname,
            gender: inputData.gender ? inputData.gender : profile.gender,
            country: inputData.country ? inputData.country : profile.country,
            dob: inputData.dob ? inputData.dob : profile.dob,
            educationLevel: inputData.educationLevel ? inputData.educationLevel : profile.educationLevel,
            email: inputData.email ? inputData.email : profile.email,
            phone: inputData.phone ? inputData.phone : profile.phone,
            interests: interests ? interests : profile.interests,
            profilePic: profilePic ? profilePic : profile.profilePic
        };

        console.log(formData);

        const edited = await editEduProfile(formData);

        if (edited?.status === 200) {
            toast.success('Profile edited successfully');
            navigate('/educator/profile')
            window.location.reload(true);
        }
        else {
            toast.error('Error in editing profile');
        }
    }

    return (

        <div className='epn-container1'>

            <EdNavbar />
            <div className='epn-edit-profile'>

                <div className='epn-edit-upper'>

                    <div className='epn-edit-sub-upper'>

                        <div className='epn-edit-image-container1'>
                            <div className='epn-edit-img1'>
                                {profile?.profilePic ? <img src={`https://common-ground-9kqv.onrender.com/${profile?.profilePic?.split('/').pop()}`} onClick={() => document.getElementById('file-input').click()} style={{ cursor: 'pointer' }} />
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image' onClick={() => document.getElementById('file-input').click()} style={{ cursor: 'pointer' }} />
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

                        <div className='epn-edit-user'>
                            <div className='epn-edit-username1'>
                                <input className="edp-edit-form-control" type="text" name='username' onChange={handleChange} value={inputData.username} placeholder={profile.username} />
                            </div>

                            <div className='epn-edit-about'>
                                <textarea className="edp-edit-form-control" name="bio" rows="4" cols="50" onChange={handleChange} value={inputData.bio} placeholder={profile.bio}></textarea>
                                {/* <input className="edp-edit-form-control" type="submit" value="Save" /> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='epn-edit-lover'>

                    <div className='epn-edit-basicinfo'>

                        <div className='epn-edit-basic-heading'>Basic Info</div>

                        <div className='epn-edit-Sub-basicinfo'>

                            <div className='epn-edit-info-main'>
                                <div className='epn-edit-info-submain'>FName</div>
                                <div className='epn-edit-info-submain'>LName</div>
                                <div className='epn-edit-info-submain'>Gender</div>
                                <div className='epn-edit-info-submain'>Country</div>
                                <div className='epn-edit-info-submain'>Dob</div>
                                <div className='epn-edit-info-submain'>Education Level</div>
                                <div className='epn-edit-info-submain'>Email</div>
                                <div className='epn-edit-info-submain'>Phone</div>
                            </div>

                            <div className='epn-edit-personalinfo'>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="text" name='fname' onChange={handleChange} value={inputData.fname} placeholder={profile.fname} />
                                </div>
                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="text" name='lname' onChange={handleChange} value={inputData.lname} placeholder={profile.lname} />
                                </div>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="text" name='gender' onChange={handleChange} value={inputData.gender} placeholder={profile.gender} />
                                </div>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="text" name='country' onChange={handleChange} value={inputData.location} placeholder={profile.location} />
                                </div>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="date" name='dob' onChange={handleChange} value={inputData.dob} placeholder={profile.dob} />
                                </div>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="text" name='educationLevel' onChange={handleChange} value={inputData.educationLevel} placeholder={profile.educationLevel} />
                                </div>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="email" name='email' onChange={handleChange} value={inputData.email} placeholder={profile.email} />
                                </div>

                                <div className='epn-edit-info-submain2'>
                                    <input className="edp-edit-form-control" type="string" name='phone' onChange={handleChange} value={inputData.phone} placeholder={profile.phone} />
                                </div>

                            </div>

                        </div>

                        <Link to={'/educator/profile'} className='epn-cancel-button'>Cancel</Link>
                        <button className='epn-submit-button' onClick={handleSubmit}>Submit</button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default EduProfile

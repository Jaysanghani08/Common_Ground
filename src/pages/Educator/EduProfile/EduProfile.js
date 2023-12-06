import React from 'react'
import { useRef, useState, useEffect } from 'react';
import './EduProfile.css'
import { Link, useParams } from 'react-router-dom';
import EdNavbar from '../Dashboard/Sidebar/Navbar';
import { useNavigate } from 'react-router-dom';
import getToken from '../../../services/getToken';
import { getEducatorProfile } from '../../../services/Apis';
import LoadingComponent from './../../Loading/Loading'
import { Navigate } from 'react-router-dom';

const EduProfile = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    //console.log(profile)

    const token = getToken('educator');

    // location.reload();

    useEffect(() => {
        // window.location.reload(true);
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

    return (

        <div className='epn-container1'>

            <EdNavbar />
            <div className='epn-profile'>

                <div className='epn-upper'>

                    <div className='epn-sub-upper'>

                        <div className='epn-image-container1'>
                            <div className='epn-img1'>
                                {profile.profilePic ? <img src={`https://common-ground-9kqv.onrender.com/${profile.profilePic?.split('/').pop()}`} alt="" />
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image' />
                                }
                            </div>
                        </div>

                        <div className='epn-user'>
                            <div className='epn-username1'>
                                <div>{profile.username}</div>
                            </div>

                            <div className='epn-about'>
                                <div>{profile.bio}</div>
                            </div>
                        </div>

                    </div>

                </div>

                <div className='epn-lover'>

                    <div className='epn-basicinfo'>

                        <div className='epn-basic-heading'>Basic Info</div>

                        <div className='epn-Sub-basicinfo'>

                            <div className='epn-info-main'>
                                <div className='epn-info-submain'>Name</div>
                                <div className='epn-info-submain'>Gender</div>
                                <div className='epn-info-submain'>Country</div>
                                <div className='epn-info-submain'>Age</div>
                                <div className='epn-info-submain'>Email</div>
                                <div className='epn-info-submain'>Phone</div>
                                <div className='epn-info-submain'>Upi id</div>
                            </div>

                            <div className='epn-personalinfo'>

                                <div className='epn-info-submain'>
                                    <div>{profile.fname} {profile.lname}</div>
                                </div>

                                <div className='epn-info-submain'>
                                    <div >{profile.gender}</div>
                                </div>

                                <div className='epn-info-submain'>
                                    <div >{profile.location}</div>
                                </div>

                                <div className='epn-info-submain'>
                                    <div >{
                                        calculateAge(profile.dob)
                                    } year</div>
                                </div>

                                {
                                    profile.education && <div className='epn-info-submain'>
                                        <div className='epn-email1'>{profile.education}</div>
                                    </div>
                                }

                                <div className='epn-info-submain'>
                                    <div className='epn-email1'>{profile.email}</div>
                                </div>

                                <div className='epn-info-submain'>
                                    <div className='epn-mo-number1'>{profile.phone}</div>
                                </div>

                                <div className='epn-info-submain'>
                                    <div className='epn-mo-number1'>{profile.upiID}</div>
                                </div>
                            </div>
                        </div>

                        <Link to={'/educator/update'} className='epn-edit-button'>Edit Profile</Link>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default EduProfile

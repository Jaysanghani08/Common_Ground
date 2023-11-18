import './EduDashboard.css';
import React, { useState, useEffect } from 'react'
import Siderbar from './Sidebar/Sidebar';
import Calendar from './Calendar/Calendar'
import { UilUser } from '@iconscout/react-unicons'
import Cards from './Cards/Cards';
import SimpleBarChart from './Graph/Graph';
import BasicTable from './Table/Table'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import getToken from '../../../services/getToken';
import { getEducatorDashboard, getEducatorProfile } from '../../../services/Apis';
import LoadingComponent from './../../Loading/Loading'
// import Navbar from '../../student/Dashboard/Sidebar/Sidebar';
import EdNavbar from "./Sidebar/Navbar";

function EduDashboard() {


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setdashboardData] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    // const location = useLocation()

    const navigateToProfile = () => {
        navigate("/educator/profile");
    }

    // console.log(profile)

    const token = getToken('educator');

    // location.reload();

    useEffect(() => {
        // window.location.reload(true);
        const fetchData = async () => {
            try {
                if (token) {

                    const [dashboardData, profile] = await Promise.all([
                        getEducatorDashboard(),
                        getEducatorProfile()
                    ]);
                    setdashboardData(dashboardData);
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

    return (
        <>
            <div className="container1">
               <EdNavbar/>
                <div className="maindash">
                    <div className="header">
                        <div className="heading">
                            <h1>Hello <span>{profile.fname} !</span> </h1>
                        </div>
                        <div className="profilephoto" onClick={navigateToProfile}>
                            {
                            profile && profile.profilePic ? 
                            <img src={`http://localhost:8000/${profile.profilePic?.split('/').pop()}`} alt="user" width={150} srcset="" />
                            :<UilUser size='100' />
                            }
                        </div>

                    </div>
                    <div className="cards">
                        <Cards
                            income={dashboardData.totalEarning}
                            rating={dashboardData.avgRating}
                            studentcnt={dashboardData.totalStudent}
                            totalcourses={dashboardData.totalCourses} />
                    </div>
                    <div className="graphcal">
                        <div className="graph">
                            <SimpleBarChart />
                        </div>
                        <div className="calendar">
                            <Calendar />
                        </div>
                    </div>
                    {/* <div className="courses">
                        <BasicTable />
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default EduDashboard;

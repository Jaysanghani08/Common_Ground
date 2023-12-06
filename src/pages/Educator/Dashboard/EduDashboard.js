import './EduDashboard.css';
import React, { useState, useEffect } from 'react'
import Calendar from './Calendar/Calendar'
import { UilUser } from '@iconscout/react-unicons'
import Cards from './Cards/Cards';
import SimpleBarChart from './Graph/Graph';
import { Navigate, useNavigate } from 'react-router-dom';
import getToken from '../../../services/getToken';
import { getEducatorDashboard, getEducatorProfile, getEduGraph } from '../../../services/Apis';
import LoadingComponent from './../../Loading/Loading'
import EdNavbar from "./Sidebar/Navbar";

function EduDashboard() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setdashboardData] = useState(null);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    // const location = useLocation()

    const [yData, setYdata] = useState();
    const [xLabels, setXlabels] = useState();

    const navigateToProfile = () => {
        navigate("/educator/profile");
    }

    // //console.log(profile)

    const token = getToken('educator');

    // location.reload();

    useEffect(() => {
        // window.location.reload(true);
        const fetchData = async () => {
            try {
                if (token) {

                    const [dashboardData, profile, graphdata] = await Promise.all([
                        getEducatorDashboard(),
                        getEducatorProfile(),
                        getEduGraph()
                    ]);
                    setdashboardData(dashboardData);
                    setProfile(profile);
                    setXlabels(graphdata.courseTitle)
                    setYdata(graphdata.enrolled)
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

    const roundToDecimalPlaces = (number, decimalPlaces) => {
        const factor = 10 ** decimalPlaces;
        return Math.round(number * factor) / factor;
    };

    const rating = roundToDecimalPlaces(dashboardData.avgRating, 2)

    return (
        <>
            <div className="container1">
                <EdNavbar />
                <div className="maindash">
                    <div className="header">
                        <div className="heading">
                            <h1>Hello <span>{profile.fname} !</span> </h1>
                        </div>
                        <div className="profilephoto" onClick={navigateToProfile}>
                            {
                                profile && profile.profilePic ?
                                    <img src={`https://common-ground-9kqv.onrender.com/${profile.profilePic?.split('/').pop()}`} alt="user" width={150} srcset="" />
                                    : <img src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400' alt='no image' />
                            }
                        </div>

                    </div>
                    <div className="cards">
                        <Cards
                            income={dashboardData.totalEarning}
                            rating={rating}
                            studentcnt={dashboardData.totalStudent}
                            totalcourses={dashboardData.totalCourses} />
                    </div>
                    <div className="graphcal">
                        {
                            (xLabels.length !== 0 || yData.length !== 0) &&
                                // <div className="nocourses">
                                //     <h1>No Courses</h1>
                                // </div> :
                                <>
                                    <div className="graph">
                                        <SimpleBarChart yData={yData} xLabels={xLabels} />
                                    </div>
                                    <div className="calendar">
                                        <Calendar />
                                    </div>
                                </>
                        }
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

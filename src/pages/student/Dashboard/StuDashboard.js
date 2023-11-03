import React, {useState, useEffect} from 'react'
// import MyCourses from './Mycourses/Mycourses'
import Sidebar from './Sidebar/Sidebar'
import LoadingPage from './LoadingPage/LoadingPage'
import Coursescard from './Coursescard/Coursescard'
import getToken from '../../../services/getToken'
import LoadingComponent from '../../Loading/Loading'
import { Navigate } from 'react-router-dom'
import { getStudentDashboard, getStudentProfile } from '../../../services/Apis';

function StuDashboard() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dashboardData, setdashboardData] = useState(null);
    const [profile, setProfile] = useState(null);

    console.log(dashboardData)
    console.log(profile)


    const token = getToken('student');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const [dashboardData, profile] = await Promise.all([
                        getStudentDashboard(),
                        getStudentProfile()
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
            <Sidebar />
            <LoadingPage />
            <Coursescard coursesData={dashboardData}/>
            {/* <div className="container"> */}

            {/* <MyCourses /> */}
            {/* </div> */}
        </>
    )
}

export default StuDashboard

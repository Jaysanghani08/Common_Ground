import React, {useState, useEffect} from 'react'
// import MyCourses from './Mycourses/Mycourses'
import Sidebar from './Sidebar/Sidebar'
import LoadingPage from './LoadingPage/LoadingPage'
import Coursescard from './Coursescard/Coursescard'
import getToken from '../../../services/getToken'
import LoadingComponent from '../../Loading/Loading'
import { Navigate } from 'react-router-dom'
import { getEducatorProfile, getIncome } from '../../../services/Apis';


function StuDashboard() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState(null);

    const token = getToken('educator');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {

                    const userId = 1; // Assume user ID is 1 for this example
                    const [userData, income] = await Promise.all([
                        getEducatorProfile(userId)
                        // fetchUserPosts(userId)
                    ]);
                    setUserData(userData);
                    // setUserPosts(userPosts);
                    setLoading(false);
                }
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures useEffect runs once after initial render

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
            <Sidebar />
            <LoadingPage />
            <Coursescard />
            {/* <div className="container"> */}

            {/* <MyCourses /> */}
            {/* </div> */}
        </>
    )
}

export default StuDashboard

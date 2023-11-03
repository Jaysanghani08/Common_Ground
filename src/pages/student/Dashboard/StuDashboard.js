import React, {useState, useEffect} from 'react'
// import MyCourses from './Mycourses/Mycourses'
import Sidebar from './Sidebar/Sidebar'
import LoadingPage from './LoadingPage/LoadingPage'
import Coursescard from './Coursescard/Coursescard'
import getToken from '../../../services/getToken'
import LoadingComponent from '../../Loading/Loading'
import { Navigate } from 'react-router-dom'
import { getEducatorProfile, getIncome } from '../../../services/Apis';

const coursesData = [
    {
        "coursedescription": "Computer Network is Group of interconnected Nodes or computing devices that exchange data and resources with each other. A network between these devices can be establish using cable or wireless media. The world’s first banner ad was placed on the HotWired website in 1994. It was a simple message that read “Have you ever clicked your mouse right here? You will.",
        "totalstudentenrolled": 50,
        "courserating": 3,
        "coursename": "Computer Networks",
        "Index": "1",
        "course_id": "1",
        "price": "8",
        "instructor": "PS Kalyan"
    },
    {
        "coursedescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta. In hac habitasse platea dictumst. Vestibulum id odio at nunc soda Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta",
        "totalstudentenrolled": 92,
        "courserating": 3,
        "coursename": "coursename 3",
        "Index": "3",
        "course_id": "3",
        "price": "100",
        "instructor": "PS Kalyan"
    },
    {
        "coursedescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta. In hac habitasse platea dictumst. Vestibulum id odio at nunc soda Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt at nunc sed commodo. Ut et lectus nunc. Pellentesque tempor augue a commodo porta. In hac ",
        "totalstudentenrolled": 8,
        "courserating": 3.7,
        "coursename": "coursename 4",
        "Index": "4",
        "course_id": "7",
        "price": "39",
        "instructor": "PS Kalyan"
    }
]

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
            <Coursescard coursesData={coursesData}/>
            {/* <div className="container"> */}

            {/* <MyCourses /> */}
            {/* </div> */}
        </>
    )
}

export default StuDashboard

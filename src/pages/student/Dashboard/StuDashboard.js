import React from 'react'
// import MyCourses from './Mycourses/Mycourses'
import Sidebar from './Sidebar/Sidebar'
import LoadingPage from './LoadingPage/LoadingPage'
import Coursescard from './Coursescard/Coursescard'

function StuDashboard() {
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

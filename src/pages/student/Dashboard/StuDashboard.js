import React from 'react'
// import MyCourses from './Mycourses/Mycourses'
import Navbar from './Sidebar/Sidebar'
import LoadingPage from './LoadingPage/LoadingPage'
// import "./StuDashboard.css"

function StuDashboard() {
    return (
        <>
        {/* // <div> */}
            <Navbar />
            <LoadingPage />
         
        {/* //     </div> */}
        </>
    )
}

export default StuDashboard

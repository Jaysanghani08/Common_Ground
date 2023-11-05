import React from 'react'
import Navbar from '../Dashboard/Sidebar/Sidebar'

const EnrolledCourses = () => {
    return (
        <div>
            <Navbar />
            {/* <video src='http://localhost:8000/Campus_Diaries_S1_Ep1.mp4' style={{ margin: "80px" }}> </video> */}

            <video
                allow="fullscreen"
                frameBorder="0"
                width="100%"
                height="700"
                controls
                controlsList="nodownload"
            >
                <source src="http://localhost:8000/Campus_Diaries_S1_Ep1.mp4" />
            </video>
        </div>
    )
}

export default EnrolledCourses

import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EduLogin from "./../pages/Educator/EduLogin/EduLogin"
import EduFP from "./../pages/Educator/EduForgetPass/EduFP"
import EduResetPass from "./../pages/Educator/EduResetPass/EduResetPass"
import EduDashboard from "./../pages/Educator/Dashboard/EduDashboard";
import EduProfile from "./../pages/Educator/EduProfile/EduProfile"
import EduOfferedCourses from "./../pages/Educator/EduOfferedCourses/EduOfferedCourses";
import EduCreateCourse from "./../pages/Educator/CreateCourse/EduCreateCourse";
import Sidebar from '../pages/Educator/Dashboard/Sidebar/Sidebar'
import EduRegister from "../pages/Educator/EduRegister/EduRegister.js"

const EduRoutes = () => {
    return (
        <>
            <Sidebar />
            <Routes>
                {/* <Route > */}
                    {/* <Route index element={<EduRegister />} /> */}
                    <Route path='register' element={<EduRegister />} />
                    <Route path='login' element={<EduLogin />} />
                    <Route path='forgetpassword' element={<EduFP />} />
                    <Route path='resetpassword/:id/:token' element={<EduResetPass />} />
                    <Route path='/dashboard' element={<EduDashboard />} />
                    <Route path='profile' element={<EduProfile />} />
                    <Route path='create-course' element={<EduCreateCourse />} />
                    <Route path='offered-courses' element={<EduOfferedCourses />} />
                {/* </Route> */}
            </Routes>
        </>
    )
}

export default EduRoutes

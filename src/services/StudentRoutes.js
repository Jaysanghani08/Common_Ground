import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StudentRegister from "../pages/student/studentRegister/StudentRegister";
import StudentLogin from "../pages/student/studentLogin/StudentLogin";
import StudentFP from "../pages/student/ForgetPass/StudentFP";
import ResetPass from "../pages/student/ResetPass.js/ResetPass";
import StuDashboard from "../pages/student/Dashboard/StuDashboard";
import Navbar from '../pages/student/Dashboard/Navbar/Navbar';

const StudentRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<StudentRegister />} />
                <Route path='register' element={<StudentRegister />} />
                <Route path='login' element={<StudentLogin />} />
                <Route path='forgetpassword' element={<StudentFP />} />
                <Route path='resetpassword/:id/:token' element={<ResetPass />} />
                <Route path='dashboard' element={<StuDashboard />} />
            </Routes>
        </>
    )
}

export default StudentRoutes

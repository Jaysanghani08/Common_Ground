import { Routes, Route } from "react-router-dom"
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import StudentRegister from "./pages/student/studentRegister/StudentRegister";
import StudentLogin from "./pages/student/studentLogin/StudentLogin";
import Error from "./pages/Error"
import StudentFP from "./pages/student/ForgetPass/StudentFP";
import ResetPass from "./pages/student/ResetPass.js/ResetPass";
import EduRegister from "./pages/Educator/EduRegister/EduRegister";
import EduLogin from "./pages/Educator/EduLogin/EduLogin"
import EduFP from "./pages/Educator/EduForgetPass/EduFP"
import EduResetPass from "./pages/Educator/EduResetPass/EduResetPass"
import EduDashboard from "./pages/Educator/Dashboard/EduDashboard";
import EduProfile from "./pages/Educator/EduProfile/EduProfile"
import EditEduProfile from "./pages/Educator/EduProfile/EditEduProfile"
import EduOfferedCourses from "./pages/Educator/EduOfferedCourses/EduOfferedCourses";
import EduCreateCourse from "./pages/Educator/CreateCourse/EduCreateCourse";
import Example from "./pages/tmp";
import StuDashboard from "./pages/student/Dashboard/StuDashboard";
import SmoothScroll from "smooth-scroll";
import CourseDetails from "./pages/CourseDetail/CourseDetails";
import HomePage from "./pages/HomePage/HomePage";
import StuViewCourses from "./pages/student/ViewCourses/StuViewcourses";
import Logout from "./pages/Logout/Logout"
import EnrolledCourses from "./pages/student/EnrolledCourses/EnrolledCourses";
import StuProfile from "./pages/student/studentProfile/StuProfile"
import EditStuProfile from "./pages/student/studentProfile/EditStuProfile"

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/tmp' element={<Example />} />
                <Route path='/course/:courseId' element={<CourseDetails />} />
                <Route path='/homepage' element={<HomePage />} />
                <Route path='/student' >
                    <Route index element={<StuDashboard />} />
                    <Route path='register' element={<StudentRegister />} />
                    <Route path='login' element={<StudentLogin />} />
                    <Route path='logout' element={<Logout />} />
                    <Route path='forgetpassword' element={<StudentFP />} />
                    <Route path='resetpassword/:id/:token' element={<ResetPass />} />
                    <Route path='dashboard' element={<StuDashboard />} />
                    <Route path='view-courses' element={<StuViewCourses />} />
                    <Route path='enrolled-courses' element={<EnrolledCourses />} />
                    <Route path='profile' element={<StuProfile />} />
                    <Route path='update' element={<EditStuProfile />} />
                </Route>
                <Route path='/educator'>
                    <Route index element={<EduRegister />} />
                    <Route path='register' element={<EduRegister />} />
                    <Route path='login' element={<EduLogin />} />
                    <Route path='logout' element={<Logout />} />
                    <Route path='forgetpassword' element={<EduFP />} />
                    <Route path='resetpassword/:id/:token' element={<EduResetPass />} />
                    <Route path='dashboard' element={<EduDashboard />} />
                    <Route path='profile' element={<EduProfile />} />
                    <Route path='update' element={<EditEduProfile />} />
                    <Route path='create-course' element={<EduCreateCourse />} />
                    <Route path='offered-courses' element={<EduOfferedCourses />} />
                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    );
}

export default App;

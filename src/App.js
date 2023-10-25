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

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<StudentRegister />} />
                <Route path='/student' >
                    <Route index element={<StudentRegister />} />
                    <Route path='register' element={<StudentRegister />} />
                    <Route path='login' element={<StudentLogin />} />
                    <Route path='forgetpassword' element={<StudentFP />} />
                    <Route path='resetpassword/:id/:token' element={<ResetPass />} />
                </Route>
                <Route path='/educator' >
                    <Route index element={<EduRegister />} />
                    <Route path='register' element={<EduRegister />} />
                    <Route path='login' element={<EduLogin />} />
                    <Route path='forgetpassword' element={<EduFP />} />
                    <Route path='resetpassword/:id/:token' element={<EduResetPass />} />
                    <Route path='dashboard' element={<EduDashboard />} />

                </Route>
                <Route path='*' element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
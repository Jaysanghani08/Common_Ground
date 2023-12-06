import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import { sentOtpFunction } from "../services/Apis";
import Spinner from 'react-bootstrap/Spinner';
import { studentresetpasswordfunction } from '../../../services/Apis';
import style from "../studentLogin/studentlogin.module.css";

const StudentFP = () => {
    const [inputdata, setInputdata] = useState({
        password : ""
    });
    const [spiner,setSpiner] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputdata({
            ...inputdata,
            [name]: value
        })
    }

    // forgetPass
    const forgetPass = async (e) => {
        e.preventDefault();

        if (inputdata.email === "") {
            toast.error("Enter Your Email !")
        } else if (!inputdata.email.includes("@")) {
            toast.error("Enter Valid Email !")
        }
        
        else {
            setSpiner(true)
            const data = {
                email: inputdata.email
            }

            const response = await studentresetpasswordfunction(data);

            if (response?.status === 200) {
                setSpiner(false)
                // //console.log(data)
                toast.success("Link Send Successfully");
                // navigate("/user/otp",{state:email})
            } else {
                toast.error("Something went wrong ! Please try again");
            }
        }
    }

    return (
        <div className='outerdiv'>
            <section className={style.section}>
                <div className={style.imgBox}> 
                    <img src="../images/forgot-password.avif"></img>
                </div>
                <div className={style.form_data}>
                    <div className={style.form_heading}>
                        <h1>Forget Password</h1>
                        {/* <p></p> */}
                    </div>
                    <form>
                        <div className={style.form_input}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="" onChange={handleChange} placeholder='Enter Your Email Address' />
                        </div>
                        <button className={style.btn} onClick={forgetPass}>Send
                        {
                            spiner ? <span><Spinner animation="border" /></span>:""
                        }
                        </button>
                        <p>Don't have an account <NavLink to="/student/register">Sign up</NavLink> </p>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}

export default StudentFP

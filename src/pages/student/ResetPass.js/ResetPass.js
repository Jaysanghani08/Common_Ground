import React, { useState } from 'react'
import {useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import { sentOtpFunction } from "../services/Apis";
import style from './../studentLogin/studentlogin.module.css'
import Spinner from 'react-bootstrap/Spinner';
import { studentupdatepasswordfunction } from '../../../services/Apis';

const ResetPass = () => {
    const { id, token } = useParams();
    //console.log(id, token)
    const [inputdata, setInputdata] = useState({
        password: "",
        cpassword: ""
    });
    const [paswordshow, setPaswordShow] = useState(false);
    const [spiner, setSpiner] = useState(false);

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

        if (inputdata.password === "") {
            toast.error("Enter Your Email !")
        } else if (inputdata.password.length < 6) {
            toast.error("Password length must be atleast 6 !")
        } else if (inputdata.password !== inputdata.cpassword) {
            toast.error("Password doesn't match !")
        }

        else {
            // setSpiner(true)
            const data = {
                password: inputdata.password,
                userid: id,
                token: token
            }

            const response = await studentupdatepasswordfunction(data);

            if (response?.status === 200) {
                setSpiner(false)
                toast.success("Password Updated Successfully");
                // navigate("/user/otp",{state:email})
            } 
            else if(response?.status === 404){
                toast.error("User not found !");
            }   
            else {
                toast.error("Something went wrong ! Please try again");
            }
        }
    }

    return (
        <div className={style.outerdiv}>
            <section className={style.section}>
            <div className={style.imgBox}> 
                    <img src="../images/forgot-password.avif"></img>
                </div>
                <div className={style.form_data}>
                    <div className={style.form_heading}>
                        <h1>Reset Your Password</h1>
                        {/* <p></p> */}
                    </div>
                    <form>
                        <div className={style.form_input}>
                            <label htmlFor="password">Password</label>
                            <div className={style.two}>
                                <input type={!paswordshow ? "password" : "text"} name="password" onChange={handleChange} value={inputdata.password} placeholder='Enter Your password' />
                                <div className={style.showpass} onClick={() => setPaswordShow(!paswordshow)} >
                                    {!paswordshow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className={style.form_input}>
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" name="cpassword" id='' value={inputdata.cpassword} onChange={handleChange} placeholder='Confirm your Password' />
                        </div>
                        <button className={style.btn} onClick={forgetPass}>Send
                            {
                                spiner ? <span><Spinner animation="border" /></span> : ""
                            }
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}

export default ResetPass
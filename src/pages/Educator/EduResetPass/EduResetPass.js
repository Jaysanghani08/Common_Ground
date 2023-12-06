import React, { useState } from 'react'
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { eduupdatepasswordfunction } from "./../../../services/Apis";
import Spinner from 'react-bootstrap/Spinner';

const EduResetPass = () => {
    const { id, email, token } = useParams();
    const [paswordshow, setPaswordShow] = useState(false);
    console.log(email)
    // //console.log(token)
    const [inputdata, setInputdata] = useState({
        password: "",
        cpassword: ""
    });
    const [spiner, setSpiner] = useState(false);
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

        if (inputdata.password === "") {
            toast.error("Enter Your Email !")
        } else if (inputdata.password.length < 6) {
            toast.error("Password length must be atleast 6 !")
        } else if (inputdata.password !== inputdata.cpassword) {
            toast.error("Password doesn't match !")
        }

        else {
            setSpiner(true)
            const data = {
                password: inputdata.password,
                email: email,
                token: token
            }

            const response = await eduupdatepasswordfunction(data);
            // //console.log(response)

            if (response?.status === 200) {
                setSpiner(false)
                toast.success("Password Updated Successfully");
                navigate("/educator/login")
            } else {
                toast.error("Something went wrong !");
            }
        }
    }

    return (
        <div className='outerdiv'>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Reset Your Password</h1>
                        {/* <p></p> */}
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className='two'>
                                <input type={!paswordshow ? "password" : "text"} name="password" onChange={handleChange} value={inputdata.password} placeholder='Enter Your password' />
                                <div className='showpass' onClick={() => setPaswordShow(!paswordshow)} >
                                    {!paswordshow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="cpassword">Confirm Password</label>
                            <input type="password" name="cpassword" id='' value={inputdata.cpassword} onChange={handleChange} placeholder='Confirm your Password' />
                        </div>
                        <button className='btn' onClick={forgetPass}>Send
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

export default EduResetPass
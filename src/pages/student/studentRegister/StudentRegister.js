import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {studentregisterfunction } from "../../../services/Apis";
import { Link, useNavigate } from "react-router-dom";
import style from "../studentLogin/studentlogin.module.css";
import "./studentregister.css";
import { country_list } from "./../../../data/countries"

const StudentRegister = () => {

    const [paswordshow, setPaswordShow] = useState(false);

    const [inputdata, setInputdata] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        phone: "",
        dob: "",
        education: "",
        gender: "",
        username: "",
        location: ""
    });

    // //console.log(inputdata)

    const navigate = useNavigate();
    const today = new Date();
const maxDate = today.toISOString().split('T')[0];

    // set input value as user enters
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "dob") {
            
            const selectedDate = new Date(value);
            if (selectedDate > today) {
              alert("Please select a past date");
            } else {
              setInputdata({
                ...inputdata,
                [name]: value
              });
            }
          } else {
            setInputdata({
              ...inputdata,
              [name]: value
            });
          }
        };
    



    const handleGenderChange = (e) => {
        setInputdata({
            ...inputdata,
            gender: e.target.value,
        });
    };

    const handleEducationLevelChange = (e) => {
        setInputdata({
            ...inputdata,
            education: e.target.value,
        });
    };

    const handleCountryChange = (e) => {
        setInputdata({
            ...inputdata,
            location: e.target.value,
        });
    };
    const selectedDate = new Date(inputdata.dob);
  if (selectedDate > today) {
    alert("Please select a past date for Date of Birth");
    return;
  }

    // register data
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { fname, email, password } = inputdata;

        if (inputdata.fname === "") {
            toast.error("Enter Your First Name")
        } else if (inputdata.lname === "") {
            toast.error("Enter Your Last Name")
        }
        else if (inputdata.email === "") {
            toast.error("Enter Your Email")
        } else if (!inputdata.email.includes("@")) {
            toast.error("Enter Valid Email")
        } else if (inputdata.phone === "") {
            toast.error("Enter Your Phone no.")
        } else if (inputdata.dob === "") {
            toast.error("Enter Your DOB")
        } else if (inputdata.location === "") {
            toast.error("Select Your Country")
        } else if (inputdata.gender === "") {
            toast.error("Select Your Gender")
        } else if (inputdata.username === "") {
            toast.error("Enter Desired Username")
        }
        else if (inputdata.password === "") {
            toast.error("Enter Your Password")
        } else if (inputdata.password.length < 6) {
            toast.error("password length minimum 6 character")
        }
        else {
            const response = await studentregisterfunction(inputdata);

            //console.log(response)

            if (response?.status === 201) {
                setInputdata({
                    ...inputdata,
                    fname: "",
                    lname: "",
                    email: "",
                    password: "",
                    phone: "",
                    dob: "",
                    education: "",
                    gender: "",
                    username: "",
                    location: ""
                });
                navigate("/student/login")
                toast.success("Registered Successfully")
            } 
            else if (response?.status === 409) {
                toast.error("Credentials already exists");
            }
            else {
                toast.error("Something went wrong ! Please try again");
                // //console.log(inputdata)
                // toast.error("response?.response?.data.error");
            }
        }
    }


    return (
        <div className='outerdiv'>
            <section className='register_section'>
                <div className="register_form_data">
                    <div className="form_heading">
                        <h1>Sign Up</h1>
                        <p>Welcome to Common Ground</p>
                    </div>
                    <form className='register_form'>
                        <div className={style.form_input}>
                            <label htmlFor="fname">First Name</label>
                            <input type="text" value={inputdata.fname} name="fname" onChange={handleChange} placeholder='Enter Your First Name' maxLength={15}  />
                        </div>
                        <div className={style.form_input}>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" name="lname" value={inputdata.lname} onChange={handleChange} placeholder='Enter Your Last Name' maxLength={15}/>
                        </div>
                        <div className={style.form_input}>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={inputdata.email} onChange={handleChange} placeholder='Enter Your Email Address' maxLength={320} />
                        </div>
                        <div className={style.form_input}>
                            <label htmlFor="phone">Phone</label>
                            <input type="string" name="phone" value={inputdata.phone} onChange={handleChange} placeholder='Enter Your Phone no.' maxLength={10} />
                        </div>
                        <div className={style.form_input}>
                            <label htmlFor="dob">DOB</label>
                            {/* <input type="date" name="dob" value={inputdata.dob} onChange={handleChange} /> */}
                            <input type="date" name="dob" value={inputdata.dob} onChange={handleChange} max={maxDate} />
                        </div>

                        <div className={style.form_input}>
                            <label htmlFor="gender">Gender </label>
                            <select id="educationLevel" name="gender" value={inputdata.gender} onChange={handleGenderChange} >
                                <option value="">Select...</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                
                            </select>
                        </div>

                        <div className={style.form_input}>
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country" value={inputdata.location} onChange={handleCountryChange} >
                                <option value="">Select...</option>

                                {
                                    country_list.map((item, index) => {
                                        return (
                                            <option key={index} value={item}>{item}</option>
                                        )
                                    }
                                    )
                                }
                            </select>
                        </div>

                       
                        <div className={style.form_input}>
                            <label htmlFor="username">Username</label>
                            <input type="string" value={inputdata.username} name="username" onChange={handleChange} placeholder='Enter username' maxLength={20} />
                        </div>
                        <div className={style.form_input}>
                            <label htmlFor="password">Password</label>
                            <div className='two'>
                                <input type={!paswordshow ? "password" : "text"} name="password" value={inputdata.password} onChange={handleChange} placeholder='Enter Your password' maxLength={20} />
                                <div className={style.showpass} onClick={() => setPaswordShow(!paswordshow)} >
                                    {!paswordshow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <button className={style.btn} onClick={handleSubmit}>Sign Up</button>
                    </form>
                        <p>Already have an account ? </p>
                        <Link className='register_custom-link' to="/student/login"> Login here</Link>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}

export default StudentRegister

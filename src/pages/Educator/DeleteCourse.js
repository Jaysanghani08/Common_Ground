import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
// import { sentOtpFunction } from "../services/Apis";
import style from './../student/studentLogin/studentlogin.module.css'
import Spinner from 'react-bootstrap/Spinner';
import { handleDeleteCourse } from './../../services/Apis';

const EduDeleteCourse = () => {
    const { urltoken, courseId } = useParams();
    //console.log(id, token)
    // console.log(courseId, courseId)
    const navigate = useNavigate();

    // forgetPass
    const forgetPass = async (e) => {
        e.preventDefault();

        const response = await handleDeleteCourse( urltoken, courseId);
        console.log(response)
        if (response?.status === 200) {
            toast.success("Password Updated Successfully");
            navigate(`/educator/offered-courses`)
        }
        else if (response?.status === 404) {
            toast.error("User not found !");
        }
        else {
            toast.error("Something went wrong ! Please try again");
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
                        <h1>Delete Course</h1>
                        {/* <p></p> */}
                    </div>
                    <form>
                        <div className={style.form_input}>
                            <h3 style={{color: "white"}}>Are you sure want to delete this course ? </h3>
                        </div>
                        <button className={style.btn} onClick={forgetPass}>
                            Yes
                        </button>
                        <button className={style.btn} onClick={() => navigate(`/educator/${courseId}`)}>No</button>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </div>
    )
}

export default EduDeleteCourse

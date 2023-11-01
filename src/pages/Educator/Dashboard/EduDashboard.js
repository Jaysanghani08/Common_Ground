
import './EduDashboard.css';
import React, { useState } from 'react'
import Siderbar from './Sidebar/Sidebar';
import Calendar from './Calendar/Calendar'
import { UilUser } from '@iconscout/react-unicons'
import Cards from './Cards/Cards';
import SimpleBarChart from './Graph/Graph';
import BasicTable from './Table/Table'
import { useNavigate, Navigate } from 'react-router-dom';
import AuthLayout from './../../../services/AuthLayout'
import getToken from '../../../services/getToken';

function EduDashboard() {

    const navigate = useNavigate();
    const token = getToken();
    console.log(token);

    if (!token) {
        navigate('/educator/login');
        return;
    }

    return (
        <>
            {/* <AuthLayout> */}
            <div className="container1">
                <Siderbar />
                <div className="maindash">
                    <div className="header">
                        <div className="heading">
                            <h1>Hello <span>Jay !</span> </h1>
                        </div>
                        <div className="profilephoto">
                            <UilUser size='100' />
                        </div>

                    </div>
                    <div className="cards">
                        <Cards />
                    </div>
                    <div className="graphcal">
                        <div className="graph">
                            <SimpleBarChart />
                        </div>
                        <div className="calendar">
                            <Calendar />
                        </div>
                    </div>
                    <div className="courses">
                        <BasicTable />
                    </div>
                </div>
            </div>

        </>
    )
}

export default EduDashboard;

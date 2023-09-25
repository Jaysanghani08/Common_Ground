
import './EduDashboard.css';
import React, { useState } from 'react'
import Siderbar from './Sidebar/Sidebar';
import Calendar from './Calendar/Calendar'
import { UilUser } from '@iconscout/react-unicons'
import Cards from './Cards/Cards';
import SimpleBarChart from './Graph/Graph';
import BasicTable from './Table/Table'

function EduDashboard() {

    return (
        <>
            <div class="container">
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
    );
}

export default EduDashboard;

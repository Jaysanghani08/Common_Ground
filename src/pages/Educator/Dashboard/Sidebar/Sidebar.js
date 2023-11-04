import React, { useState } from 'react'
import "./Sidebar.css";
import { UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../../../../data/Edusidebar";
import { motion } from 'framer-motion';
import { Link, NavLink,useLocation } from 'react-router-dom';
import Logo  from './../../../../data/imgs/Logo.png'

function Sidebar() {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);
    // console.log(expanded)

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }
    const location = useLocation();
    return (
        <>
        
            <div className='bars' style={expanded ? { left: '50%' } : { left: '5%' }} onClick={() => {setExpanded(!expanded); console.log("clicked")}}>
                <UilBars style={{ color: 'white' }} />
            </div>
            <motion.span className="Sidebar" variants={sidebarVariants} animate={window.innerWidth <= 768 ? `${expanded}` : ''}>

                {/* {logo} */}
                <div className="logo logo-hidden">
                    <img src={Logo} style={{color : '#4b11bf'}} alt='logo'></img>

                </div>
                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (
                            <NavLink to={item.route} key={index} className='navlink'>
                                <div
                                    className={location.pathname === item.route ? 'menuItem active' : 'menuItem'}
                                             key={index}
                                            onClick={() => setSelected(index)}
                                            >
                                        {location.pathname === item.route
                                            ? item.icon({ size: 30, color: 'white' })
                                            : item.icon({ size: 30, color: 'black'  })}
                                        <span>{item.heading}</span>
                                 </div>
                            </NavLink>

                        );
                    })}
                </div>
            </motion.span>

        </>
    )
}

export default Sidebar



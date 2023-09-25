import React, { useState } from 'react'
import "./Sidebar.css";
import { UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../../../../data/Edusidebar";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Logo  from './../../../../data/imgs/Logo.svg'

function Sidebar() {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const sidebarVariants = {
        true: {
            left: '0'
        },
        false: {
            left: '-60%'
        }
    }
    return (
        <>
            <div className='bars' style={expanded ? { left: '50%' } : { left: '5%' }} onClick={() => setExpanded(!expanded)}>
                <UilBars style={{ color: 'white' }} />
            </div>
            <motion.span className="Sidebar" variants={sidebarVariants} animate={window.innerWidth <= 768 ? `${expanded}` : ''}>

                {/* {logo} */}
                <div className="logo">
                    <img src={Logo} style={{color : '#fff'}}></img>

                </div>
                <div className="menu">
                    {SidebarData.map((item, index) => {
                        return (
                            <Link to={item.route} key={index} className='navlink'>
                                <div
                                    className={selected === index ? "menuItem active" : "menuItem"}
                                    key={index}
                                    onClick={() => setSelected(index)}
                                >
                                    {selected === index ? item.icon({ size: 30, color: '#000000' }) : item.icon({ size: 30, color: '#ffffff' })}
                                    <span>{item.heading}</span>
                                </div>
                            </Link>

                        );
                    })}
                </div>
            </motion.span>

        </>
    )
}

export default Sidebar



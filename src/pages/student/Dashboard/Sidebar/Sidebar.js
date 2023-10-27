import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SidebarDataForStudent } from "../../../../data/Edusidebar";

const Navbar = (props) => {
    const location = useLocation();

    const [selected, setSelected] = useState(0);

    return (
        <nav id="menu" className="navbar navbar-default navbar-fixed-top">
            <div className="container">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1"
                    >
                        {" "}
                        <span className="sr-only">Toggle navigation</span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                        <span className="icon-bar"></span>{" "}
                    </button>
                    <NavLink className="navbar-brand page-scroll" to="#page-top">
                        Common Ground
                    </NavLink>{" "}
                </div>

                <div
                    className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1"
                >
                    <ul className="nav navbar-nav navbar-right">

                        {SidebarDataForStudent.map((item, index) => {
                            return (
                                <li>
                                    <NavLink to={item.route} key={index} className='page-scroll'
                                    style={location.pathname === item.route ? {color: "#4b11bf"} : {}}>
                                            {item.heading}
                                    </NavLink>
                                </li>

                            );
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar

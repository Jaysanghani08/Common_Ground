import React from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const Logout = () => {

    Cookies.remove('token');

    return (
        <Navigate to="/homepage" />
    )
}

export default Logout

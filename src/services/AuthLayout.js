import React from 'react';
import { useNavigate, Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'

const AuthLayout = ({ children }) => {

    const navigate = useNavigate();
    const isAuthenticated = Cookies.get('token');
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return <>{children}</>;
};

export default AuthLayout;

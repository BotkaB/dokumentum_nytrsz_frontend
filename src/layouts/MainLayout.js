import React from "react";
import Navigacio from "../components/Navigacio.jsx";
import { ToastContainer } from 'react-toastify'; 
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
        <Navigacio />
        <ToastContainer /> {}
        <Outlet />
        </>
    );
}
import React from "react";
import Navigacio from "../components/Navigacio.jsx";
import { Outlet } from "react-router-dom";

export default function VendegLayout() {
    return (
        <>
          <Navigacio />
       
        <Outlet />
        </>
    );
}
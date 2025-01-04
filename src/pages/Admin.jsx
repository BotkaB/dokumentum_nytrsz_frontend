import React from "react";
import useAuthContext from "../contexts/AuthContext"; 
import { Navigate } from "react-router-dom";  


export default function Admin() {
  const { user } = useAuthContext(); 
 
  console.log(user)
    // Ha a felhasználónak nincs jogosultsága, irányítsuk át a kezdőlapra
    if (user && user.role !== 0) {
      return <Navigate to="/" replace />;
    }
  
    // Ha jogosultsága van, megjelenítjük a dokumentumokat
    if (user && user.role === 0) { 
  return (
    <div>   
      <h1>Admin</h1>
    </div>
  );
}
}

import React, { useEffect, useState } from "react";
import useAuthContext from "../contexts/AuthContext"; 

export default function Dokuments() {
  const { user } = useAuthContext(); 

  useEffect(() => {
    if (user) {
      if (user.role === 0) {
        
      } else {
        alert("Nincs jogosultságod ehhez az oldalhoz!");
      }
    }
  }, [user]);

  
  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

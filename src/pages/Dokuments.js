
import React, { useEffect, useState } from "react";
import useAuthContext from "../contexts/AuthContext"; 

export default function Dokuments() {
  const { user } = useAuthContext(); 

  useEffect(() => {
    if (user) {
      if (user.role <= 1) {
        
      } else {
        alert("Nincs jogosultságod ehhez az oldalhoz!");
      }
    }
  }, [user]);

  
  return (
    <div>
      <h1>Dokumentumok</h1>
    </div>
  );
}

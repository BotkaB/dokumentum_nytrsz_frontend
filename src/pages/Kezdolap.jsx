import React, { useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Kezdolap() {
  const { user, getUser } = useAuthContext(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      getUser();  // Ha nincs bejelentkezett felhasználó, próbáljuk meg lekérni
    }
  }, [user, getUser]);

  const navigateToRolePage = (role) => {
    // Navigálás a megfelelő szerepkör oldalra
    if (role === 0) {
      navigate("/admin");
    } else if (role === 1) {
      navigate("/documents");
    } else if (role === 2) {
      navigate("/statistics");
    }
  };

  return (
    <div>
     
      {user ? (
        <>
          <p>Kedves: {user.name}</p>
          <p>Jogosultságod: {user.role === 0 ? "Admin" : user.role === 1 ? "Dokumentumellenőrző" : "Statisztikai lekérdező"}</p>
        
        </>
      ) : (
        <p>Kedves Látogató!</p>
      )}
    </div>
  );
}

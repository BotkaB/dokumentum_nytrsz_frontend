import React from "react";
import useAuthContext from "../contexts/AuthContext";


export default function Kezdolap() {
  const { user} = useAuthContext(); 

  return (
    <div>
     
      {user ? (
        <>
          <p>Kedves: {user.name}</p>
          <p>Jogosultságod: {user.role === 0 ? "Admin" : user.role === 1 ? "Dokumentumellenőrző" : user.role === 2?"Statisztikai lekérdező":"Ismeretlen szerep"}</p>

        </>
      ) : (
        <p>Kedves Látogató!</p>
      )}
    </div>
  );
}

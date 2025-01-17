import React from "react";
import useAuthContext from "../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Kezdolap() {
  const { user} = useAuthContext(); 

  return (
    <div className="container-fluid" style={{
      backgroundImage: 'url("/Kezdooldal_hatterkep.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      height: '100vh',
      margin: 0
  }}>
      
     
      
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


import React from "react";
import useAuthContext from "../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import '../css/Kezdolap.css'; 

export default function Kezdolap() {
  const { user} = useAuthContext(); 
  const navigate = useNavigate()

  return (
    <article className="kezdolap">
      {user ? (
        user.role <= 2 ? (
          <>
            <p className="user-info">Kedves: {user.name}</p>
            <p className="user-info">Jogosultságod: {user.role === 0 ? "Admin" : user.role === 1 ? "Dokumentumellenőrző" : user.role === 2 ? "Statisztikai lekérdező" : "Ismeretlen szerep"}</p>
          </>
        ) : (
          navigate("/nincsjogosultsag")
        )
      ) : (
        <p className="user-info">Kedves Felhasználó!</p>
      )}
    </article>
  );
}

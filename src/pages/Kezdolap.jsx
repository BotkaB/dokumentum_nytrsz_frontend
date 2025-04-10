import React from "react";
import useAuthContext from "../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";


export default function Kezdolap() {
  const { user} = useAuthContext(); 
  const navigate = useNavigate()


  return (
    <article className="container-fluid" style={articleStyle}>
     
      {user?(  user.role<=2 ? (
        <>
          <p style={pStyle}>Kedves: {user.name}</p>
         
          <p style={pStyle}>Jogosultságod: {user.role === 0 ? "Admin" : user.role === 1 ? "Dokumentumellenőrző" : user.role === 2 ? "Statisztikai lekérdező" : "Ismeretlen szerep"}</p>
        </>
      ) : (
     
          navigate("/nincsjogosultsag")
         
        
     
      )  ):(<p style={pStyle}>Kedves Felhasználó!</p>)}
    </article>
  );
}

const articleStyle = {
  backgroundImage: 'url("/Kezdooldal_hatterkep.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  height: '100vh',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  paddingTop: '25.8vh'
};

const pStyle = {
  margin: '0.1rem 0 0 0',
  paddingLeft: '1.5rem', 
  fontSize: '1.9rem'
};

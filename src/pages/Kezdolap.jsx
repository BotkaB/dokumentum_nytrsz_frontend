import React from "react";
import useAuthContext from "../contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Kezdolap() {
  const { user } = useAuthContext(); 

  return (
    <article className="container-fluid" style={articleStyle}>
      {user ? (
        <>
          <p style={pStyle}>Kedves: {user.name}</p>
          <p style={pStyle}>Jogosultságod: {user.role === 0 ? "Admin" : user.role === 1 ? "Dokumentumellenőrző" : user.role === 2 ? "Statisztikai lekérdező" : "Ismeretlen szerep"}</p>
        </>
      ) : (
        <p style={pStyle}>Kedves Látogató!</p>
      )}
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
  paddingTop: '30vh' // Kicsit fentebb hozva a p tageket az article egyharmadánál
};

const pStyle = {
  margin: '0 0 1rem 0', // Például szép stílusok
  fontSize: '1.2rem'
};



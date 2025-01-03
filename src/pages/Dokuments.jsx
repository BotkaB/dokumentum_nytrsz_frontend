import React from "react";
import { Navigate } from "react-router-dom";  
import useAuthContext from "../contexts/AuthContext";

export default function Dokuments() {
  const { user } = useAuthContext(); 
console.log(user)
  // Ha a felhasználónak nincs jogosultsága, irányítsuk át a kezdőlapra
  if (user && user.role > 1) {
    return <Navigate to="/" replace />;
  }

  // Ha jogosultsága van, megjelenítjük a dokumentumokat
  if (user && user.role <= 1) {
    return (
      <div>
        <h1>Dokumentumok</h1>
        {/* Dokumentumok listája vagy egyéb tartalom */}
      </div>
    );
  }
console.log("hello")
  // Ha nincs felhasználó, akkor null-t adunk vissza
  return null;
}

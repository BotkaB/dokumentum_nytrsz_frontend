import React, { useEffect, useState } from "react";
import useAuthContext from "../contexts/AuthContext"; // A felhasználó adatainak eléréséhez

export default function Statistics() {
  const { user } = useAuthContext(); // A bejelentkezett felhasználó elérése
 // const [statistics, setStatistics] = useState(null); // A statisztikai adatokat itt tároljuk

  // Lekérdezzük a statisztikai adatokat, ha a felhasználó jogosultsága engedi
  useEffect(() => {
    if (user) {
      if (user.role <= 2) {
       console.log(user.role);
    
      } else {
        alert("Nincs jogosultságod ehhez az oldalhoz!");
      }
    }
  }, [user]);

 
  return (
    <div>
      <h1>Statisztikák</h1>
    </div>
  );
}

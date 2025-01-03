import React from "react";
import useAuthContext from "../contexts/AuthContext"; // A felhasználó adatainak eléréséhez
import { Navigate } from "react-router-dom";  

export default function Statistics() {
  const { user } = useAuthContext(); // A bejelentkezett felhasználó elérése
 // const [statistics, setStatistics] = useState(null); // A statisztikai adatokat itt tároljuk


      if (!(0<=user.role<= 2)) {
        return <Navigate to="/" replace />;
    
      } else {
  
  return (
    <div>
      <h1>Statisztikák</h1>
    </div>
  );
}
}

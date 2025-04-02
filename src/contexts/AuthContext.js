import { createContext, useContext, useState, useEffect } from "react";
import { myAxios } from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: ""
  });
  const csrf = () => myAxios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    try {
      const response = await myAxios.get("/api/user");
      console.log("Teljes válasz:", response);
      console.log("Válasz adatok:", response.data);
      setUser(response.data); // Felhasználói adatok frissítése
    } catch (error) {
      console.error("Hiba történt a felhasználó adatainak lekérése során:", error);
      if (error.response) {
        console.error("Hibaüzenet:", error.response.data);
      }
    }
  };
  
  useEffect(() => {
   // if (user){
      getUser();
   // }
  }, [ ]);

  const logout = async () => {
    await csrf();
    try {
      const resp = await myAxios.post("/logout");
      console.log("Kijelentkezés sikeres:", resp);
      setUser(null); // A felhasználó adatainak törlése
  
          navigate("/"); // Navigálás a főoldalra
      
   
  
    } catch (error) {
      console.error("Hiba történt a kijelentkezéskor:", error);
    }

  };

  // useEffect hook a user állapot figyelésére
useEffect(() => {
  console.log(user); // Ez most már a frissített állapotot mutatja
}, [user]);
  

  const loginReg = async ({ ...adat }, vegpont) => {
    await csrf();
    console.log(adat, vegpont);

    try {
      const response = await myAxios.post(vegpont, adat);
      console.log("siker:", response.data);

      // Ellenőrizzük, hogy a válasz tartalmazza-e a user adatokat
      if (response.data && response.data.user) {
        setUser(response.data.user); // A felhasználó adatainak beállítása

        console.log("Felhasználó adatai a válaszban:", response.data.user);
      } else {
        console.log("Nincs felhasználó adat a válaszban.", response);
        
        // Debug 
        console.log(response.data); // Nézzük meg, mi van a response.data-ban
      }

      navigate("/"); // Navigálunk a főoldalra a sikeres bejelentkezés után
    } catch (error) {
      console.error("Hiba történt:", error);
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };


  return (
    <AuthContext.Provider value={{ logout, loginReg, errors, setErrors, getUser, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}


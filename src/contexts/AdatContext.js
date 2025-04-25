import { createContext, useContext, useEffect, useState } from "react";
import { myAxios } from "../api/axios";
import lista from "../data/data";

// AdatContext létrehozása
const AdatContext = createContext();

// AdatProvider komponens, amely biztosítja az adatokat a gyermek komponensek számára
export const AdatProvider = ({ children }) => {
  
  const [objLista, setObjLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabla, setTabla] = useState(lista.dokumentum_tipuses);
 console.log("AdatProvider init", objLista);

  const adatlekeres = async () => {
    setLoading(true);
    console.log("adatlekeres fut. Aktuális tabla:", tabla);

    try {
      const { data } = await myAxios.get(tabla?.apik.indexUrl);
      console.log("API válasz:", data);

      const tomb = Array.isArray(data) ? data : (data.data || data); 
      console.log("Feldolgozott adatok:", tomb);

      if (tabla === lista.users) {
        const passwordData = tomb.map(item => ({
          ...item,
          password: "",
          password_confirmation: ""
        }));
        setObjLista(passwordData);
      } else {
        setObjLista(tomb);
      }

    
    } catch (error) {
      console.error("API hiba:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tabla) {
      adatlekeres();
    }
  }, [tabla]);
  
  const valtoztatasTabla = (tablaValaszto) => {
    const t = lista[tablaValaszto];
    if (t) {
      setTabla(t);
      console.log("Beállított tábla:", t);
    } else {
      console.error(`A(z) ${tablaValaszto} tábla nem található!`);
    }
  };

  // Egyedi lekérés tetszőleges URL-ről, nem változtatja meg a globális `tabla`-t
const adatlekeresEgyediUrl = async (url) => {
  try {
    const { data } = await myAxios.get(url);
    const tomb = Array.isArray(data) ? data : (data.data || data); 
    return tomb;
  } catch (error) {
    console.error("Kapcsolt adat lekérés hiba:", error);
    return [];
  }
};


  return (
    <AdatContext.Provider value={{ objLista, loading, adatlekeres, tabla, valtoztatasTabla,    adatlekeresEgyediUrl,}}>
      {children}
    </AdatContext.Provider>
  );
};

export default function useAdatContext() {
  return useContext(AdatContext);
}

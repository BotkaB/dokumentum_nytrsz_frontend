import React, { createContext, useContext, useState, useEffect } from 'react';
import { myAxios } from "../api/axios";
import lista from "../data/data";

const AdatContext = createContext();

export const AdatProvider = ({ children }) => {
  const [objLista, setObjLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabla, setTabla] = useState(lista.users); 


  // Adatok lekérése az aktuális táblához
  const adatlekeres = async () => {
    console.log("adatlekeres fut. Aktuális tabla:", tabla);
    const url = tabla.apik.indexUrl;
    try {
      const { data } = await myAxios.get(url);
      console.log("API válasz:", data); 

      
      const tomb = Array.isArray(data) ? data : (data.data || data); 

      console.log("Feldolgozott adatok:", tomb); 

      if (tabla === lista.users) {
        const updatedData = tomb.map(item => ({
          ...item,
          password: "",
          password_confirmation: ""
        }));
       
        setObjLista(updatedData);
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
    console.log("Aktuális objLista:", objLista); 
  }, [objLista]);

  useEffect(() => {
    adatlekeres();
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

  return (
    <AdatContext.Provider value={{ objLista, loading, adatlekeres, tabla, valtoztatasTabla }}>
      {children}
    </AdatContext.Provider>
  );
};

export default function useAdatContext() {
  return useContext(AdatContext);
}

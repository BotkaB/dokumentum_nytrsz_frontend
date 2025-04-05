import React, { createContext, useContext, useState, useEffect } from 'react';
import { myAxios } from "../api/axios";
import lista from "../data/data";

const AdatContext = createContext();

export const AdatProvider = ({ children }) => {
  const [objLista, setObjLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabla, setTabla] = useState(lista.users); // Alapértelmezett tábla az első (pl. 'users')

  // Adatok lekérése az aktuális táblához
  const adatlekeres = async () => {
    const url = tabla.apik.indexUrl;
    try {
      const { data } = await myAxios.get(url);
      console.log(data);
      console.log(objLista);

      if (tabla === lista.users) {
        const updatedData = data.map(item => ({
          ...item,
          password: "",
          password_confirmation: ""
        }));
        setObjLista(updatedData);


      } else{setObjLista(data)};
      console.log(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(objLista); // Most már az új objLista
  }, [objLista]);

  useEffect(() => {
    adatlekeres();
  }, [tabla]); // Minden alkalommal, amikor a tabla változik

  // Funkció, amivel beállíthatjuk a kívánt tablat
  const valtoztatasTabla = (tablaValaszto) => {
    const t = lista[tablaValaszto]; // Közvetlen hozzáférés a megfelelő táblához (nem find)
    if (t) {
      setTabla(t);
      console.log(t) // Ha találunk, beállítjuk
    } else {
      console.error(`A(z) ${tablaValaszto} tábla nem található!`); // Ha nem találunk, hibát dobunk
    }
  };

  return (
    <AdatContext.Provider value={{ objLista, loading, adatlekeres, tabla, valtoztatasTabla }}>
      {children}
    </AdatContext.Provider>
  );
};

// Alapértelmezett export
export default function useAdatContext() {
  return useContext(AdatContext);
}

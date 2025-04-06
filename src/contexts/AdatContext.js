import React, { createContext, useContext, useState, useEffect } from 'react';
import { myAxios } from "../api/axios";
import lista from "../data/data";

const AdatContext = createContext();

export const AdatProvider = ({ children }) => {
  const [objLista, setObjLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabla, setTabla] = useState(lista.users); // Alapértelmezett tábla az első (pl. 'users')
console.log(lista.users)
  // Adatok lekérése az aktuális táblához
  const adatlekeres = async () => {
    console.log("adatlekeres fut. Aktuális tabla:", tabla);
    const url = tabla.apik.indexUrl;
    try {
      const { data } = await myAxios.get(url);
      console.log("API válasz:", data); // Ellenőrizd az API válaszát

      // Ellenőrizzük, hogy az adat tömb-e
      const tomb = Array.isArray(data) ? data : (data.data || data); // Ha nem tömb, akkor a data.data kulcsot próbáljuk meg

      console.log("Feldolgozott adatok:", tomb); // Logoljuk ki a tomb-ot

      if (tabla === lista.users) {
        const updatedData = tomb.map(item => ({
          ...item,
          password: "",
          password_confirmation: ""
        }));
       // console.log("Frissített adat:", updatedData); // Ellenőrizd, hogy megfelelően frissült-e az adat
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
    console.log("Aktuális objLista:", objLista); // Most már az új objLista
  }, [objLista]);

  useEffect(() => {
    adatlekeres();
  }, [tabla]); // Minden alkalommal, amikor a tabla változik

  // Funkció, amivel beállíthatjuk a kívánt tablat
  const valtoztatasTabla = (tablaValaszto) => {
    const t = lista[tablaValaszto]; // Közvetlen hozzáférés a megfelelő táblához (nem find)
    if (t) {
      setTabla(t);
      console.log("Beállított tábla:", t); // Ha találunk, beállítjuk
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

export default function useAdatContext() {
  return useContext(AdatContext);
}

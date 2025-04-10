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
  const [kapcsoltAdatok, setKapcsoltAdatok] = useState([]); // Alapértelmezett üres tömb

  // Adatok lekérése az aktuális táblához
  const adatlekeres = async () => {
    setLoading(true);
    console.log("adatlekeres fut. Aktuális tabla:", tabla);

    try {
      const { data } = await myAxios.get(tabla?.apik.indexUrl);
      console.log("API válasz:", data);

      const tomb = Array.isArray(data) ? data : (data.data || data); // Adatok előkészítése
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

      // Kapcsolt adatok kezelése
      const kapcsoltAdatokTemp = [];
      tomb.forEach(item => {
        if (item.kapcsoltAdatok && item.kapcsoltAdatok.length > 0) {
          item.kapcsoltAdatok.forEach(kapcsolt => {
            if (!kapcsoltAdatokTemp.some(k => k.value === kapcsolt.ertekMezo)) {
              kapcsoltAdatokTemp.push({
                value: kapcsolt.ertekMezo,  // Az értékmező legyen a "value"
                label: kapcsolt.szovegMezo,   // A szövegmező pedig a "label"
              });
            }
          });
        }
      });

      // Frissítjük a kapcsolt adatokat
      setKapcsoltAdatok(kapcsoltAdatokTemp);
      console.log("Kapcsolt adatok:", kapcsoltAdatokTemp);

      // Kapcsolt adatok hozzáadása az adatlistához
      const updatedData = tomb.map(item => ({
        ...item,
        kapcsoltAdatok: kapcsoltAdatokTemp, // Az updatedItem-hez hozzáadjuk a kapcsolt adatokat
      }));

      console.log(updatedData)

      setObjLista(updatedData); // Frissítjük a listát
    } catch (error) {
      console.error("API hiba:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tábla választása
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
    <AdatContext.Provider value={{ objLista, loading, adatlekeres, tabla, valtoztatasTabla, kapcsoltAdatok }}>
      {children}
    </AdatContext.Provider>
  );
};

export default function useAdatContext() {
  return useContext(AdatContext);
}

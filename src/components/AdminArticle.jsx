import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../css/adminArticle.css";
import AdminForm from "./AdminForm";
import AdminTabla from "./AdminTabla";
import Search from "./Search";  
import useAdatContext from "../contexts/AdatContext"; 
import 'react-toastify/dist/ReactToastify.css';

export default function AdminArticle(props) {
  const { objLista, loading, adatlekeres, tabla, valtoztatasTabla } = useAdatContext();
  const [filteredObjLista, setFilteredObjLista] = useState(objLista || []); // Kezdetben az objLista vagy üres tömb

  // Logoljuk az objLista-t csak ha változik
  useEffect(() => {
    console.log("objLista frissítve:", objLista);
  }, [objLista]);

  // Aktív tábla változása
  useEffect(() => {
    console.log("Aktív tábla változás:", props.tabla);
    if (props.tabla) {
      valtoztatasTabla(props.tabla);
    }
  }, [props.tabla, valtoztatasTabla]); // figyeljünk a valtoztatasTabla-ra is

  // Adatok lekérése a táblához
  useEffect(() => {
    // Csak akkor kérjünk új adatokat, ha az objLista üres vagy a tábla változott
    if (tabla && objLista.length === 0) {
      adatlekeres();
    }
  }, [tabla, objLista]); 
  // Automatikus frissítés a lista változásakor
  useEffect(() => {
    setFilteredObjLista(objLista);  // Ha az objLista frissül, frissítjük a filteredObjLista-t
  }, [objLista]);

  // Szűrési logika
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredObjLista(objLista); // Ha nincs keresési kifejezés, az eredeti lista
    } else {
      const filtered = objLista.filter(item => {
        // Szűrés az objektum alapadatai szerint
        const matchesBasicData = Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        // Szűrés a kapcsolt adatok szerint
        const matchesKapcsoltAdatok = Object.values(item.kapcsoltAdatok || []).some(kapcsoltItem =>
          kapcsoltItem?.szovegMezo?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        return matchesBasicData || matchesKapcsoltAdatok; // Visszaadjuk azokat, amelyek egyeznek
      });
      setFilteredObjLista(filtered); // A szűrt lista beállítása
    }
  };
  

  // Logoljuk a szűrt listát a keresés után
  useEffect(() => {
    console.log("Szűrt lista:", filteredObjLista);
  }, [filteredObjLista]);

  const tablaElnevezes = tabla ? tabla.elnevezes || "Betöltés..." : "Betöltés...";

  return (
    <article className="admin-article">
      <h2>{tablaElnevezes}</h2>
      <Container fluid className="admin-container">
        {loading ? (
          <p>Töltés...</p>
        ) : filteredObjLista.length > 0 ? (
          <>
            <AdminForm
              alapObj={tabla ? tabla.alapObj : null} 
              adatok={tabla ? tabla.adatok : []} 
              apik={tabla ? tabla.apik : []} 
              frissites={adatlekeres}
            />
            <Search onSearch={handleSearch} />
            <AdminTabla adatok={tabla ? tabla.adatok : []} objLista={filteredObjLista} apik={tabla ? tabla.apik : []} />
          </>
        ) : (
          <p>Nincs adat</p>
        )}
      </Container>
    </article>
  );
}

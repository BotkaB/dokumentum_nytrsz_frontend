import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import "../css/adminArticle.css";
import AdminForm from "./AdminForm";
import AdminTabla from "./AdminTabla";
import Search from "./Search";  // Kereső komponens importálása
import useAdatContext from "../contexts/AdatContext"; 

export default function AdminArticle(props) {
  const { objLista, loading, adatlekeres, tabla, valtoztatasTabla } = useAdatContext();
  const [filteredObjLista, setFilteredObjLista] = useState(objLista || []); // Kezdetben az objLista vagy üres tömb

  useEffect(() => {
    console.log("Aktív tábla:", props.tabla);
    if (props.tabla) {
      valtoztatasTabla(props.tabla);
    }
  }, [props.tabla]);

  useEffect(() => {
    if (tabla) {
      adatlekeres();
    }
  }, [tabla]);

  // Automatikus frissítés a lista változásakor
  useEffect(() => {
    setFilteredObjLista(objLista);  // Ha az objLista frissül, frissítjük a filteredObjLista-t
  }, [objLista]);

  // Szűrési logika
  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredObjLista(objLista); // Ha nincs keresési kifejezés, az eredeti lista
    } else {
      const filtered = objLista.filter(item =>
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredObjLista(filtered); // A szűrt lista beállítása
    }
  };

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
            
            {/* Kereső komponens */}
            <Search onSearch={handleSearch} />

            {/* A szűrt adatokat átadjuk a táblázatnak */}
            <AdminTabla adatok={tabla ? tabla.adatok : []} objLista={filteredObjLista} apik={tabla ? tabla.apik : []} />
          </>
        ) : (
          <p>Nincs adat</p>
        )}
      </Container>
    </article>
  );
}

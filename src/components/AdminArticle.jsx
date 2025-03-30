import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import "../css/adminArticle.css";
import AdminForm from "./AdminForm";
import AdminTabla from "./AdminTabla";
import useAdatContext from "../contexts/AdatContext"; 

export default function AdminArticle(props) {
  const { objLista, loading, adatlekeres, tabla, valtoztatasTabla } = useAdatContext();


  useEffect(() => {
    if (props.tabla) {
      valtoztatasTabla(props.tabla);
    }
  }, [props.tabla]);

/*  useEffect(() => {
    adatlekeres(); 
  }, [tabla, adatlekeres]);
*/

  const tablaElnevezes = tabla ? tabla.elnevezes : "Nincs adat"; 

  return (
    <article className="admin-article">
      <h2>{tablaElnevezes}</h2>
      <Container fluid className="admin-container">
        {loading ? (
          <p>Töltés...</p>  
        ) : objLista.length > 0 ? (
          <>
            <AdminForm
              alapObj={tabla ? tabla.alapObj : null} 
              adatok={tabla ? tabla.adatok : []} 
              apik={tabla ? tabla.apik : []} 
              frissites={adatlekeres}
            />

            <AdminTabla adatok={tabla ? tabla.adatok : []} objLista={objLista} apik={tabla ? tabla.apik : []} />
          </>
        ) : (
          <p>Nincs adat</p> 
        )}
      </Container>
    </article>
  );
}

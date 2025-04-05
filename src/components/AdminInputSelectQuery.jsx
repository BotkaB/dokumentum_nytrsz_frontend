import { Fragment, useState, useEffect } from "react";
import useAdatContext from "../contexts/AdatContext"; 

export default function AdminInputSelectQuery(props) {
  const { objLista, loading } = useAdatContext(); // A contextből lekérjük az adatokat
  const [lista, setLista] = useState([]);

  // A kapcsolt adatokat biztosítjuk
  const ertekMezo = props.kapcsoltAdat?.ertekMezo;
  const szovegMezo = props.kapcsoltAdat?.szovegMezo;

  useEffect(() => {
    // Adatok beállítása a kapcsoltAdat alapján
    if (!loading) {
      const kapcsoltLista = objLista.map(item => ({
        ertek: item[ertekMezo] || '',  // Alapértelmezett üres érték, ha nem található
        szoveg: item[szovegMezo] || '' // Alapértelmezett üres érték, ha nem található
      }));
      setLista(kapcsoltLista);
    }
  }, [objLista, ertekMezo, szovegMezo, loading]);

  // Ha az adatok betöltése folyamatban van, megjelenítünk egy "Loading..." üzenetet
  if (loading) {
    return <div>Loading...</div>;
  }

  // A változás eseménykezelése
  function valtozas(event) {
    props.esemeny(event);
  }

  const id = "admin_form_" + props.name; // Generáljuk az id-t az input mezőhöz

  return (
    <>
      {props.readOnly ? (
        <div className="form-group">
          <label htmlFor={id} className="p-0 m-0">
            {props.label || ""}
          </label>
          <select name={props.name} id={id} disabled value={props.objektum || ''}>
            <option value={props.objektum}>{props.label || ""}</option>
          </select>
        </div>
      ) : (
        <div className="form-group">
          <label htmlFor={id} className="p-0 m-0">
            {props.label || ""}
          </label>
          <select
            value={props.objektum || ''}
            name={props.name}
            id={id} // id beállítása
            onChange={valtozas}
          >
            <option value="">-- Válassz --</option>
            {lista.map((value, index) => {
              const optionValue = value.ertek || ''; // Az alapértelmezett érték
              const optionText = value.szoveg || ''; // Az alapértelmezett szöveg
              return (
                <Fragment key={index}>
                  <option value={optionValue}>
                    {optionText}
                  </option>
                </Fragment>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
}

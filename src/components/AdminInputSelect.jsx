import { Fragment, useEffect, useState } from "react";

export default function AdminInputSelect(props) {
  const [lista, setLista] = useState(props.lista || []);  // állapot kezelés

  function valtozas(event) {
    props.esemeny(event);
  }

  useEffect(() => {
    if (Array.isArray(props.lista)) {
      setLista(props.lista);  // ha az adat megérkezik, frissítjük az állapotot
    }
  }, [props.lista]);  // csak akkor fut, ha a lista változik

  // logolás a lista értékeinek ellenőrzésére
  useEffect(() => {
    console.log('props.lista:', lista);
  }, [lista]);

  return (
    <>
      {props.readOnly ? (
        <select name={props.name} onChange={valtozas} disabled>
          <option value={props.objektum}>{props.objektum}</option>
        </select>
      ) : (
        <select value={props.objektum ?? ""} name={props.name} onChange={valtozas}>
          {!props.objektum && <option value="">-- Válassz egyet --</option>}
          {(Array.isArray(lista) ? lista : []).map((value, index) => {
            return (
              <Fragment key={index}>
                <option value={value}>{value}</option>
              </Fragment>
            );
          })}
        </select>
      )}
    </>
  );
}

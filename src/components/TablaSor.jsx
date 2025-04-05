import { Fragment, useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { myAxios } from "../api/axios";
import AdminInputText from "./AdminInputText";
import AdminInputNumber from "./AdminInputNumber";
import AdminInputDate from "./AdminInputDate";
import AdminInputSelect from "./AdminInputSelect";
import AdminInputEmail from "./AdminInputEmail";
import AdminInputDateTime from "./AdminInputDateTime";
import AdminInputSelectQuery from "./AdminInputSelectQuery";
import AdminInputSelectQuerySelf from "./AdminInputSelectQuerySelf";
import AdminInputPassword from "./AdminInputPassword";

export default function TablaSor(props) {
  const [sorModosithato, setSorModosithato] = useState(false);
  const [objektum, setObjektum] = useState(props.obj);
  const [regiObjektum, setRegiObjektum] = useState(props.obj);
  const [lathatosag, SetLathatosag] = useState("");

  const sorIdGeneralas = () => {
    const kulcsok_lista = props.adatok.elsodleges_kulcs;

    if (kulcsok_lista.length > 1) {
      let kompozit_kulcs = "";
      let i = 0;
      while (i < kulcsok_lista.length) {
        kompozit_kulcs += objektum[kulcsok_lista[i]] + "/";
        i++;
      }
      return kompozit_kulcs.replace(" ", "%20");
    }

    return objektum[kulcsok_lista[0]];
  };

  useEffect(() => {
    setObjektum(props.obj);
    setRegiObjektum(props.obj);
    setSorModosithato(false);
    SetLathatosag("");


    const initCsrf = async () => {
      try {

        console.log("CSRF token beállítva (TablaSor)");
      } catch (error) {
        console.error("CSRF token beállítása sikertelen:", error);
      }
    };

    initCsrf();
  }, [props]);

  function modosithatova_allitas() {
    setRegiObjektum(objektum);
    setSorModosithato(true);
  }

  function ertek_modositas(event) {
    setObjektum({ ...objektum, [event.target.name]: event.target.value });
  }

  async function mentes() {
    const modositottId = sorIdGeneralas();
    const payload = { ...objektum };

    console.log("Mentésre küldött objektum:", payload);

    try {
      await myAxios.put(`${props.apik.updateUrl}/${modositottId}`, objektum);
      setSorModosithato(false);
      console.log(`${modositottId}. azonosítójú sor módosítva!`, regiObjektum, objektum);
    } catch (error) {
      if (error.response) {
        console.error("Mentés sikertelen:", error.response.data);
      } else {
        console.error("Mentés sikertelen:", error);
      }
    }
  }

  function megse() {
    setObjektum(regiObjektum);
    setSorModosithato(false);
  }

  async function torles() {
    const torlendoId = sorIdGeneralas();
    try {
      await myAxios.delete(`${props.apik.destroyUrl}/${torlendoId}`);
      SetLathatosag("none");
      console.log(`${torlendoId} azonosítójú sor törölve!`);
    } catch (error) {
      console.error("Törlés sikertelen:", error);
    }
  }



  return (
    <tr style={{ display: lathatosag }}>
      {Object.keys(objektum).map(function (key, index) {
        return (
          <Fragment key={key}>
            {props.adatok[key] && props.adatok[key].lathato && (
              <td>
                {props.adatok[key].tipus === "text" && (
                  <AdminInputText
                    name={key}
                    regex={props.adatok[key].regex}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "password" && (
                  <AdminInputPassword
                    name={key}
                    objektum={sorModosithato ? " " : objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!sorModosithato}
                  />
                )}
                {props.adatok[key].tipus === "email" && (
                  <AdminInputEmail
                    name={key}
                    regex={props.adatok[key].regex}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "number" && (
                  <AdminInputNumber
                    name={key}
                    min={props.adatok[key].min}
                    max={props.adatok[key].max}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "date" && (
                  <AdminInputDate
                    name={key}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "datetime" && (
                  <AdminInputDateTime
                    name={key}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "select" && (
                  <AdminInputSelect
                    name={key}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    lista={props.adatok[key].lista}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "selectQuery" && (
                  <AdminInputSelectQuery
                    name={key}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    uri={props.adatok[key].uri}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />
                )}
                {props.adatok[key].tipus === "selectQuerySelf" && (

                  <AdminInputSelectQuerySelf
                    name={key}
                    objektum={objektum[key]}  
                    esemeny={ertek_modositas}  
                    uri={props.adatok[key].uri}
                    readOnly={!(sorModosithato && props.adatok[key].modosithato)}
                  />

                )}

              </td>
            )}
          </Fragment>
        );
      })}
      <td>
        {sorModosithato ? (
          <Button variant="outline-success" onClick={mentes}>
            Mentés
          </Button>
        ) : (
          <Button variant="outline-success" onClick={modosithatova_allitas}>
            Módosítás
          </Button>
        )}
      </td>
      <td>
        {sorModosithato ? (
          <Button variant="outline-danger" onClick={megse}>
            Mégse
          </Button>
        ) : (
          <Button variant="outline-secondary" onClick={torles} disabled>
            <i className="bi bi-lock-fill"></i>
            Törlés
          </Button>
        )}
      </td>
    </tr>
  );
}
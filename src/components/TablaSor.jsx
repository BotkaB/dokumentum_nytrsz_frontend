import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { myAxios } from "../api/axios";
import AdminInputText from "./AdminInputText";
import AdminInputNumber from "./AdminInputNumber";
import AdminInputDate from "./AdminInputDate";
import AdminInputEmail from "./AdminInputEmail";
import AdminInputDateTime from "./AdminInputDateTime";
import AdminInputSelect from "./AdminInputSelect";
import AdminInputSelectQuery from "./AdminInputSelectQuery";
import AdminInputPassword from "./AdminInputPassword";

const inputComponentMap = {
  text: AdminInputText,
  password: AdminInputPassword,
  email: AdminInputEmail,
  number: AdminInputNumber,
  date: AdminInputDate,
  datetime: AdminInputDateTime,
  select: AdminInputSelect,
  selectQuery: AdminInputSelectQuery,
};

export default function TablaSor(props) {
  const [sorModosithato, setSorModosithato] = useState(false);
  const [objektum, setObjektum] = useState(props.obj);
  const [regiObjektum, setRegiObjektum] = useState(props.obj);
  const [lathatosag, setLathatosag] = useState("");

  const sorIdGeneralas = () => {
    const kulcsok_lista = props.adatok.elsodleges_kulcs;
    if (kulcsok_lista.length > 1) {
      let kompozit_kulcs = kulcsok_lista.map(kulcs => objektum[kulcs]).join("/");
      return kompozit_kulcs.replace(" ", "%20");
    }
    return objektum[kulcsok_lista[0]];
  };

  useEffect(() => {
    setObjektum(props.obj);
    setRegiObjektum(props.obj);
    setSorModosithato(false);
    setLathatosag("");
  }, [props]);

  const modosithatova_allitas = () => {
    setRegiObjektum(objektum);
    setSorModosithato(true);
  };

  const ertek_modositas = (event) => {
    setObjektum({ ...objektum, [event.target.name]: event.target.value });
  };

  const mentes = async () => {
    const modositottId = sorIdGeneralas();
    try {
      await myAxios.put(`${props.apik.updateUrl}/${modositottId}`, objektum);
      setSorModosithato(false);
    } catch (error) {
      console.error("Mentés sikertelen:", error.response?.data || error);
    }
  };

  const megse = () => {
    setObjektum(regiObjektum);
    setSorModosithato(false);
  };

  const torles = async () => {
    const torlendoId = sorIdGeneralas();
    try {
      await myAxios.delete(`${props.apik.destroyUrl}/${torlendoId}`);
      setLathatosag("none");
    } catch (error) {
      console.error("Törlés sikertelen:", error);
    }
  };

  return (
    <tr style={{ display: lathatosag }}>
      {Object.keys(objektum).map((key) => {
        const adat = props.adatok[key];
        if (adat && adat.lathato) {
          const InputComponent = inputComponentMap[adat.tipus];
          return (
            <Fragment key={key}>
              <td>
                {InputComponent && (
                  <InputComponent
                    name={key}
                    objektum={objektum[key]}
                    esemeny={ertek_modositas}
                    readOnly={!(sorModosithato && adat.modosithato)}
                    {...(adat.tipus === "selectQuery" && {
                      uri: adat.uri,
                      kapcsoltAdat: adat.kapcsoltAdat,
                    })}
                  />
                )}
              </td>
            </Fragment>
          );
        }
        return null;
      })}
      <td>
        {sorModosithato ? (
          <Button variant="outline-success" onClick={mentes}>Mentés</Button>
        ) : (
          <Button variant="outline-success" onClick={modosithatova_allitas}>Módosítás</Button>
        )}
      </td>
      <td>
        {sorModosithato ? (
          <Button variant="outline-danger" onClick={megse}>Mégse</Button>
        ) : (
          <Button variant="outline-secondary" onClick={torles} disabled>
            <i className="bi bi-lock-fill"></i> Törlés
          </Button>
        )}
      </td>
    </tr>
  );
}

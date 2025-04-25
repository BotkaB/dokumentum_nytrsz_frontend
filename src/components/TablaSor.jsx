import { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { myAxios } from "../api/axios";
import AdminInputText from "./AdminInputText";
import AdminInputNumber from "./AdminInputNumber";
import AdminInputDate from "./AdminInputDate";
import AdminInputEmail from "./AdminInputEmail";
import AdminInputDateTime from "./AdminInputDateTime";
import AdminInputSelect from "./AdminInputSelect";
import AdminInputSelectQuery from "./AdminInputSelectQueryNull";
import AdminInputPassword from "./AdminInputPassword";
import useAdatContext from "../contexts/AdatContext";
import FormError from "./FormError";
import 'react-toastify/dist/ReactToastify.css';
import { notify } from './NotificationService';

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
  const { adatlekeres } = useAdatContext();
  const [errors, setErrors] = useState({});

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
  }, [props.obj]);

  const modosithatova_allitas = () => {
    setRegiObjektum(objektum);
    setSorModosithato(true);
    props.setVanModositasAlatt(true);
    props.setModositandoSorId(props.obj[props.adatok.elsodleges_kulcs[0]]);
  };

  const ertek_modositas = (event) => {
    setObjektum({ ...objektum, [event.target.name]: event.target.value });
  };

  const mentes = async () => {
    const modositottId = sorIdGeneralas();
    try {
      const response = await myAxios.put(`${props.apik.updateUrl}/${modositottId}`, objektum);
      if (response && response.status === 200) {
        setSorModosithato(false);
        props.setVanModositasAlatt(false);
        adatlekeres();
        setErrors({});
        notify("success", "A módosítás sikeresen megtörtént!");
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        notify("error", error.response.data.message);
      } else {
        notify("error", "A felvitel sikertelen volt. Kérjük próbálja újra.");
      }
      setObjektum(regiObjektum);
    }
  };

  const megse = () => {
    setObjektum(regiObjektum);
    setSorModosithato(false);
    props.setVanModositasAlatt(false);
    props.setModositandoSorId(null);
    setErrors({});
  };

  return (
    <tr style={{ display: lathatosag }}>
      {Object.keys(objektum).map((key) => {
        const adat = props.adatok[key];

        if (adat && adat.lathato) {
          const InputComponent = inputComponentMap[adat.tipus];
          const ertek = objektum[key];

          return (
            <Fragment key={key}>
              <td>
                {sorModosithato && adat.modosithato ? (
                  <>
                    {InputComponent && (
                      <InputComponent
                        name={key}
                        objektum={ertek}
                        esemeny={ertek_modositas}
                        {...(adat.tipus === "select" && { lista: adat.lista })}
                        {...(adat.tipus === "selectQuery" && {
                          kapcsoltAdat: adat.kapcsoltAdat,
                          esemeny: ertek_modositas,                        
                        })}
                      />
                    )}
                    <FormError errors={errors} fieldName={key} />
                  </>
                ) : (
                  <>
                    {adat.tipus === "selectQuery" ? (
                      <AdminInputSelectQuery
                        name={key}
                        objektum={ertek} 
                        kapcsoltAdat={adat.kapcsoltAdat}
                        readOnly={true} 
                      />
                    ) : adat.tipus === "select" ? (
                      <AdminInputSelect
                        name={key}
                        objektum={ertek}
                        lista={adat.lista}
                        readOnly={true} 
                      />
                    ) : (
                      <span>{ertek ?? ""}</span>
                    )}
                  </>
                )}
              </td>
            </Fragment>
          );
        }
        return null;
      })}
      <td>
        {sorModosithato ? (
          <Button className="btn-sm" variant="outline-success" onClick={mentes}>
            Mentés
          </Button>
        ) : (
          <Button className="btn-sm" variant="outline-success" onClick={modosithatova_allitas}>
            Módosítás
          </Button>
        )}
      </td>
      {sorModosithato && (
        <td>
          <Button className="btn-sm" variant="outline-danger" onClick={megse}>
            Mégse
          </Button>
        </td>
      )}
    </tr>
  );
}


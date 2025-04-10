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
      // API hívás és válasz
      const response = await myAxios.put(`${props.apik.updateUrl}/${modositottId}`, objektum);
  
      // Ha sikeres válasz érkezik
      if (response && response.status === 200) {
        setSorModosithato(false);
        adatlekeres();
        setErrors({});
        notify("success", "A módosítás sikeresen megtörtént!");
        console.error("Mentés sikeres");
      }
    } catch (error) {
      // Ha validációs hiba van
      console.error("Mentés sikertelen:", error.response?.data || error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
        notify("error", "A módosítás sikertelen volt. Kérjük próbálja újra.");
      }
      setObjektum(regiObjektum);
    }
  };
  

  const megse = () => {
    setObjektum(regiObjektum);
    setSorModosithato(false);
    setErrors({});
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
                    {...(adat.tipus === "selectQuery" && {
                      kapcsoltAdat: adat.kapcsoltAdat,
                    })}
                  />
                )}
                <FormError errors={errors} fieldName={key} />
              </>
            ) : (
              <span>{ertek ?? ""}</span>
            )}
          </td>
        </Fragment>
      );
    }
    return null;
  })}

  <td>
    {sorModosithato ? (
      <Button className="btn-sm" variant="outline-success" onClick={mentes}>Mentés</Button>
    ) : (
      <Button className="btn-sm" variant="outline-success" onClick={modosithatova_allitas}>Módosítás</Button>
    )}
  </td>
  <td>
    {sorModosithato ? (
      <Button className="btn-sm" variant="outline-danger" onClick={megse}>Mégse</Button>
    ) : (
      <Button className="btn-sm" variant="outline-secondary" onClick={torles} disabled>
        <i className="bi bi-lock-fill"></i> Törlés
      </Button>
    )}
  </td>
</tr>

  );
}

import { Fragment, useEffect, useState } from "react";
import { Button, Col, Container, Row} from "react-bootstrap";
import { myAxios } from "../api/axios";
import AdminInputText from "./AdminInputText";
import AdminInputNumber from "./AdminInputNumber";
import AdminInputDate from "./AdminInputDate";
import AdminInputSelect from "./AdminInputSelect";
import AdminInputEmail from "./AdminInputEmail";
import AdminInputDateTime from "./AdminInputDateTime";
import AdminInputSelectQuery from "./AdminInputSelectQuery";
import AdminInputPassword from "./AdminInputPassword";
import FormError from "./FormError"; // Importálás a hibák megjelenítéséhez

// CSRF token kezeléshez szükséges függvény
const csrf = async () => {
  try {
    await myAxios.get("/sanctum/csrf-cookie");
  } catch (error) {
    console.error("CSRF token lekérés hibája:", error);
  }
};

export default function AdminForm(props) {
  const [objektum, setObjektum] = useState(props.alapObj);
  const [errors, setErrors] = useState({}); // Hibák állapota

  // A mezők változásainak figyelése
  function ertek_modositas(event) {
    setObjektum({ ...objektum, [event.target.name]: event.target.value });
    console.log(objektum);
  }

  useEffect(() => {
    setObjektum(props.alapObj);
  }, [props]);

  // Form elküldése
  function elkuld(event) {
    event.preventDefault();
    axiosPost();
  }

  // Az adatküldés axios-szal
  async function axiosPost() {
    await csrf(); // Kérjük le a CSRF tokent elküldés előtt

    try {
      const response = await myAxios.post(props.apik.storeUrl, {
        ...objektum,
        _token: await csrf(), // A CSRF token
      });
      console.log(response);
      props.frissites();
      setErrors({});

    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.errors) {
        // Ha validációs hiba van, akkor azokat beállítjuk
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <form
      className="admin-form"
      onSubmit={elkuld}
      method="post"
     
    >
      <Container>
      <Row className="form-row">

          {Object.keys(props.adatok).map(function (key, index) {
            return (
              <Fragment key={index}>
                {props.adatok[key].modosithato && (
                  <Col xs="12" sm="6" md="4" lg="3" xl="3">
                    <div className="form-group">
                      <label className="form-group-label"
                    
                        htmlFor={"admin_form_" + key} // Hozzáadva az id-nek megfelelő for
                      >
                        {props.adatok[key].fejlec}:
                      </label>
                      <>
                        {props.adatok[key].tipus === "text" && (
                          <AdminInputText
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            regex={props.adatok[key].regex}
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "password" && (
                          <AdminInputPassword
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "email" && (
                          <AdminInputEmail
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            regex={props.adatok[key].regex}
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "number" && (
                          <AdminInputNumber
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            min={props.adatok[key].min}
                            max={props.adatok[key].max}
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "date" && (
                          <AdminInputDate
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "datetime" && (
                          <AdminInputDateTime
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "select" && (
                          <AdminInputSelect
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            lista={props.adatok[key].lista}
                            readOnly={false}
                          />
                        )}

                        {props.adatok[key].tipus === "selectQuery" && (
                          <AdminInputSelectQuery
                            name={key}
                            id={"admin_form_" + key} // id hozzáadása
                            objektum={objektum[key]}
                            esemeny={ertek_modositas}
                            uri={props.adatok[key].uri}
                            readOnly={false}
                          />
                        )}
                      </>
                      {/* Hibák megjelenítése */}
                      <FormError errors={errors} fieldName={key} />
                    </div>
                  </Col>
                )}
              </Fragment>
            );
          })}
        </Row>
      </Container>
      <Button variant="primary" as="input" type="submit" value="Felvitel" />
    </form>
  );
}

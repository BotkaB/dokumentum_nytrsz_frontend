import { useEffect, useState } from "react";
import { myAxios } from "../api/axios";

export default function AdminInputSelectQuerySelf(props) {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Adatok lekérdezése
  async function lekerdezes() {
    setLoading(true);
    try {
      const { data } = await myAxios.get(props.uri);
      console.log("Lekért adatok:", data);

      // Hierarchikus adatfeldolgozás: Főtípus nevének hozzáadása
      const parsedData = data.map((item) => {
        const fotipus = data.find(
          (tipus) => tipus.ugyfel_tipus_id === item.ugyfel_fotipus
        );
        return {
          ...item,
          fotipusNev: fotipus ? fotipus.elnevezes : null, // Hozzáadjuk a főtípus nevét
        };
      });

      setLista(parsedData);
    } catch (error) {
      console.error("Hiba a lekérdezés közben:", error);
      setError("Hiba történt az adatok betöltésekor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    lekerdezes();
  }, [props.uri]);

  const valtozas = (event) => {
    props.esemeny(event); // Esemény továbbítása a szülő komponensnek
  };

  // Hiba- és betöltési állapot kezelése
  if (loading) {
    return <p>Betöltés...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <select
      name={props.name}
      value={props.objektum || ""}
      onChange={valtozas}
      disabled={props.readOnly}
    >
      <option value="">-- Válassz egyet --</option>
      {lista.map((item) => (
        <option key={item.ugyfel_tipus_id} value={item.ugyfel_tipus_id}>
          {item.elnevezes}
          {item.fotipusNev && ` (${item.fotipusNev})`}
        </option>
      ))}
    </select>
  );
}

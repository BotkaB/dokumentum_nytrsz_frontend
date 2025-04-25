import { useEffect, useState } from "react";
import useAdatContext from "../contexts/AdatContext";

export default function AdminInputSelectQuery({
  kapcsoltAdat,
  esemeny,
  name,
  objektum,
  readOnly,
  kapcsolatUrl,
}) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const { objLista, adatlekeresEgyediUrl } = useAdatContext();

  useEffect(() => {
    const loadOptions = async () => {
      if (!kapcsoltAdat || !kapcsoltAdat.length) return;

      const { ertekMezo, szovegMezo, fotipusMezo } = kapcsoltAdat[0];

      let filteredOptions = [];

      if (kapcsolatUrl) {
        // Ha van kapcsolatUrl, akkor lekérjük az adatokat ezen az URL-en
        const kapcsoltAdatok = await adatlekeresEgyediUrl(kapcsolatUrl);
        filteredOptions = kapcsoltAdatok.map((item) => ({
          value: String(item[ertekMezo]),
          label: item[szovegMezo],
        }));
      } else {
        // Ha nincs kapcsolatUrl, akkor az objLista alapján dolgozunk
        filteredOptions = objLista
          .filter((item) => {
            if (fotipusMezo) {
              return item[fotipusMezo] === null; // Szűrés fotipusMezo alapján
            }
            return true; // Ha nincs fotipusMezo, minden adatot felhasználunk
          })
          .map((item) => ({
            value: String(item[ertekMezo]),
            label: item[szovegMezo],
          }));
      }

      // Duplikációk eltávolítása
      const seen = new Set();
      const uniqueOptions = filteredOptions.filter((option) => {
        if (seen.has(option.value)) return false;
        seen.add(option.value);
        return true;
      });

      // Ha az objektum nem szerepel, adjuk hozzá (pl. régi adat)
      const objektumStr = String(objektum ?? "");
      if (objektumStr && !uniqueOptions.some((item) => item.value === objektumStr)) {
        uniqueOptions.push({
          value: objektumStr,
          label: objektumStr,
        });
      }

      // Ha az objektum tömb, azt is kezeljük
      if (objektum && Array.isArray(objektum)) {
        const extraOptions = objektum.map((item) => ({
          value: String(item[ertekMezo]),
          label: item[szovegMezo],
        }));
        setOptions([...uniqueOptions, ...extraOptions]);
      } else {
        setOptions(uniqueOptions);
      }
    };

    loadOptions();
  }, [kapcsoltAdat, objLista, objektum, adatlekeresEgyediUrl]);

  useEffect(() => {
    setSelectedValue(String(objektum ?? ""));
  }, [objektum]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    esemeny(event);
  };

  return (
    <select
      name={name}
      value={selectedValue}
      onChange={handleChange}
      disabled={readOnly}
    >
      {!selectedValue && <option value="">-- Válassz egyet --</option>}
      {options.length === 0 ? (
        <option>Nem található adat</option>
      ) : (
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      )}
    </select>
  );
}

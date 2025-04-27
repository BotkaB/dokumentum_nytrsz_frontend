import { useEffect, useState, useMemo } from "react";
import useAdatContext from "../contexts/AdatContext";

// Cache tárolásához
const cache = new Map();

export default function AdminInputSelectQuery({
  kapcsoltAdat,
  esemeny,
  name,
  objektum,
  readOnly,
  kapcsolatUrl,
}) 
{
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { objLista, adatlekeresEgyediUrl } = useAdatContext();

  const memoKapcsoltAdat = useMemo(() => {
    if (!kapcsoltAdat || !kapcsoltAdat.length) return {};
    return kapcsoltAdat[0];
  }, [kapcsoltAdat]);



  const loadOptions = async () => {
    if (!memoKapcsoltAdat) return;
    setLoading(true);
    setError(null);

    try {
      let filteredOptions = [];
      console.log('kapcsolatUrl:', kapcsolatUrl);
      // Ha létezik cache és a kapcsolatUrl megegyezik, akkor ne kérjünk új adatokat
      if (kapcsolatUrl && cache.has(kapcsolatUrl)) {
        console.log("Adatok a cache-ből:");
        filteredOptions = cache.get(kapcsolatUrl);
      } else {
        console.log("Lekérdezés a szerverről...");
        if (kapcsolatUrl) {
          const kapcsoltAdatok = await adatlekeresEgyediUrl(kapcsolatUrl);
          filteredOptions = kapcsoltAdatok
            .filter(
              (item) =>
                !memoKapcsoltAdat.fotipusMezo || item[memoKapcsoltAdat.fotipusMezo] !== null
            )
            .map((item) => ({
              value: String(item[memoKapcsoltAdat.ertekMezo]),
              label: item[memoKapcsoltAdat.szovegMezo],
            }));
          // Csak akkor frissítjük a cache-t, ha új adatokat kérünk
          cache.set(kapcsolatUrl, filteredOptions);
        } else {

          filteredOptions = objLista

            .filter((item) => {
              if (memoKapcsoltAdat.fotipusMezo) {
                console.log("Szűrés", item, "mező:", memoKapcsoltAdat.fotipusMezo, "érték:", item[memoKapcsoltAdat.fotipusMezo]);
                return item[memoKapcsoltAdat.fotipusMezo] === null; // Szűrés fotipusMezo alapján
              }
              return true; // Ha nincs fotipusMezo, minden adatot felhasználunk
            })
          console.log('Filtered options:', filteredOptions);
          filteredOptions = filteredOptions.map((item) => ({
            value: String(item[memoKapcsoltAdat.ertekMezo]),
            label: item[memoKapcsoltAdat.szovegMezo],
          }));
        }
        console.log("Megszűrt lista:", filteredOptions);
      }

    
      const uniqueOptions = [...new Map(filteredOptions.map((item) => [item.value, item])).values()];

      const objektumStr = String(objektum ?? "");
      if (objektumStr && !uniqueOptions.some((item) => item.value === objektumStr)) {
        uniqueOptions.push({
          value: objektumStr,
          label: objektumStr,
        });
      }

      if (objektum && Array.isArray(objektum)) {
        const extraOptions = objektum.map((item) => ({
          value: String(item[memoKapcsoltAdat.ertekMezo]),
          label: item[memoKapcsoltAdat.szovegMezo],
        }));
        setOptions([...uniqueOptions, ...extraOptions]);
      } else {
        setOptions(uniqueOptions);
      }

    } catch (err) {
      setError("Hiba történt az adatok betöltése során.");
      console.error("Data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (kapcsolatUrl && !cache.has(kapcsolatUrl)) {
      cache.clear();
    }
    loadOptions();
  }, [objLista, kapcsolatUrl]);
  

  useEffect(() => {
    setSelectedValue(String(objektum ?? ""));
  }, [objektum]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    esemeny(event);
  };

  

  return (
    <div>
      {loading && <p>Adatok betöltése...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <select
        name={name}
        value={selectedValue}
        onChange={handleChange}
        disabled={readOnly || loading}
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
    </div>
  );
}

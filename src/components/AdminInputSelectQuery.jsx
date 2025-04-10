import { useEffect, useState } from "react";
import useAdatContext from "../contexts/AdatContext";

// Funkció a beágyazott objektumok értékeinek lekérésére
const getNestedValue = (obj, path) => {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : null, obj);
};

export default function AdminInputSelectQuery({
  kapcsoltAdat,
  esemeny,
  name,
  objektum,
  readOnly
}) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(objektum ?? "");
  const { objLista } = useAdatContext();

  console.log("Kapcsolt Adat:", kapcsoltAdat);  // Naplózzuk a kapcsoltAdat tartalmát
  console.log("ObjLista:", objLista);          // Naplózzuk a objLista tartalmát


  useEffect(() => {
    if (!objLista || objLista.length === 0 || !kapcsoltAdat || kapcsoltAdat.length === 0) return;

    // Módosított adatlekérdezés a szűrt lista alapján
    const mappedOptions = objLista.map((item) => {
      const option = {};

      // Ellenőrizzük, hogy az adat tömb vagy objektum
      const data = Array.isArray(item) ? item : (item.data || item);
      console.log("Adat:", data);
      // Töltse fel az opciókat a dinamikus mezők alapján
      if (kapcsoltAdat[0]?.ertekMezo && kapcsoltAdat[0]?.szovegMezo) {

        console.log(kapcsoltAdat[0]?.ertekMezo);
        console.log(kapcsoltAdat[0]?.szovegMezo);
        // Használja a getNestedValue függvényt a beágyazott adatmezők elérésére
        const ertekMezoValue = getNestedValue(data, [kapcsoltAdat[0].ertekMezo]);
        const szovegMezoValue = Array.isArray(kapcsoltAdat[0].szovegMezo)
          ? getNestedValue(data, kapcsoltAdat[0].szovegMezo)
          : data[kapcsoltAdat[0].szovegMezo];


        console.log("Érték Mező:", ertekMezoValue);


        option.value = ertekMezoValue;
        option.label = szovegMezoValue;
      }

      return option;
    });


    const uniqueOptions = mappedOptions.filter(
      (option, index, self) =>
        option.value != null &&
        index === self.findIndex((o) => o.value != null && o.value === option.value)
    );

    setOptions(uniqueOptions);
  }, [objLista, kapcsoltAdat]);

  useEffect(() => {
    setSelectedValue(objektum ?? "");
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

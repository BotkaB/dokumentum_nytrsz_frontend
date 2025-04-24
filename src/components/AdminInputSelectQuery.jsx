import { useEffect, useState } from "react";
import useAdatContext from "../contexts/AdatContext";

// Beágyazott érték lekérő segédfüggvény
const getNestedValue = (obj, path) => {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : null, obj);
};

export default function AdminInputSelectQuery({
  kapcsoltAdat,
  esemeny,
  name,
  objektum,
  readOnly,
  objLista, 
}) {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(objektum ?? "");
  console.log(kapcsoltAdat);
  useEffect(() => {
    // Ha nincs kapcsolt adat, akkor kilépünk
    if (!kapcsoltAdat || !kapcsoltAdat.length || !objLista) {
      return;
    }

    // Dinamikus lista feltöltése a kapott objLista alapján
    const mappedOptions = objLista.map((item) => {
      const option = {};
      const ertekMezoValue = getNestedValue(item, kapcsoltAdat[0].ertekMezo.split('.'));
      const szovegMezoValue = getNestedValue(item, kapcsoltAdat[0].szovegMezo.split('.'));

      option.value = ertekMezoValue;
      option.label = szovegMezoValue;

      console.log(ertekMezoValue);
      console.log(szovegMezoValue);
      return option;
    });

    // Egyedi opciók biztosítása
    const uniqueOptions = mappedOptions.filter(
      (option, index, self) =>
        option.value != null &&
        index === self.findIndex((o) => o.value === option.value)
    );

    setOptions(uniqueOptions);
  }, [kapcsoltAdat, objLista]);

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

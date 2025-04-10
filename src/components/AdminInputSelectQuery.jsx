import { useEffect, useState } from "react";
import { myAxios } from "../api/axios";

const AdminInputSelectQuery = ({ url, kapcsoltAdat, esemeny, name, objektum, readOnly }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(objektum ?? "");

  useEffect(() => {
    if (!url || !kapcsoltAdat || kapcsoltAdat.length === 0) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await myAxios.get(url);
        const fetchedData = Array.isArray(response.data)
      ? response.data
      : Array.isArray(response.data.data)
      ? response.data.data
      : [];

        // Módosított adatlekérdezés a kulcsok alapján
        const mappedOptions = fetchedData.map((item) => {
          const option = {};

          // Töltse fel az opciókat az 'ertekMezo' és 'szovegMezo' alapján
          if (kapcsoltAdat[0]?.ertekMezo && kapcsoltAdat[0]?.szovegMezo) {
            option.value = item[kapcsoltAdat[0].ertekMezo];
            option.label = item[kapcsoltAdat[0].szovegMezo];
          }

          return option;
        });

        const uniqueOptions = mappedOptions.filter(
          (option, index, self) =>
            index === self.findIndex((o) => o.value === option.value)
        );
        
        setOptions(uniqueOptions);

      } catch (error) {
        console.error("Hiba az adatok lekérésekor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, kapcsoltAdat]);

  
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
      {loading ? (
        <option>Betöltés...</option>
      ) : (

        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      )}
    </select>
  );
};

export default AdminInputSelectQuery;
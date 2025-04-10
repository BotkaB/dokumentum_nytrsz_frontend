import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import useAdatContext from "../contexts/AdatContext";

const AdminInputSelectQuery = ({ name, objektum, esemeny }) => {
  const { objLista } = useAdatContext();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // A kapcsolt adatok dinamikusan generálása a kapcsolódó objektumokból
    const mappedOptions = objLista.map((item) => ({
      value: item.elszamolas_tipus_id, // Az értékmező, például az azonosító
      label: item.elszamolas_tipus?.elszamolas_elnevezese, // A szövegmező
    }));
    
    setOptions(mappedOptions);
  }, [objLista]);

  return (
    <Form.Group controlId={name}>
      <Form.Label>{name}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        value={objektum}
        onChange={esemeny}
      >
        <option value="">Válasszon...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default AdminInputSelectQuery;

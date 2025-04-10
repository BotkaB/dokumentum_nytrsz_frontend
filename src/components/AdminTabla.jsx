import Table from "react-bootstrap/Table";
import TablaFejlecSor from "./TablaFejlecSor";
import TablaSor from "./TablaSor";

export default function AdminTabla(props) {
  // Ellenőrizzük, hogy van-e objektum lista, és ha nincs, üres tömböt adunk vissza
  const objLista = props.objLista || [];

  return (
    <Table striped className="admin-table align-middle">
      <thead>
        <TablaFejlecSor adatok={props.adatok} />
      </thead>

      <tbody>
        {objLista.length > 0 ? (
          objLista.map((value, index) => (
            <TablaSor
              key={index} 
              obj={value}
              fejlec={false} 
              sorszam={index + 1} 
              adatok={props.adatok}
              apik={props.apik}
            />
          ))
        ) : (
          <tr>
            <td colSpan={Object.keys(props.adatok).length}>Nincs adat a táblázatban.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}

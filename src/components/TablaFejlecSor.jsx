export default function TablaFejlecSor({ adatok }) {
  return (
    <tr>
      {Object.entries(adatok).map(([key, value]) => {
        // Csak akkor jelenítjük meg, ha a 'lathato' érték igaz
        return value.lathato && (
          <th key={key}>{value.fejlec}</th>
        );
      })}
      <th key="modositas">módosítás</th>
      <th key="torles">törlés</th>
    </tr>
  );
}

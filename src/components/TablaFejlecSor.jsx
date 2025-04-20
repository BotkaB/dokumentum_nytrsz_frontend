export default function TablaFejlecSor({ adatok, vanModositasAlatt }) {
  return (
    <tr>
      {Object.entries(adatok).map(([key, value]) => {
        // Csak akkor jelenítjük meg, ha a 'lathato' érték igaz
        return value.lathato && (
          <th key={key}>{value.fejlec}</th>
        );
      })}
      <th key="modositas"> módosítás</th>
      {vanModositasAlatt && <th key="megse">mégse</th>}
    </tr>
  );
}

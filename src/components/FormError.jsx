export default function FormError({ errors, fieldName = null }) {
  if (!errors) return null;

  // Ha mezőhöz tartozó hiba van
  if (fieldName && errors[fieldName]) {
    return <p style={{ color: 'red' }}>{errors[fieldName][0]}</p>;
  }

  // Ha általános üzenet van (message kulcs alatt)
  if (!fieldName && errors.message) {
    const uzenet = Array.isArray(errors.message)
      ? errors.message[0]
      : errors.message;

    return <p style={{ color: 'red' }}>{uzenet}</p>;
  }

  return null;
}

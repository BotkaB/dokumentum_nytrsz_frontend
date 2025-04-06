
import React from 'react';

export default function FormError({ errors, fieldName }) {
  if (!errors || !errors[fieldName]) return null;
  return <p style={{ color: 'red' }}>{errors[fieldName][0]}</p>;
}

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
  return (
    <footer style={footerStyle}>
      <h2 style={h2Style}>BotkaB 2025</h2>
    </footer>
  );
}

const footerStyle = {
  background: '#e0e0e0', // Világos szürke háttérszín
  padding: '10px', // Csökkentjük a paddinget
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'center',
  height: '40px' // Alacsonyabb magasság
};

const h2Style = {
  fontSize: 'calc(1rem + 0.5vw)', // Kisebb betűméret
  fontFamily: "'Courier New', monospace", // Írógép stílusú betűtípus
  fontWeight: 'bold', // Vastag betűk
};

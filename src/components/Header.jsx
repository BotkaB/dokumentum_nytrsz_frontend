import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  return (
    <header style={headerStyle}>
      <style>{keyframes}</style>
      <h1 style={h1Style}>Dokumentum Nyilvántartó Rendszer</h1>
      <div className="scroll-text" style={scrollTextStyle}>
        <p style={pStyle}>eredetimásolataintézeti_adatszolgáltatás-novemer.korr(2).xls</p>
      </div>
    </header>
  );
}

const headerStyle = {
  position: 'relative',
  overflow: 'hidden',
  background: '#e0e0e0', // Világos szürke háttérszín
  padding: '20px',
  width: '100%',
  boxSizing: 'border-box',
  height: '150px' // Növeljük, hogy elférjen a cím és a futó szöveg is
};

const scrollTextStyle = {
  position: 'relative',
  width: '100%',
  height: 'auto',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  top: '2rem' // Finomítjuk a helyzetét
};

const pStyle = {
  display: 'inline-block',
  fontSize: 'calc(0.8rem + 0.4vw)',
  animation: 'marquee 10s linear infinite',
  position: 'relative' // Relatív helyezés az animációhoz
};

const h1Style = {
  fontSize: 'calc(1.5rem + 1vw)', // Reszponzívan csökkenő betűméret
  fontFamily: "'Courier New', monospace",
  fontWeight: 'bold',
  textAlign: 'center',
};

const keyframes = `
  @keyframes marquee {
    0% { transform: translateX(100%); } // Jobb szélről indul
    100% { transform: translateX(-100%); } // Balra mozog
  }
`;

const responsiveStyles = `
  @media (max-width: 768px) {
    .scroll-text p {
      animation-duration: 20s;
      font-size: calc(0.7rem + 0.4vw);
    }
  }

  @media (max-width: 480px) {
    .scroll-text p {
      animation-duration: 30s;
      font-size: calc(0.6rem + 0.3vw);
    }
    h1 {
      font-size: calc(1.2rem + 1vw);
    }
  }
`;

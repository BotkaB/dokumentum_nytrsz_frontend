import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  return (
    <header className="container-fluid" style={headerStyle}>
      <style>{`${keyframes} ${responsiveStyles}`}</style>
      <h1 style={h1Style}>Dokumentum Nyilvántartó Rendszer</h1>
      <div className="scroll-text" style={scrollTextStyle}>
        <p style={pStyle}>eredetimásolataintézeti_adatszolgáltatás-november.korr(2).xls</p>
      </div>
    </header>
  );
}

const headerStyle = {
  position: 'relative',
  overflow: 'hidden',
  background: '#e0e0e0',
  padding: '0.8rem',
  width: '100%',
  boxSizing: 'border-box',
  height: '6rem'
};

const scrollTextStyle = {
  position: 'relative',
  width: '100%',
  height: 'auto',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  top: '0.2rem'
};

const pStyle = {
  display: 'inline-block',
  fontSize: 'calc(0.8rem + 0.4vw)',
  animation: 'marquee 20s linear infinite', 
  position: 'relative'
};

const h1Style = {
  fontSize: 'calc(1.5rem + 1vw)',
  fontFamily: "'Courier New', monospace",
  fontWeight: 'bold',
  textAlign: 'center',
};

const keyframes = `
  @keyframes marquee {
    0% { transform: translateX(250%); }  
    100% { transform: translateX(-150%); } 
  }
`;

const responsiveStyles = `
  @media (max-width: 768px) {
    .scroll-text p {
      animation-duration: 25s;
      font-size: calc(0.7rem + 0.4vw);
    }
  }

  @media (max-width: 480px) {
    .scroll-text p {
      animation-duration: 35s;
      font-size: calc(0.6rem + 0.3vw);
    }
    h1 {
      font-size: calc(1.2rem + 1vw);
    }
  }
`;

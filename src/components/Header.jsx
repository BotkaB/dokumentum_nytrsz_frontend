import React, { useState } from 'react';



export default function Header() {
  const [isAnimationRunning, setIsAnimationRunning] = useState(true);

  const toggleAnimation = () => {
    setIsAnimationRunning(!isAnimationRunning);
  };

  return (
    <header className="header">
      <h1 className="header-h1">Dokumentum Nyilvántartó Rendszer</h1>
      <div className="scroll-text" onClick={toggleAnimation} style={{ cursor: 'pointer' }}>
        <p
          className={`scroll-text-paragraph ${isAnimationRunning ? 'running' : 'paused'}`}
        >
          eredetimásolataintézeti_adatszolgáltatás-november.korr(2).xls
        </p>
      </div>
    </header>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

export default function Navigacio() {
  const { user, logout } = useAuthContext();

  // Funkció, ami az aktuális szerepkör alapján dinamikusan generálja a menü linkeket
  const getRoleBasedLinks = () => {
    if (user.role === 0) {
      // Admin szerepkör
      return (
        <>
          <li className="navbar-item">
            <Link className="nav-link" to="/admin">
              Admin
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/documents">
              Dokumentumok
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/statistics">
              Statisztika
            </Link>
          </li>
        </>
      );
    } else if (user.role === 1) {
      // Dokumentumellenőrző szerepkör
      return (
        <>
          <li className="navbar-item">
            <Link className="nav-link" to="/documents">
              Dokumentumok
            </Link>
          </li>
          <li className="navbar-item">
            <Link className="nav-link" to="/statistics">
              Statisztika
            </Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/regisztracio">
                 Adatmódosítás
          </Link>
          </li>
        </>
      );
    } else if (user.role === 2) {
      // Statisztikai lekérdező szerepkör
      return (
        <>
          <li className="navbar-item">
            <Link className="nav-link" to="/statistics">
              Statisztika
            </Link>
          </li>
          <li className="navbar-item">
          <Link className="nav-link" to="/regisztracio">
                 Adatmódosítás
          </Link>
          </li>
     
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-sm bg-light">
      <div className="container-fluid">
        <ul className="navbar-nav">
        <li className="navbar-item">
            <Link className="nav-link" to="/">
              Kezdőlap
            </Link>
          </li>

          {user ? (
            <>
              {/* A szerepkör alapján generáljuk a menüpontokat */}
              {getRoleBasedLinks()}
              
              {/* Kijelentkezés gomb */}
              <li className="navbar-item">
                <button className="nav-link" onClick={logout}>
                  Kijelentkezés
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Bejelentkezés és Regisztráció linkek, ha nincs bejelentkezett felhasználó */}
              <li className="navbar-item">
                <Link className="nav-link" to="/bejelentkezes">
                  Bejelentkezés
                </Link>
              </li>
              <li className="navbar-item">
                <Link className="nav-link" to="/regisztracio">
                  Regisztráció
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}


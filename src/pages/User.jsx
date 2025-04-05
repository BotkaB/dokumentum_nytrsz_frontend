import React, { useState, useEffect } from "react";
import useAuthContext from "../contexts/AuthContext";
import useValidationContext from "../contexts/ValidationContext";

export default function User() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Context
  const { loginReg, errors, setErrors, user, getUser } = useAuthContext();
  const { validateRegistration, validationErrors } = useValidationContext();

  // Ha a felhasználó már be van jelentkezve, töltsük be az adatokat
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setId(user.id || "");
      setRole(user.role || "");
     
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors({});

    // Űrlapadatok összegyűjtése
    const adat = {
      name:name,
      email:email,
      password:password,
      password_confirmation:password_confirmation,
      role:role,
    };

    // Validáció
    const validation = validateRegistration(adat);

    if (Object.keys(validation).length === 0) {
      // Ha a felhasználó be van jelentkezve, akkor frissítjük az adatokat
      const vegpont = user ? `api/user/update` : "/register";
      console.log(adat)
      loginReg(adat, vegpont);
    } else {
      setErrors(validation); // Ha hibák vannak, akkor beállítjuk őket
    }
  };

  // Hibaüzenetek kezelése
  useEffect(() => {
    if (submitted && validationErrors) {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  }, [validationErrors, submitted, setErrors]);

  return (
    <div className=" m-auto" style={{ maxWidth: "400px" }}>
      <h1 className="text-center">{user ? "Felhasználói adatok módosítása" : "Regisztráció"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="name" className="form-label">
            Név:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="name"
            placeholder="Név"
            name="name"
          />
          <div>
            {errors.name && <span className="text-danger">{errors.name[0]}</span>}
          </div>
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Email"
            name="email"
          />
          <div>
            {errors.email && <span className="text-danger">{errors.email[0]}</span>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd" className="form-label">
            Jelszó:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="pwd"
            placeholder="Jelszó"
            name="pwd"
          />
          <div>
            {errors.password && <span className="text-danger">{errors.password[0]}</span>}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="pwd2" className="form-label">
            Jelszó újra:
          </label>
          <input
            type="password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="form-control"
            id="pwd2"
            placeholder="Jelszó újra"
            name="pwd2"
          />
          <div>
            {errors.password_confirmation && (
              <span className="text-danger">{errors.password_confirmation[0]}</span>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {user ? "Frissítés" : "Regisztrálok"}
        </button>
      </form>
    </div>
  );
}

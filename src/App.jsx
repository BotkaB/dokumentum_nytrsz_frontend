import { Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap";
import Bejelentkezes from "./pages/Bejelentkezes";
import Regisztracio from "./pages/Regisztracio";
import VendegLayout from "./layouts/VendegLayout";
import Statistics from "./pages/Statistics";
import Dokuments from "./pages/Dokuments";
import Admin from "./pages/Admin";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ValidationProvider } from "./contexts/ValidationContext";

function App() {
    return (
        <BrowserRouter>
           <ValidationProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<VendegLayout />}>
                        <Route index element={<Kezdolap />} />
                        <Route path="/statistics" element={<Statistics />} />
                        <Route path="/documents" element={<Dokuments />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="bejelentkezes" element={<Bejelentkezes />} />
                        <Route path="regisztracio" element={<Regisztracio />} />
                    </Route>
                </Routes>
            </AuthProvider>
            </ValidationProvider>
        </BrowserRouter>
    );
}

export default App;
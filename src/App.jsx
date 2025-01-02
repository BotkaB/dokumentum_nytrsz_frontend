import { Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap.jsx";
import Bejelentkezes from "./pages/Bejelentkezes.jsx";
import Regisztracio from "./pages/User.jsx";
import VendegLayout from "./layouts/VendegLayout";
import Statistics from "./pages/Statistics.jsx";
import Dokuments from "./pages/Dokuments.jsx";
import Admin from "./pages/Admin.jsx";
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
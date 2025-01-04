import { Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap.jsx";
import Bejelentkezes from "./pages/Bejelentkezes.jsx";
import User from "./pages/User.jsx";
import VendegLayout from "./layouts/VendegLayout";
import Statistics from "./pages/Statistics.jsx";
import Dokuments from "./pages/Dokuments.jsx";
import Admin from "./pages/Admin.jsx";
import AdminArticle from "./components/AdminArticle.jsx";
import NoPage from "./components/NoPage";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ValidationProvider } from "./contexts/ValidationContext";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <BrowserRouter>
           <ValidationProvider>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<VendegLayout />}>
                        <Route index element={<Kezdolap />} />
                        <Route path="bejelentkezes" element={<Bejelentkezes />} />
                        <Route path="regisztracio" element={<User />} />
                        <Route path="*" element={<NoPage />} />
                      
                    <Route path="/statistics" element={<Statistics />} />
                    
                    <Route path="/documents" element={<Dokuments />} />
                    
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/admin/felhasznalok" element={<AdminArticle tabla="users" />} />
                    <Route path="/admin/ugyfelek" element={<AdminArticle tabla="ugyfels" />} />
                    <Route path="/admin/*" element={<NoPage />} /> 
                    </Route>
                </Routes>
            </AuthProvider>
            </ValidationProvider>
        </BrowserRouter>
    );
}

export default App;
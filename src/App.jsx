import { Route, Routes } from "react-router-dom";
import Kezdolap from "./pages/Kezdolap.jsx";
import Bejelentkezes from "./pages/Bejelentkezes.jsx";
import User from "./pages/User.jsx";
import MainLayout from "./layouts/MainLayout.js";
import NincsJogosultsagLayout from "./layouts/NincsJogosultsagLayout.js";
import Statistics from "./pages/Statistics.jsx";
import Dokuments from "./pages/Dokuments.jsx";
import Admin from "./pages/Admin.jsx";
import AdminArticle from "./components/AdminArticle.jsx";
import NoPage from "./components/NoPage";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ValidationProvider } from "./contexts/ValidationContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
    return (
        <BrowserRouter>
            <ValidationProvider>
                <AuthProvider>
               <Header/>
                        <Routes>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<Kezdolap />} />
                                <Route path="bejelentkezes" element={<Bejelentkezes />} />
                                <Route path="regisztracio" element={<User />} />
                                <Route path="*" element={<NoPage />} />
                           
                            <Route path="/nincsjogosultsag" element={<NincsJogosultsagLayout />}>
                            </Route>
                            <Route path="/statistics" element={<Statistics />} />

                            <Route path="/documents" element={<Dokuments />} />

                            <Route path="/admin" element={<Admin />} />
                            <Route path="/admin/felhasznalok" element={<AdminArticle tabla="users" />} />
                            <Route path="/admin/ugyfelek" element={<AdminArticle tabla="ugyfels" />} />
                            </Route>

                        </Routes>
                <Footer/>
                </AuthProvider>
            </ValidationProvider>
        </BrowserRouter>
    );
}

export default App;
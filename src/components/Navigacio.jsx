import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import useAuthContext from "../contexts/AuthContext";
import StatisztikaNav from './StatisztikaNav';
import DokumentumNav from './DokumentumNav';
import AdminNav from './AdminNav';

export default function Navigacio() {
    const { user, logout } = useAuthContext();

    const getRoleBasedLinks = () => {
        if (!user ) {
            return null; // Ha a user objektum null, ne jelenítsünk meg semmit
        }

        if (user.role === 0) {
            // Admin szerepkör
            return (
                <>
                    <AdminNav/>
                    <DokumentumNav />
                    <StatisztikaNav />
                </>
            );
        } else if (user.role === 1) {
            // Dokumentum ellenőrző szerepkör
            return (
                <>
                    <DokumentumNav />
                    <StatisztikaNav />
                </>
            );
        } else if (user.role === 2) {
            // Statisztikai lekérdező szerepkör
            return (
                <StatisztikaNav />
            );
        }
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Kezdőlap</Nav.Link>
                        {/* A szerepkör alapján generáljuk a menüpontokat */}
                        {user ? (
                            <>
                                {getRoleBasedLinks()}
                                
                                <Nav.Link as={Link} to="/regisztracio">Adatmódosítás</Nav.Link>
                                <Nav.Link as={Link} to="/" onClick={logout}>Kijelentkezés</Nav.Link>
                            </>
                        ) : (
                            <>

                                <Nav.Link as={Link} to="/bejelentkezes">Bejelentkezés</Nav.Link>
                                <Nav.Link as={Link} to="/regisztracio">Regisztráció</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}



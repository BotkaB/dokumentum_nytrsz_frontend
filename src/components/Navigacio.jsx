import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import useAuthContext from "../contexts/AuthContext";

function Navigacio() {
    const { user, logout } = useAuthContext();

    const getRoleBasedLinks = () => {
        if (!user) {
            return null; // Ha a user objektum null, ne jelenítsünk meg semmit
        }

        if (user.role === 0) {
            // Admin szerepkör
            return (
                <>
                    <NavDropdown title="Admin" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/admin/felhasznalok">Felhasználók</NavDropdown.Item>

                        <NavDropdown.Item href="#action/3.2">Ügyfelek</NavDropdown.Item>                       
                        <NavDropdown.Divider />                       
                    </NavDropdown>
                    <NavDropdown title="Dokumentumok" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Statisztika" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </>
            );
        } else if (user.role === 1) {
            // Dokumentum ellenőrző szerepkör
            return (
                <NavDropdown title="Dokumentumok" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
            );
        } else if (user.role === 2) {
            // Statisztikai lekérdező szerepkör
            return (
                <NavDropdown title="Statisztika" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
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

export default Navigacio;

import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function DokumentumNav() {
    return (
        <NavDropdown title="Dokumentumok" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to="/documents/ugyfelek">Ügyfelek</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
    )
}
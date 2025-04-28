import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function DokumentumNav() {
    return (
        <NavDropdown title="Dokumentumok" id="basic-nav-dropdown">
             <NavDropdown.Item as={Link} to="/documents/ugyfelek">Ügyfelek</NavDropdown.Item>
        </NavDropdown>
    )
}
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

export default function AdminNav() {
    return (
        <NavDropdown title="Admin" id="basic-nav-dropdown">
            <NavDropdown.Item as={Link} to="/admin/felhasznalok">Felhasználók</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/admin/ugyfeltipusok">Ügyfél típusok</NavDropdown.Item>
            <NavDropdown.Divider />
        </NavDropdown>
    )
}
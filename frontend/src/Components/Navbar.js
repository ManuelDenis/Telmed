import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import axios from "axios";
import Logout from "../Login/Logout";

function Navbars() {
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
    if (token) {
      axios.get('/api/auth/user_info/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(response => {
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error('Eroare la obținerea informațiilor utilizatorului:', error);
      });
    }
  }, [token]);
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserInfo({});
        window.location.reload();
        Logout()
    }


  return (
    <Navbar expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand href="/" className='navbrand text-secondary'>{userInfo.username}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/Register">Register</Nav.Link>
            {token ? (
                <>
                <Nav.Link href="#"><strong>{userInfo.email}</strong></Nav.Link>
                <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                </>
            ) : (
                <Nav.Link href="/Login"><strong>Login</strong></Nav.Link>
            )}



            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
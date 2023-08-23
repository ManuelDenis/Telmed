import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import axios from "axios";
import Logout from "../Login/Logout";
import '../App.css';


function Navbars() {
    const [userInfo, setUserInfo] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
    if (token) {
      axios.get('/user_info/', {
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
    <Navbar expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="/">HomeApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 30 30"
    fill="none"
    className="custom-toggle-icon"
  >
    <rect width="30" height="30" fill="transparent" />
    <path
      d="M4 7h22M4 15h22M4 23h22"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</Navbar.Toggle>


          <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Dashboard">Dashboard</Nav.Link>

            <NavDropdown title="Dropdown" id="basic-navbar-nav">
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
            <Nav.Link href="/Register">Register</Nav.Link>
            {token ? (
                <>
                <Nav.Link href="#"><strong>{userInfo.email}</strong></Nav.Link>
                <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                </>
            ) : (
                <Nav.Link href="/Login"><strong>Login</strong></Nav.Link>
            )}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
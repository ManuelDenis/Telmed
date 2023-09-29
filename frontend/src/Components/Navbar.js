import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useEffect, useState} from "react";
import axios from "axios";
import Logout from "../Login/Logout";
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function Navbars() {
    const [userInfo, setUserInfo] = useState({});
    const [profile, setProfile] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));

    const getProfile = async () => {
    axios.get('/medical/profile-med/0/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Eroare la preluarea datelor de profil:', error);
      });
    };
    useEffect(() => {
    if (token) {
      axios.get('/user_info/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(response => {
        setUserInfo(response.data);
        getProfile();
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
        setProfile({});
        window.location.reload();
        Logout()
    }


  return (
    <Navbar expand="lg" className="mb-5">
      <Container>
        <Navbar.Brand href="/">TelMed</Navbar.Brand>
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


          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-lg-0">
            {profile.name ? null : <Nav.Link href="/Question">Q&Ans</Nav.Link>}
            <Nav.Link href="/Category">Categories</Nav.Link>
            <Nav.Link href="/ProfileMedList">Medici</Nav.Link>
            {profile.name ? <Nav.Link href="/ProfileMed"><strong>Q&Ans</strong></Nav.Link> : null}


            {userInfo.email ? (
                <>
                {profile.user ? (
                    <>
              <Nav.Link href="/ProfileMedUpdate">
                  {userInfo.email.split('@')[0]}
              </Nav.Link>
                    </>
                ):(
            <Nav.Link href="#">{userInfo.email.split('@')[0]}</Nav.Link>
                )}

                <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
                </>
            ) : (
                <>
                <Nav.Link href="/Login"><strong>Login</strong></Nav.Link>
                <Nav.Link href="/Register">Register</Nav.Link>
                </>
            )}



          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;
import Container from 'react-bootstrap/Container';
import {useEffect, useState} from "react";
import axios from "axios";
import Logout from "../Login/Logout";
import '../App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Col, Row} from "react-bootstrap";


function Footer() {
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
      <Container className="mt-5">
          <Row className='justify-content-md-center text-center p-2 pt-5 pb-5'>
              <Col lg={3}>
                  <h5>Telmed</h5>
              </Col>
              <Col lg={3}>
                  <h5>Contact</h5>
              </Col>
                {userInfo.email ? (
                <>
                {profile.user ? (
                    <>
                    </>
                ) : (
                    <>
                        <Col lg={3} className='bg-info-subtle rounded-4 p-3'>
                        <h4 className='text-dark'>Parteneri</h4>
                        <a href="/ProfileMedRegister" className='medic-reg'>Coleg medic,<br /> te invităm să-ți construiești<br /> profilul medical<br /> în comunitatea noastră.<br />Alătură-te astăzi echipei<br /> noastre de specialiști<br /> în sănătate!</a>
                        </Col>
                    </>
                )}

                </>
                 ) : (
                <>
              <Col lg={3} className='bg-info-subtle rounded-4 p-3'>
                        <h4 className='text-dark'>Parteneri</h4>
                        <a href="/ProfileMedRegister" className='medic-reg'>Coleg medic,<br /> te invităm să-ți construiești<br /> profilul medical<br /> în comunitatea noastră.<br />Alătură-te astăzi echipei<br /> noastre de specialiști<br /> în sănătate!</a>
              </Col>
                </>
                 )}

          </Row>
      </Container>
  );
}

export default Footer;
import React, {useEffect, useState} from 'react'
import Login from "../Login/Login";
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import Logout from "../Login/Logout";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';


const Dashboard = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        Logout()
    }


    if(!token){
        {return <Login />}
    }
    return (
      <Container>
          <Row className="justify-content-md-center">
              <Col>
          <h3>Dashboard</h3>
          <Button onClick={logout}>Logout</Button>
              </Col>
          </Row>
          <p><small>Token </small>{token}</p>
      </Container>
  )
}

export default Dashboard
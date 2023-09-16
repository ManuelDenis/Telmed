import React, {useEffect, useState} from 'react'
import Login from "../Login/Login";
import axios from "axios";
import {Button, Col, Row} from "react-bootstrap";
import Logout from "../Login/Logout";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.css';
import ProfileMEdList from "../Medical/ProfileMEdList";


const Dashboard = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        Logout()
    }

    return (
        <>
          <ProfileMEdList />
        </>
  )
}

export default Dashboard
import React, {useState} from 'react'
import {Container, Button, Row, Col} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Login from "../Login/Login";
import {Link} from "react-router-dom";


const Register = () => {
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleRegister = async (e) => {
    e.preventDefault();
     try {
      await axios.post(`/api/auth/create/`, formData);
      window.location.href = '/ConfirmationSent';
      setFormData({
          email: '',
          password: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setMsg(error.response.data.email);
    }
  };
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col lg={4}>
        <h2 className="text-center pb-5">Register</h2>

{msg && (
  <div>
    <p className='text-warning lead'>
      <FontAwesomeIcon icon={faExclamationTriangle} className='warning-icon' />{' '}
      {msg}
    </p>
  </div>
)}


        <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
          />
        </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
          />
        </Form.Group>
            <p>Already have an account?
                <Link to="/login">
                    <strong className="text-info"> Sign in</strong>
                </Link>
            </p>
        <Button type="submit" className="small">
          Register
        </Button>
      </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Register
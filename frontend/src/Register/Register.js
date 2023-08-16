import React, {useState} from 'react'
import {Container, Button, Row, Col} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";


const Register = () => {
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
      alert('An error occurred while register!');
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
        <Row>
            <Col lg={6}>
        <h4>Register</h4>
        <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3">
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
          <Form.Control
            size="lg"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
          />
        </Form.Group>
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
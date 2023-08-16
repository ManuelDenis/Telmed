import React, {useState} from 'react'
import {Button, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

const Login = () => {
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
     });
     const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
     };

    const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/api/auth/login/', formData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/Dashboard';
      })
      .catch((error) => {
      setMsg(error.response.data.non_field_errors);
      });
    };

  return (
      <Container>
        <Row>
            <Col lg={6}>
        <h4>Login</h4><p className='text-danger'>{msg}</p>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Group>
            <Form.Group className="mb-3">
          <Form.Control
            size="lg"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
        <Button type="submit" className="small">
          Login
        </Button>
      </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Login
import React, {useState} from 'react'
import {Button, Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

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
        <Row className="justify-content-md-center">
            <Col lg={4}>
        <h2 className='text-center pb-5'>Login</h2>
{msg && (
  <div>
    <p className='text-warning lead'>
      <FontAwesomeIcon icon={faExclamationTriangle} className='warning-icon' />{' '}
      {msg}
    </p>
  </div>
)}        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            name="password"
              value={formData.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Group>
                <p><Link to="/PasswordReset">
                    <strong className="text-info">Forget password?</strong>
                </Link></p>
            <p>Don't have an account?
                <Link to="/register">
                    <strong className="text-info"> Sign up</strong>
                </Link>
            </p>
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
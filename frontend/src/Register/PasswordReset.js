import React, { useState } from 'react';
import axios from 'axios';
import {Col, Container, Row} from "react-bootstrap";

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/reset-password/email/', { email })
      .then((response) => {
        setMessage(response.data.detail);
        window.location.href = '/PasswordResetLinkConfirmation';
      })
      .catch((error) => {
          setMessage(error.response.data.detail);
      });
  };

  return (
      <Container>
        <Row className="justify-content-md-center">
            <Col lg={4}>
      <h2 className="text-center pb-5">Password Reset</h2>
                <p>Enter your email address below to receive a link for password reset:</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
      </form>
            </Col>
        </Row>
      </Container>
  );
};

export default PasswordReset;

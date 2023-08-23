import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {Container, Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';

const ResetPasswordPage = () => {
  const { user_id, token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`/reset-password/${user_id}/${token}/`, { new_password: newPassword })
      .then((response) => {
        setMessage(response.data.detail);
      })
      .catch((error) => {
        setMessage(error.response.data.detail);
        console.error('Error resetting password:', error);
      });
  };

  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col lg={4}>
      <h2 className="text-center pb-5">Password Reset</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="newPassword">
          <Form.Label>New Password:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Reset Password
        </Button>
      </Form>
      <p>{message}</p>
            </Col>
        </Row>
    </Container>
  );
};

export default ResetPasswordPage;

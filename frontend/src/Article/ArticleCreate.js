import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

const ArticleCreate = () => {
   const token = localStorage.getItem('token');
   const [formData, setFormData] = useState({
          title: '',
          content: '',
        });

    useEffect(() => {
    }, []);
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/medical/article-create/', formData, {headers: {Authorization: `Token ${token}`}});
      setFormData({
          title: '',
          content: '',
        });
        window.location.href = '/Homepage';
    } catch (error) {
        alert(error);
        console.error('Error:', error.response.data);
    }
    };
    const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
          <Row>
              <Col lg={6}>
          <Form.Group className="mb-3 mt-3" controlId="title">
              <Form.Label>*Titlu articol<br /><small className="text-info fw-lighter bi-info-circle mt-0">Titlu articol</small>
              <br /></Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="content">

          <Form.Label>*Adauga contiut articol</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Continut articol"
          />
        </Form.Group>
              </Col>
              <Col lg={8}>
          <Button variant="primary" type="submit" className="mt-3 mb-5">
          Trimite
        </Button>
              </Col>

          </Row>
      </Form>
    </Container>
  );
};

export default ArticleCreate;

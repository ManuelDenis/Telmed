import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

const QuestionCreate = () => {
   const token = localStorage.getItem('token');
   const [category, setCategory] = useState([]);
   const [formData, setFormData] = useState({
          name: '',
          category: [],
          text: '',
        });

    useEffect(() => {
        getCategories();
    }, []);
    const getCategories = async () => {
        try {
            const response = await axios.get('/medical/category/');
            const data = response.data;
            setCategory(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`/medical/question-create/`, formData, {headers: {Authorization: `Token ${token}`}});
      setFormData({
          name: '',
          category: [],
          text: '',
        });
        window.location.href = '/Question';
    } catch (error) {
        alert(error);
        console.error('Error:', error.response.data);
    }
    };
    const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    };
    const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({...prevData, category: selectedOptions,
    }));
    };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
          <Row>
              <Col lg={6}>
          <Form.Group className="mb-3 mt-3" controlId="name">
              <Form.Label>*Numele tau<br /><small className="text-info fw-lighter bi-info-circle mt-0">Poti adauga numele tau sau un nume fictiv, vei fi notificat pe adrsa de email atunci cand primesti raspuns</small>
              <br /></Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="text">

          <Form.Label>*Adreseaza o intrebare</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Text Intrebare"
            required
          />
        </Form.Group>
              </Col>
              <Col lg={5} className="mt-5">
          <Form.Group className="mb-3" controlId="category">
          <Form.Label>*Categorie<br />
              <small className="text-warning">* Poti selecta categorii multiple</small></Form.Label>
          <Form.Control
            as="select"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            multiple
            required
            style={{ height: '200px' }}
          >
            <option value="">Select a category</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
              </Col>
              <Col lg={3}>
          <Button variant="primary" type="submit" className="mt-3 mb-5">
          Trimite
        </Button>
              </Col>

          </Row>
      </Form>
    </Container>
  );
};

export default QuestionCreate;

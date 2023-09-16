import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Button, Row, Col} from 'react-bootstrap';
import Container from "react-bootstrap/Container";

const ProfileMedRegister = () => {
   const token = localStorage.getItem('token');
   const [category, setCategory] = useState([]);
   const [formData, setFormData] = useState({
          name: '',
          category: [],
          job_title: '',
          company: '',
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
      await axios.post(`/medical/profile-med-create/`, formData, {headers: {Authorization: `Token ${token}`}});
      setFormData({
          name: '',
          category: [],
          job_title: '',
          company: '',
        });
        window.location.href = '/ProfileMed';
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
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOptions,
    }));
    };

  return (
    <Container>


      <h2 className="text-center">Creeaza profilul medical</h2>
      <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
              <Col lg={3}>
          <Form.Group className="mb-3 mt-3" controlId="name">
          <Form.Label>Nume si prenume</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </Form.Group>
              </Col>
              <Col lg={3}>
          <Form.Group className="mb-3 mt-3" controlId="job_title">
          <Form.Label>Profesia/Specializare</Form.Label>
          <Form.Control
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="Profesia"
          />
        </Form.Group>
              </Col>
              <Col lg={3}>
          <Form.Group className="mb-3 mt-3" controlId="company">
          <Form.Label>Unitate</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Unitate"
          />
        </Form.Group>
              </Col>
              <Col lg={6}>
          <Form.Group className="mb-3" controlId="category">
          <Form.Label>Specializarile medicale<br /><small className="text-warning">* Poti selecta specializari multiple</small></Form.Label>
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
        <Button variant="primary" type="submit" className="mt-3">
          Create Profile
        </Button>

              </Col>

          </Row>
      </Form>


    </Container>
  );
};

export default ProfileMedRegister;

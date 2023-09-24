import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Col, Form, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Profile() {
  const token = localStorage.getItem('token');
  const [category, setCategory] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get('/medical/profile-med/0/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => {
        setFormData(response.data);
        getCategories();
      })
      .catch((error) => {
        console.error('Eroare la preluarea datelor de profil:', error);
      });
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prevData) => ({
      ...prevData,
      category: selectedOptions,
    }));
    };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(`/medical/profile-update/${formData.id}/`, formData, {headers: {Authorization: `Token ${token}`}});
      setFormData({
          user: '',
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

  return (
          <Container>

              <h2 className="text-center">Profil medical<br /><small className="fw-lighter">Update</small></h2>
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
          Update Profile
        </Button>

              </Col>
              <Col lg={9} className="text-start">
                  <p className="mt-5 fw-lighter">* Acesta este un formular special conceput pentru a-ți permite să faci modificări ale profilului tău medical. Cu ajutorul acestui formular, poți actualiza informații precum numele, titlul de job și compania ta. Este o unealtă utilă pentru menținerea și gestionarea datelor personale în ceea ce privește profilul tău medical. Poți completa și salva modificările făcute pentru a asigura că informațiile tale sunt mereu actualizate și precise. Acest formular facilitează gestionarea profilului tău medical într-un mod simplu și eficient.</p>
              </Col>

          </Row>
      </Form>


    </Container>
  );
}

export default Profile;

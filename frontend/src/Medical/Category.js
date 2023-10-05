import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import {Accordion, Badge, Button, Card, Col, FloatingLabel, ListGroup, Row} from "react-bootstrap";
import {FaStar} from "react-icons/fa";

function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);
    const getCategories = async () => {
        try {
            const response = await axios.get('/medical/category/');
            const data = response.data;
            setCategories(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    function StarRating({ rating }) {
  const filledStars = Math.floor(rating);
  let hasHalfStar = rating % 1 !== 0;

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= filledStars) {
      stars.push(<FaStar key={i} className="text-warning" />);
    } else if (hasHalfStar) {
      stars.push(<FaStar key={i} className="text-warning" style={{ opacity: 0.5 }} />);
      hasHalfStar = false;
    } else {
      stars.push(<FaStar key={i} className="text-secondary" />);
    }
  }

  return <>{stars}</>;}

    return (
        <Container>
            <Row>
    <h4 className="mb-5 p-3">Lista de categorii medicale</h4>
                <Col lg={8}>

                    <Accordion defaultActiveKey="0">
                            {categories?.map(category => (
                                <Row key={category.id}>
                                    <Col>
        <Accordion.Item eventKey={category.id} className="m-2">
        <Accordion.Header><h6>{category.name}</h6></Accordion.Header>
        <Accordion.Body>


            <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="me-auto">
        <div className="fw-bold lead">{category.name}</div>
            {category.description}<br />
        <Button variant="outline-primary btn-sm shadow">Afla mai multe</Button>{' '}

        </div>
          <div>
          </div>
      </ListGroup.Item>

      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="me-auto">
            <div className="fw-bold lead"><small>Afectiuni comune tratate</small></div>
            {category.dis}...
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start bg-light"
      >
        <div className="me-auto">
            <div className="fw-bold"><small>Medici:
                {category.profiles?.map(med => (
                <>
                <h5><br />{med.name}</h5>

                <div className="mb-2 fw-lighter">
              <small className="text-primary">
                <StarRating rating={med.average_rating} />
              </small>
              {med.average_rating} ({med.total_votes} votes)
                </div>

                <p>{med.job_title}</p>
                </>
                ))}
            </small></div>

        </div>
      </ListGroup.Item>

      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-3 me-auto">
            <div className="fw-bold">Intrebari recente:</div>

                {category.questions?.map(que => (
                    <li className="m-0">{que.text}</li>
                ))}



        </div>

      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <div className="ms-2 me-auto">
          <div className="fw-bold"></div>
        </div>
        <Badge bg="primary" pill>
          <Button variant="primary">Intreaba</Button>
        </Badge>
      </ListGroup.Item>

    </ListGroup>



        </Accordion.Body>
      </Accordion.Item>
                                    </Col>
                                </Row>
                             ))}
                     </Accordion>
                </Col>
            </Row>
        </Container>
    );
}

export default Category;

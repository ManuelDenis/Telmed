import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Form, Button, Col, Row, ListGroup, Badge, Accordion, Card} from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import { FaStar } from 'react-icons/fa';

const ProfileMEdList = () => {
  const [profiles, setProfiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

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
  useEffect(() => {
    getProfiles();
    getCategories();
    getQuestions();
  }, []);
  const getProfiles = async () => {
    try {
      const response = await axios.get('/medical/profiles/');
      setProfiles(response.data);
    } catch (error) {
      console.error('Eroare la încărcarea categoriilor:', error);
    }
  };
  const getQuestions = async () => {
        try {
            const response = await axios.get('/medical/question/');
            const data = response.data;
            setQuestions(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };

  return (
      <Container>
        <Row>

          <Col lg={7}>
        <h1 className="pb-5 pt-5">Află mai multe despre medicii înregistrați în rețeaua noastră medicală</h1>

        <Accordion defaultActiveKey="0">
          {profiles.map(profile => (
            <Accordion.Item eventKey={profile.id} className="mb-3 rounded-3" key={profile.id}>
              <Row className="align-items-center pt-3">
                <Col>
            <div className="text-secondary mt-2 mb-2 text-center">
              <strong className="text-secondary">
                  <h2 className='fw-bold'>{profile.average_rating}</h2>
                <StarRating rating={profile.average_rating} />
              </strong>
              ({profile.total_votes} votes)
            <h5 className='mt-3 text-dark'>{profile.name}</h5>
  <Row className='justify-content-md-center'>
      <Col className='text-center'>

        {profile.category?.map(catId => (
          categories.map(categ => (
              categ.id === catId ? <> | {categ.name}</> : null
          ))
        ))}
      </Col>
  </Row>
            </div>
                </Col>
              </Row>

<Accordion.Header>
</Accordion.Header>



              <Accordion.Body>

                <p className="lead text-center pb-5 pt-3">{profile.job_title}</p>
                  <Row>
                      <h6 className="text-secondary">Review pacienti:</h6>
                  </Row>

    <ListGroup as="ol">
        {profile.answer_med.map(ansmed => (
            <>
                {questions.map(que => (
                    <>
                        {que.id === ansmed.question && <p><strong>{que.text}</strong><br />{ansmed.text}</p>}

                    </>
                ))}

            </>
        ))}



    </ListGroup>

              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

          </Col>
        </Row>
      </Container>
  );
};

export default ProfileMEdList;

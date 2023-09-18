import Container from "react-bootstrap/Container";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import {Badge, Button, Col, Form, ListGroup, Offcanvas, Row, Tab, Tabs} from "react-bootstrap";
import {FaStar} from "react-icons/fa";

function ProfileMed () {
  const [show, setShow] = useState(false);
  const token = localStorage.getItem('token');
  const [profile, setProfile] = useState({});
  const [profiles, setProfiles] = useState([]);
  const [question, setQuestion] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    text: '',
    question: null,
  });
  const [selectedQuestionId, setSelectedQuestionId] = useState('');
  const [selectedQuestionText, setSelectedQuestionText] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  useEffect(() => {
    axios.get('/medical/profile-med/0/', {headers: {Authorization: `Token ${token}`}})
      .then((response) => {
        setProfile(response.data);
        getQuestion();
        getCategories();
        getProfiles();
      })
      .catch((error) => {
        console.error('Eroare la preluarea datelor de profil:', error);
      });
  }, []);
  const getProfiles = async () => {
    try {
      const response = await axios.get('/medical/profiles/');
      setProfiles(response.data);
    } catch (error) {
      console.error('Eroare la încărcarea categoriilor:', error);
    }
  };
  const getQuestion = async () => {
    try {
      const response = await axios.get('/medical/question-med/', {headers: {Authorization: `Token ${token}`}});
      setQuestion(response.data);
    } catch (error) {
      console.error('Eroare la încărcarea categoriilor:', error);
    }
  };
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.question = selectedQuestionId;
    try {
      await axios.post(`/medical/answers-create/`, formData, {headers: {Authorization: `Token ${token}`}});
      setFormData({
        text: '',
        question: null,
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

  return (
  <Container>
        <Tabs
      defaultActiveKey="questions"
      id="uncontrolled-tab-example"
      className="mb-3 bg-primary-subtle rounded-3"
    >
      <Tab eventKey="questions" title="Questions" className="custom-tab bg-light-subtle text-dark p-2 rounded-5">
        <Row>
        <Col lg={6}>
    <p className="fw-semibold mt-5">Întrebări din categoriile în care activați:</p>

    {question?.map((que) => (
      <p key={que.id} className='p-2'>
        {que.category.map(catId => (
            <>
              {categories.map(cat => (
                  <>
                    {catId === cat.id && <> <small>{cat.name}</small></>}
                  </>
              ))}
            </>
        ))}

        <br /><small>{que.added}</small><br /><br/>
        <h6><i className='bi bi-patch-question-fill text-danger rounded-5'></i><strong style={{'color': "indigo"}}> {que.name} | {que.text}</strong></h6><br/><br/>

    {que.answers?.map(ans => (
                <>
  <p>{profiles.map((prof) => (

  <div key={prof.id} className="lead">
    {prof.id === ans.med && (
        <small>
          <i className='bi bi-chat-dots-fill text-info'></i> <strong>{prof.name}</strong> | {ans.text}<br />
        </small>
    )}
  </div>

      ))}
    </p>

                </>
            ))}
              <Button className="btn-sm shadow-lg rounded-5" variant="primary" onClick={() =>
              { setSelectedQuestionId(que.id);
                handleShow();
                setSelectedQuestionText(que.text)}}>
                Răspunde
              </Button>

        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Raspunde!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p><strong>Question:</strong><br />{selectedQuestionText}</p>

          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-5" controlId="text">
          <Form.Label>Raspuns:</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder="Raspuns"
            required
          />
        </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 mb-5">
          Trimite
        </Button>

      </Form>


        </Offcanvas.Body>
      </Offcanvas>



        <hr />
      </p>
    ))}
  </Col>
        </Row>
      </Tab>
      <Tab eventKey="profile" title="Profile" className="custom-tab">
        <Row>
        <Col lg={6} className='p-2 pb-3'>


          <div className="mt-5">
            <h3>{profile.name}</h3>
            <div className="lead">
              <strong className="text-primary">
                <StarRating rating={profile.average_rating} />
              </strong>
              {profile.average_rating} ({profile.total_votes} votes)
            </div>
          </div>


          <ListGroup as="ul" className='mt-2'>
            <ListGroup.Item as="li">
              <h4>Date personale</h4>
              <div className="fw-bold text-secondary">Nume</div>
              <div className="p-2">{profile.name}</div>
              <div className="fw-bold mt-3 text-secondary">Profesia</div>
              <div className="p-2">{profile.job_title}</div>
              <div className="fw-bold mt-3 text-secondary">Unitate</div>
              <div className="p-2">{profile.company}</div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        </Row>
      </Tab>
      <Tab eventKey="review" title="Review">
        <Row>
        <Col lg={6}>
          <div className="mt-5">
            <h3>Review pacienti</h3>
          </div>

          <ListGroup as="ul" numbered>
            {profile.profile_comments?.map((comm, index) => (
              <ListGroup.Item as="li" key={index}>
                <div className="fw-bold small text-secondary">{comm.name}</div>
                <div>{comm.added}</div>
                <div className="p-2">{comm.text}</div>
                <Badge bg="primary" pill>14</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        </Row>
      </Tab>
    </Tabs>

  </Container>
);

}

export default ProfileMed;
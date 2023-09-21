import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import {
    Accordion,
    Badge,
    Button,
    Card,
    Col,
    FloatingLabel,
    Form,
    ListGroup,
    Offcanvas,
    Row, Tab,
    Tabs
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHandHoldingMedical } from 'react-icons/fa';
import StarRatingCreate from './StarRatingCreate';
import CommentCreateModal from "./CommentCreate";

function Question() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [question, setQuestion] = useState([]);
    const [userQuestion, setUserQuestion] = useState([]);
    const token = localStorage.getItem('token');
    const [login, setLogin] = useState('False');
    const [category, setCategory] = useState([]);
    const [formData, setFormData] = useState({
          name: '',
          category: [],
          text: '',
        });
    const [profile, setProfile] = useState([]);


    useEffect(() => {
        getCategories();
        getQuestions();
        getUserQuestions();
        getProfiles();
        isLogin();
    }, []);
    const isLogin = () => {
          if (token) {
    setLogin(true);
          } else {
    setLogin(false);
  }
    };
    const getProfiles = async () => {
    try {
      const response = await axios.get('/medical/profiles/');
      setProfile(response.data);
    } catch (error) {
      console.error('Eroare la încărcarea categoriilor:', error);
    }
  };
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
    const getQuestions = async () => {
        try {
            const response = await axios.get('/medical/question/');
            const data = response.data;
            setQuestion(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };
    const getUserQuestions = async () => {
        try {
            const response = await axios.get('/medical/question-user/', {headers: {Authorization: `Token ${token}`}});
            const data = response.data;
            setUserQuestion(data);
        } catch (error) {
            console.error('Eroare:', error)
        }
    };

    return (
        <Container>
            <Row>
                <Col lg={7} className='first-row rounded-end-circle pt-5 pb-5 p-3'>
                    {login ? (

    <Tabs
      defaultActiveKey="myQuestions"
      id="uncontrolled-tab-example"
      className='pt-5 rounded-start-5 px-2'
    >
      <Tab eventKey="myQuestions" title="My Questions">
   <ListGroup as="ol" numbered className="mt-5 rounded-4">
      {userQuestion?.map(que =>(
                 <>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start mb-1"
      >
        <div className="ms-2 me-auto">
        <div className="fw-bold text-secondary">
      {que.category.map(catId => (
            <>
              {category.map(cat => (
                  <>
                    {catId === cat.id && <> <small>{cat.name}</small></>}
                  </>
              ))}
            </>
        ))}
          </div>
            <p className="mt-4"><i className='bi bi-patch-question-fill text-danger' style={{'font-size': 18}}></i> <strong>{que.text}</strong></p><br />
            <Row>

      {que.answers?.map(ans => (
   <Col className="mb-4 pb-2" lg={12} style={{ borderLeft: '3px solid lightblue', borderRadius: '15px' }}>
    {profile.map((prof) => (
  <>
    {prof.id === ans.med && (
        <>
            <FaHandHoldingMedical fontSize={35} color='indigo'/><br />
            <strong>{prof.name}</strong><br />
        </>
    )}
  </>
      ))}
       <div className='mb-2'> {ans.text}</div>

       {ans.comments.map(com => (
           <div className='p-2'>
               <div><i className='bi bi-chat-text text-secondary' style={{'font-size': 20}}> </i>{com.text}</div>
           </div>
       ))}
<br /><br /><br />


{/* Verificăm dacă există voturi asociate acestui răspuns */}
{ans.answer_vote.length > 0 ? (
  <Button variant='light' className='btn-sm rounded-2 p-1' disabled>Review acordat!</Button>
) : (
          <>
          <StarRatingCreate answerId={ans.id} />
          </>
)}
          <CommentCreateModal answerId={ans.id} />
                </Col>
            ))}

            </Row>
        </div>

      </ListGroup.Item>
                 </>
             ))}

    </ListGroup>

      </Tab>
      <Tab eventKey="ask" title="Ask Me" onClick={handleShow}>
        <Button className='m-3 mt-5 rounded-5' variant="primary" onClick={handleShow}>Intreaba</Button>
      </Tab>
    </Tabs>
                    ) :
                        (
                            <h5 className="mt-5 pt-5">Pentru a putea adresa intrebari<br /> este necesar sa te autentifici.<br />
                                <Button href="/Login" className="btn-sm mt-5">Login</Button>
                            </h5>
                        )}

                </Col>
                <Col lg={5}>
        <p className='mt-5 mb-5 text-center display-6'>Categorii<br /> medicale<br /> si intrebari<br /> recente</p>

        <Row className=' mb-1'>

<Accordion defaultActiveKey="0" className='mt-5'>
  {category?.map(cat => (
    <Row key={cat.id}>
      <Col>
        <Accordion.Item eventKey={cat.id} className="m-1">
          <Accordion.Header>
            <h6 style={{ display: 'flex', alignItems: 'center' }}>
              {cat.name}
              <Badge
                className={`m-1 ${cat.questions.length > 0 ? 'bg-danger' : 'bg-secondary'}`}
                style={{ marginLeft: 'auto' }}
              >
                {cat.questions.length}
              </Badge>
            </h6>
          </Accordion.Header>
          <Accordion.Body>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-3 me-auto">
                  <div className="fw-bold">Intrebari recente:</div>
                  {cat.questions?.map(que => (
                    <li className="m-0" key={que.id}>{que.text}</li>
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

            </Row>

                </Col>
            </Row>



      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Intreaba!</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

                  <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 mt-3" controlId="name">
              <Form.Label>Numele tau<br /><small className="fw-lighter bi-info-circle mt-0"> Poti adauga numele tau sau un nume fictiv, vei fi notificat pe adrsa de email atunci cand primesti raspuns</small>
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
          <Form.Group className="mb-3 mt-5" controlId="text">

          <Form.Label>Adreseaza o intrebare</Form.Label>
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
          <Form.Group className="mb-3 mt-5" controlId="category">
          <Form.Label>*Categorie<br />
              <small className="bi-info-circle fw-lighter"> Poti selecta categorii multiple</small></Form.Label>
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
          <Button variant="primary" type="submit" className="mt-3 mb-5">
          Trimite
        </Button>

      </Form>


        </Offcanvas.Body>
      </Offcanvas>
        </Container>
    );
}

export default Question;
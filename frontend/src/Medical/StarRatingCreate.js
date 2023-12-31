import React, { useState } from 'react';
import {Badge, Button, ButtonGroup, Modal, Form} from 'react-bootstrap';
import axios from 'axios';
import {FaStar} from "react-icons/fa";

const StarRatingCreate = ({ answerId }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const token = localStorage.getItem('token');
  const [rating, setRating] = useState(null);
  const [message, setMessage] = useState('');
  const [reviewText, setReviewText] = useState('');

  const handleRatingClick = async (value) => {
    setRating(value);
    try {
      const response = await axios.post('/medical/answer-vote-create/', {answer: answerId, vote: value, review: reviewText}, {headers: {Authorization: `Token ${token}`}});
      handleClose();
      window.location.reload();
    } catch (error) {
    setMessage('Ati acordat deja un review pentru acest raspuns');
    }
  };

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow} className="btn-sm rounded-2 bg-danger-subtle shadow">
        Acorda review!
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Acorda review pentru raspunsul primit!</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <Form.Group>
            <Form.Label>Parerea ta conteaza!</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Introduceți review-ul dvs. aici"
              className="bg-warning-subtle"
            />
      </Form.Group>

      <ButtonGroup aria-label="Rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <div key={value}>
            <FaStar
              onClick={() => handleRatingClick(value)}
              color={rating >= value ? 'orange' : 'lightgray'}
              size={25}
              style={{ cursor: 'pointer' }}
            />
          </div>
        ))}
      </ButtonGroup>


        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default StarRatingCreate;

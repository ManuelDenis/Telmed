import {Button, Form} from "react-bootstrap";
import React, {useState} from "@types/react";
import axios from "axios";

function CommentCreate() {
    const [commentFormData, setCommentFormData] = useState({
        answer: 0,
        text: '',
    });
    const handleCommentChange = (e) => {
    setCommentFormData({...commentFormData, [e.target.name]: e.target.value});
    };
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        setCommentFormData({ ...commentFormData, answer: answerId });
    try {
      await axios.post(`/medical/comment_create/`, commentFormData, {headers: {Authorization: `Token ${token}`}});
      setCommentFormData({
          answer: 0,
          text: '',
        });
    } catch (error) {
        alert(error);
        console.error('Error:', error.response.data);
    }
    };
    return (
        <>
     <Form onSubmit={handleCommentSubmit} controlId='textcomment'>
          <Form.Group className="mb-3 mt-5">

          <Form.Label>Adreseaza o intrebare</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            type="text"
            name="text"
            value={commentFormData.text}
            onChange={handleCommentChange}
            placeholder="Comenteaza..."
            required
          />
        </Form.Group>
          <Button variant="primary" type="submit" className="mt-3 mb-5">
          Trimite
        </Button>

      </Form>
        </>
    )
}

export default CommentCreate;
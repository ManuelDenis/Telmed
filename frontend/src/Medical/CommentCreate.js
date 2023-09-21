import { useState } from "react";
import { Modal, Container, Button, Form } from "react-bootstrap";
import axios from "axios";

const CommentCreateModal = ({ answerId }) => {
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    answer: answerId,
    text: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleCommentChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    setFormData({ ...formData, answer: answerId });
    try {
      await axios.post(`/medical/comment_create/`, formData, {
        headers: { Authorization: `Token ${token}` },
      });
      setFormData({
        answer: 0,
        text: "",
      });
      setShowModal(false);
    } catch (error) {
      alert(error);
      console.error("Error:", error.response.data);
    }
  };

  return (
    <>
      <Button
        variant="outline-dark"
        className="btn-sm bg-primary-subtle rounded-2 shadow mx-2"
        onClick={() => setShowModal(true)}
      >
        Comenteaza!
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comentariu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleCommentSubmit} controlId={answerId}>
              <Form.Group className="mb-3 mt-5">
                <Form.Label>Adauga un comentariu {answerId}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  type="text"
                  name="text"
                  value={formData.text}
                  onChange={handleCommentChange}
                  placeholder="Comenteaza..."
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="mt-3 mb-5"
              >
                Trimite
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CommentCreateModal;

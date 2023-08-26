import React from 'react'
import {Col, Row} from "react-bootstrap";

const PasswordResetLinkConfirmation = () => {
  return (
    <div>
        <Row className="justify-content-md-center">
            <Col lg={6} className="text-center">
      <h5 className="text-white text-2xl font-bold">A password reset link has been sent to the provided email address. Please access it to reset your password.</h5>
            </Col>
        </Row>
    </div>
  )
}

export default PasswordResetLinkConfirmation
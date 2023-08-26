import React from 'react'
import {Col, Row} from "react-bootstrap";

const PasswordResetConfirmation = () => {
  return (
    <div>
        <Row className="justify-content-md-center">
            <Col lg={6} className="text-center">
      <h5 className="text-white text-2xl font-bold">Your password has been successfully reset. To access your account go to Login page.</h5>
            </Col>
        </Row>
    </div>
  )
}

export default PasswordResetConfirmation
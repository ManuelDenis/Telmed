import React from 'react';
import {Badge, Card, Col, Container, Row} from 'react-bootstrap';
import backgroundImage from './pnf.png';


const HomePage = () => {
  const pageStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };
  const cardStyles = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
  };
  const cardStyle = {
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',

  };
  return (
    <Container style={pageStyle}>
      <Row>
        <Col lg={9} className="d-flex align-items-center">
          <Card style={cardStyles}>
            <Card.Body>
              <Card.Title>
                <h1 className="p-3 pt-0 pb-0">
                  <strong className="text-light">TEL</strong>
                  <strong>MED</strong>
                </h1>
              </Card.Title>



              <Card.Text>
          <Card style={cardStyle} className="shadow mt-3">
            <Card.Body>
              <Card.Title>
              </Card.Title>
              <Row>
                <Col lg={8} className="d-flex align-items-center">
              <Card.Text>
                <p className="fw-bold text-light">Bun venit la TelMed.pro, aici puteți pune
                  întrebări unei comunități de profesioniști în
                  domeniul medical.</p>
                <p className="text-light">Solicitați <strong className="text-warning fw-bold">sfaturi</strong> și <strong className='text-warning fw-bold'>recomandări</strong> medicale, sau împărtășiți
                  nelămuriri sau întrebări legate de <strong className='text-warning fw-bold'>tratamente</strong></p>
              </Card.Text>
                </Col>

<Col className="d-flex align-items-center">
  <h3 className="rounded-4 text-bg-danger text-center fw-lighter pt-3 pb-3 p-3 shadow-lg">
    <i className="bi bi-clipboard2-check"> </i>
    Suntem aici pentru a vă ajuta în orice problemă legată de sănătate
  </h3>
</Col>


              </Row>
            </Card.Body>
          </Card>
          <Card style={cardStyle} className="shadow mt-2">
            <Card.Body>
              <Row>
                <Col lg={8}>
              <Card.Text>
                <p className="fw-bold text-light bi-patch-question-fill"> Intreaba acum!</p>
              </Card.Text>
                </Col>
                <Col>
                </Col>
              </Row>
            </Card.Body>
          </Card>
              </Card.Text>

            </Card.Body>
          </Card>
        </Col>
        <Col className="d-flex align-items-center p-4">
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;

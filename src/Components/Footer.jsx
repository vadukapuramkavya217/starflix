import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Styles/Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-section">
      <Container fluid className="footer-container">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="footer-left">
            <p>© 2025 StarFlix. All Rights Reserved.</p>
          </Col>
          <Col xs={12} md={6} className="footer-right text-md-end text-center"> //xs-extra small-phones, md-medium -tabs
            <button onClick={scrollToTop} className="back-to-top-btn">
              Back to top ↑
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
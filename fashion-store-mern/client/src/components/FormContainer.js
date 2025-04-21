import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center my-5">
        <Col xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded shadow"
          >
            {children}
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer; 
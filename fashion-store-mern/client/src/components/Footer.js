import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCreditCard, FaPaypal } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  
  // Function to handle category clicks and scroll to top
  const handleCategoryClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Main Footer */}
      <footer className="footer py-5">
        <Container>
          <Row>
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <h5 className="footer-heading text-white">FASHION STORE</h5>
              <p className="mt-4 mb-4 text-light">
                Your one-stop destination for trendy and stylish clothing. We offer the latest fashion at affordable prices.
              </p>
              <div className="d-flex mb-4">
                <div className="me-3 d-flex align-items-center">
                  <FaMapMarkerAlt className="text-secondary me-2" />
                  <small>Symbiosis Institute of Technology Wathoda</small>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3 d-flex align-items-center">
                  <FaPhoneAlt className="text-secondary me-2" />
                  <small>+1 (234) 567-8900</small>
                </div>
              </div>
              <div className="d-flex mb-4">
                <div className="me-3 d-flex align-items-center">
                  <FaEnvelope className="text-secondary me-2" />
                  <small>info@fashionstore.com</small>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4 mb-lg-0">
              <h5 className="footer-heading">Categories</h5>
              <ul className="list-unstyled footer-links mt-4">
                <li className="mb-2">
                  <Link to="/category/men" onClick={handleCategoryClick}>Men's Clothing</Link>
                </li>
                <li className="mb-2">
                  <Link to="/category/women" onClick={handleCategoryClick}>Women's Clothing</Link>
                </li>
                <li className="mb-2">
                  <Link to="/category/children" onClick={handleCategoryClick}>Children's Clothing</Link>
                </li>
                <li className="mb-2">
                  <Link to="/category/sale" onClick={handleCategoryClick}>Sale</Link>
                </li>
              </ul>
            </Col>
            
            <Col lg={4} md={12} className="mb-4 mb-lg-0">
              <h5 className="footer-heading">Connect With Us</h5>
              <div className="social-icons d-flex mt-4 mb-4">
                <motion.a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick(); }} whileHover={{ y: -3 }} className="me-3 social-icon">
                  <FaFacebook size={20} />
                </motion.a>
                <motion.a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick(); }} whileHover={{ y: -3 }} className="me-3 social-icon">
                  <FaTwitter size={20} />
                </motion.a>
                <motion.a href="#" onClick={(e) => { e.preventDefault(); handleCategoryClick(); }} whileHover={{ y: -3 }} className="me-3 social-icon">
                  <FaInstagram size={20} />
                </motion.a>
              </div>
              
              <h5 className="footer-heading mt-4">Payment Methods</h5>
              <div className="payment-methods d-flex flex-wrap mt-3">
                <div className="payment-icon me-2 mb-2">
                  <FaCreditCard size={24} />
                </div>
                <div className="payment-icon me-2 mb-2">
                  <FaPaypal size={24} />
                </div>
              </div>
            </Col>
          </Row>
          
          <hr className="my-4 bg-secondary opacity-25" />
          
          <Row className="align-items-center">
            <Col className="text-center">
              <p className="mb-0 small">
                &copy; {new Date().getFullYear()} Fashion Store. All Rights Reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer; 
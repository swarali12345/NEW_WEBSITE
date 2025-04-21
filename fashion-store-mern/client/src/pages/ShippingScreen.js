import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCity, FaMailBulk, FaGlobe, FaArrowRight } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const ShippingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Normally this would come from Redux
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  // Get shipping address from localStorage if it exists
  const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};

  const [address, setAddress] = useState(shippingAddressFromStorage.address || '');
  const [city, setCity] = useState(shippingAddressFromStorage.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddressFromStorage.postalCode || '');
  const [country, setCountry] = useState(shippingAddressFromStorage.country || '');
  const [formErrors, setFormErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    }
  }, [navigate, userInfo]);

  const validateForm = () => {
    const errors = {};
    
    if (!address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    } else if (!/^\d+$/.test(postalCode.trim())) {
      errors.postalCode = 'Postal code should contain only numbers';
    }
    
    if (!country.trim()) {
      errors.country = 'Country is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save shipping address to localStorage
      const shippingAddress = { address, city, postalCode, country };
      localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
      
      // Show success message
      setShowSuccessMessage(true);
      
      // Navigate to payment screen after a short delay
      setTimeout(() => {
        navigate('/payment');
      }, 1500);
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <h1 className="text-center mb-4">Shipping Address</h1>
        
        {showSuccessMessage && (
          <Message variant="success">
            Your shipping details have been saved! Redirecting to payment...
          </Message>
        )}
        
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>
              <FaMapMarkerAlt className="me-2" />
              Address
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your street address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              isInvalid={!!formErrors.address}
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>
                  <FaCity className="me-2" />
                  City
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  isInvalid={!!formErrors.city}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.city}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label>
                  <FaMailBulk className="me-2" />
                  Postal Code
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter postal code"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  isInvalid={!!formErrors.postalCode}
                  className="shadow-sm"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.postalCode}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4" controlId="country">
            <Form.Label>
              <FaGlobe className="me-2" />
              Country
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              isInvalid={!!formErrors.country}
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.country}
            </Form.Control.Feedback>
          </Form.Group>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              variant="primary" 
              className="w-100 d-flex align-items-center justify-content-center"
              disabled={showSuccessMessage}
            >
              Continue to Payment
              <FaArrowRight className="ms-2" />
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </FormContainer>
  );
};

export default ShippingScreen; 
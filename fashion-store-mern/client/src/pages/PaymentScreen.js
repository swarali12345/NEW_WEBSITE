import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaCcStripe, FaMoneyBillWave, FaArrowRight } from 'react-icons/fa';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';

const PaymentScreen = () => {
  const navigate = useNavigate();
  
  // Get shipping address from localStorage
  const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : null;
    
  // Get payment method from localStorage if it exists
  const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'PayPal';

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStorage);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Check if user is logged in and has entered shipping address
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
      
    if (!userInfo) {
      navigate('/login?redirect=payment');
    } else if (!shippingAddress || !shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    
    // Save payment method to localStorage
    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
    
    // Show success message
    setShowSuccessMessage(true);
    
    // Navigate to place order screen after a short delay
    setTimeout(() => {
      navigate('/placeorder');
    }, 1500);
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4"
      >
        <h1 className="text-center mb-4">Payment Method</h1>
        
        {showSuccessMessage && (
          <Message variant="success">
            Payment method saved! Redirecting to place order...
          </Message>
        )}
        
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-4">
            <Form.Label as="legend" className="mb-3">
              <FaCreditCard className="me-2" />
              Select Payment Method
            </Form.Label>
            
            <div className="payment-options">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="mb-3"
              >
                <Form.Check
                  type="radio"
                  id="PayPal"
                  name="paymentMethod"
                  value="PayPal"
                  checked={paymentMethod === 'PayPal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="p-3 border rounded shadow-sm payment-option"
                  label={
                    <div className="d-flex align-items-center">
                      <FaPaypal className="me-3 text-primary" size={24} />
                      <span>PayPal or Credit Card</span>
                    </div>
                  }
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="mb-3"
              >
                <Form.Check
                  type="radio"
                  id="Stripe"
                  name="paymentMethod"
                  value="Stripe"
                  checked={paymentMethod === 'Stripe'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="p-3 border rounded shadow-sm payment-option"
                  label={
                    <div className="d-flex align-items-center">
                      <FaCcStripe className="me-3 text-info" size={24} />
                      <span>Stripe</span>
                    </div>
                  }
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="mb-4"
              >
                <Form.Check
                  type="radio"
                  id="CashOnDelivery"
                  name="paymentMethod"
                  value="CashOnDelivery"
                  checked={paymentMethod === 'CashOnDelivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="p-3 border rounded shadow-sm payment-option"
                  label={
                    <div className="d-flex align-items-center">
                      <FaMoneyBillWave className="me-3 text-success" size={24} />
                      <span>Cash on Delivery</span>
                    </div>
                  }
                />
              </motion.div>
            </div>
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
              Continue to Place Order
              <FaArrowRight className="ms-2" />
            </Button>
          </motion.div>
        </Form>
      </motion.div>
    </FormContainer>
  );
};

export default PaymentScreen; 
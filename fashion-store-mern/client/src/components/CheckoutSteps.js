import React from 'react';
import { Nav, ProgressBar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSignInAlt, FaShippingFast, FaCreditCard, FaClipboardCheck } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('userInfo') !== null;
  
  // Calculate progress percentage
  const calculateProgress = () => {
    let steps = 0;
    if (step1) steps++;
    if (step2) steps++;
    if (step3) steps++;
    if (step4) steps++;
    return (steps / 4) * 100;
  };

  return (
    <div className="checkout-steps-container">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `Rs{calculateProgress()}%` }}
        transition={{ duration: 0.5 }}
        className="progress-indicator"
      >
        <ProgressBar 
          now={calculateProgress()} 
          variant="primary" 
          className="mb-4" 
          style={{ height: '8px', borderRadius: '4px' }}
        />
      </motion.div>
      
      <Nav className='checkout-steps justify-content-center mb-4'>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Nav.Item>
            {step1 ? (
              <Nav.Link as={Link} to='/login' className="d-flex flex-column align-items-center">
                <div className="step-icon active">
                  <FaSignInAlt />
                </div>
                <span>Sign In</span>
              </Nav.Link>
            ) : (
              <Nav.Link disabled className="d-flex flex-column align-items-center">
                <div className="step-icon">
                  <FaSignInAlt />
                </div>
                <span>Sign In</span>
              </Nav.Link>
            )}
          </Nav.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Nav.Item>
            {step2 ? (
              <Nav.Link 
                as={Link} 
                to={isAuthenticated ? '/shipping' : '/login/shipping'} 
                className="d-flex flex-column align-items-center"
              >
                <div className="step-icon active">
                  <FaShippingFast />
                </div>
                <span>Shipping</span>
              </Nav.Link>
            ) : (
              <Nav.Link disabled className="d-flex flex-column align-items-center">
                <div className="step-icon">
                  <FaShippingFast />
                </div>
                <span>Shipping</span>
              </Nav.Link>
            )}
          </Nav.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Nav.Item>
            {step3 ? (
              <Nav.Link as={Link} to='/payment' className="d-flex flex-column align-items-center">
                <div className="step-icon active">
                  <FaCreditCard />
                </div>
                <span>Payment</span>
              </Nav.Link>
            ) : (
              <Nav.Link disabled className="d-flex flex-column align-items-center">
                <div className="step-icon">
                  <FaCreditCard />
                </div>
                <span>Payment</span>
              </Nav.Link>
            )}
          </Nav.Item>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Nav.Item>
            {step4 ? (
              <Nav.Link as={Link} to='/placeorder' className="d-flex flex-column align-items-center">
                <div className="step-icon active">
                  <FaClipboardCheck />
                </div>
                <span>Place Order</span>
              </Nav.Link>
            ) : (
              <Nav.Link disabled className="d-flex flex-column align-items-center">
                <div className="step-icon">
                  <FaClipboardCheck />
                </div>
                <span>Place Order</span>
              </Nav.Link>
            )}
          </Nav.Item>
        </motion.div>
      </Nav>
    </div>
  );
};

export default CheckoutSteps; 
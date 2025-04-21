import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import ServerStatus from '../components/ServerStatus';
import { login, clearError } from '../redux/slices/userSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { loading, error, userInfo } = useSelector((state) => state.user);
  
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    if (userInfo) {
      // Special handling for shipping redirect
      if (redirect === 'shipping') {
        navigate('/shipping');
      } else {
        navigate(redirect);
      }
    }
  }, [navigate, userInfo, redirect, dispatch]);

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Try to login with API
      dispatch(login({ email, password }));
    }
  };
  
  // Demo login function for when server is offline
  const demoLoginHandler = () => {
    // Create a demo user 
    const demoUser = {
      _id: 'demo123',
      name: 'Demo User',
      email: email || 'demo@example.com',
      isAdmin: false,
      token: 'demo-token-123',
    };
    
    // Store in localStorage to simulate login
    localStorage.setItem('userInfo', JSON.stringify(demoUser));
    
    // Redirect as if login succeeded
    if (redirect === 'shipping') {
      navigate('/shipping');
    } else {
      navigate(redirect);
    }
  };

  return (
    <FormContainer>
      <div className="p-4">
        <h1 className='text-center mb-4'>
          <FaSignInAlt className="me-2" />
          Sign In
        </h1>
        
        <ServerStatus />
        
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>
              <FaEnvelope className="me-2" />
              Email Address
            </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!formErrors.email}
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-4' controlId='password'>
            <Form.Label>
              <FaLock className="me-2" />
              Password
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!formErrors.password}
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type='submit' 
              variant='primary' 
              className='w-100 mb-3 py-2 shadow'
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </motion.div>
          
          {error && error.includes('connect to server') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mt-2"
            >
              <Button 
                type='button'
                variant='outline-secondary' 
                className='w-100 mb-3 py-2'
                onClick={demoLoginHandler}
              >
                Continue in Demo Mode
              </Button>
            </motion.div>
          )}
        </Form>

        <Row className='py-3'>
          <Col className='text-center'>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-primary fw-bold">
              Create an Account
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default LoginScreen; 
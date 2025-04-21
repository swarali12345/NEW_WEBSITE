import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register, clearError, resetSuccess } from '../redux/slices/userSlice';
import ServerStatus from '../components/ServerStatus';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { loading, error, userInfo, success } = useSelector((state) => state.user);
  
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    if (userInfo) {
      navigate(redirect);
    }
    
    // If registration is successful, redirect after a short delay
    if (success) {
      const timer = setTimeout(() => {
        navigate(redirect);
        dispatch(resetSuccess());
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [navigate, userInfo, redirect, dispatch, success]);

  const validateForm = () => {
    const errors = {};
    
    if (!name) {
      errors.name = 'Name is required';
    }
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Try to register with API
      dispatch(register({ name, email, password }));
    }
  };
  
  // Demo registration function for when server is offline
  const demoRegisterHandler = () => {
    // Create a demo user 
    const demoUser = {
      _id: 'demo123',
      name: name || 'Demo User',
      email: email || 'demo@example.com',
      isAdmin: false,
      token: 'demo-token-123',
    };
    
    // Store in localStorage to simulate registration
    localStorage.setItem('userInfo', JSON.stringify(demoUser));
    
    // Set success state
    // dispatch(resetSuccess()); // Reset existing success state
    
    // Show success message
    setFormErrors({});
    
    // Redirect after a short delay
    setTimeout(() => {
      navigate(redirect);
    }, 1500);
  };

  return (
    <FormContainer>
      <div className="p-4">
        <h1 className='text-center mb-4'>
          <FaUserPlus className="me-2" />
          Create Account
        </h1>
        
        <ServerStatus />
        
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Registration successful! Redirecting...</Message>}
        {loading && <Loader />}
        
        <Form onSubmit={submitHandler}>
          <Form.Group className='mb-3' controlId='name'>
            <Form.Label>
              <FaUser className="me-2" />
              Full Name
            </Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={!!formErrors.name}
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

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

          <Form.Group className='mb-3' controlId='password'>
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

          <Form.Group className='mb-4' controlId='confirmPassword'>
            <Form.Label>
              <FaLock className="me-2" />
              Confirm Password
            </Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!formErrors.confirmPassword}
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
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
              {loading ? 'Creating Account...' : 'Register'}
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
                onClick={demoRegisterHandler}
              >
                Continue in Demo Mode
              </Button>
            </motion.div>
          )}
        </Form>

        <Row className='py-3'>
          <Col className='text-center'>
            Already have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-primary fw-bold">
              Sign In
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen; 
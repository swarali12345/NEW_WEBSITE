import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import Loader from '../components/Loader';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  const navigate = useNavigate();

  // Simulating a user check (this would normally be done with Redux)
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      
      // Fetch mock orders after a delay
      setTimeout(() => {
        const mockOrders = [
          {
            id: 1,
            createdAt: '2023-10-15T12:00:00Z',
            totalPrice: 154.98,
            isPaid: true,
            paidAt: '2023-10-15T12:30:00Z',
            isDelivered: false,
            deliveredAt: null
          },
          {
            id: 2,
            createdAt: '2023-11-02T15:20:00Z',
            totalPrice: 89.97,
            isPaid: true,
            paidAt: '2023-11-02T15:25:00Z',
            isDelivered: true,
            deliveredAt: '2023-11-04T10:00:00Z'
          }
        ];
        
        setOrders(mockOrders);
        setLoadingOrders(false);
      }, 1000);
    }
  }, [navigate, userInfo]);

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Row className="mt-4">
      <Col md={3}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>User Profile</h2>
          
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          
          <div className="card p-3 shadow-sm mt-3">
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                disabled
              />
            </Form.Group>

            <Form.Group className='mb-4' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                disabled
              />
            </Form.Group>
          </div>
        </motion.div>
      </Col>
      
      <Col md={9}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>My Orders</h2>
          
          {loadingOrders ? (
            <Loader />
          ) : orders.length === 0 ? (
            <Message>You have no orders</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm mt-3'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{formatDate(order.createdAt)}</td>
                    <td>${order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? (
                        formatDate(order.paidAt)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        formatDate(order.deliveredAt)
                      ) : (
                        <FaTimes style={{ color: 'red' }} />
                      )}
                    </td>
                    <td>
                      <Button
                        as={Link}
                        to={`/order/${order.id}`}
                        variant='light'
                        size='sm'
                      >
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </motion.div>
      </Col>
    </Row>
  );
};

export default ProfileScreen; 
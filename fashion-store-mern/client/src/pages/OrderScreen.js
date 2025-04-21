import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaCheck, FaTruck, FaMapMarkerAlt, FaCreditCard, FaBoxOpen } from 'react-icons/fa';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/formatPrice';

const OrderScreen = () => {
  const { id } = useParams();
  
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Simulate API call to fetch order details
    const fetchOrder = () => {
      setLoading(true);
      try {
        // For demo purposes, retrieve from localStorage
        const latestOrder = localStorage.getItem('latestOrder')
          ? JSON.parse(localStorage.getItem('latestOrder'))
          : null;
          
        if (latestOrder && latestOrder._id.toString() === id) {
          setOrder(latestOrder);
        } else {
          // Mock order data
          const mockOrder = {
            _id: id,
            orderItems: [
              {
                id: '1',
                name: 'Sample Product',
                image: '/images/sample.jpg',
                price: 1299,
                qty: 2,
              },
            ],
            shippingAddress: {
              address: '123 Main St',
              city: 'Boston',
              postalCode: '02108',
              country: 'USA',
            },
            paymentMethod: 'PayPal',
            itemsPrice: '2598.00',
            shippingPrice: '0.00', // Free shipping as over 2000
            taxPrice: '389.70',
            totalPrice: '2987.70',
            isPaid: Math.random() > 0.5,
            paidAt: new Date().toISOString(),
            isDelivered: false,
            createdAt: new Date().toISOString(),
          };
          
          setOrder(mockOrder);
        }
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchOrder();
  }, [id]);
  
  const deliverOrderHandler = () => {
    // Simulate order delivery
    setOrder(prevOrder => ({
      ...prevOrder,
      isDelivered: true,
      deliveredAt: new Date().toISOString()
    }));
  };
  
  return loading ? (
    <div className="d-flex justify-content-center my-5">
      <Loader size="lg" />
    </div>
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="justify-content-center">
        <Col md={10}>
          {order.isPaid && !order.isDelivered && (
            <Message variant="success" className="mb-4">
              <div className="text-center">
                <FaCheck size={30} className="mb-2" />
                <h3>Thank you for your order!</h3>
                <p className="mb-0">Your order has been confirmed and will be shipped soon.</p>
              </div>
            </Message>
          )}
          
          <h2 className="mb-4">Order #{order._id}</h2>
          
          <Row>
            <Col md={8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ListGroup variant="flush" className="mb-4 shadow-sm rounded">
                  <ListGroup.Item className="bg-light">
                    <h3 className="mb-3 d-flex align-items-center">
                      <FaMapMarkerAlt className="me-2 text-primary" />
                      Shipping
                    </h3>
                    <div className="ps-4 mb-2">
                      <p className="mb-2">
                        <strong>Name: </strong> {localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).name : 'John Doe'}
                      </p>
                      <p className="mb-2">
                        <strong>Email: </strong> {localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).email : 'john@example.com'}
                      </p>
                      <p className="mb-2">
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                      </p>
                      
                      {order.isDelivered ? (
                        <Message variant="success">
                          Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                        </Message>
                      ) : (
                        <Message variant="info">
                          <div className="d-flex align-items-center">
                            <FaTruck className="me-2" /> Not yet delivered
                          </div>
                        </Message>
                      )}
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="bg-light">
                    <h3 className="mb-3 d-flex align-items-center">
                      <FaCreditCard className="me-2 text-primary" />
                      Payment Method
                    </h3>
                    <div className="ps-4">
                      <p className="mb-2">
                        <strong>Method: </strong>
                        {order.paymentMethod}
                      </p>
                      
                      {order.isPaid ? (
                        <Message variant="success">
                          Paid on {new Date(order.paidAt).toLocaleDateString()}
                        </Message>
                      ) : (
                        <Message variant="warning">
                          Not paid
                        </Message>
                      )}
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="bg-light">
                    <h3 className="mb-3 d-flex align-items-center">
                      <FaBoxOpen className="me-2 text-primary" />
                      Order Items
                    </h3>
                    
                    {order.orderItems.length === 0 ? (
                      <Message>Order is empty</Message>
                    ) : (
                      <ListGroup variant="flush">
                        {order.orderItems.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <ListGroup.Item className="border-0 py-3 bg-white mb-2 rounded shadow-sm">
                              <Row className="align-items-center">
                                <Col md={2}>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                    className="border"
                                  />
                                </Col>
                                <Col>
                                  <Link 
                                    to={`/product/${item.id}`}
                                    className="text-decoration-none fw-bold"
                                  >
                                    {item.name}
                                  </Link>
                                </Col>
                                <Col md={4} className="text-end">
                                  <span className="d-block">{item.qty} x Rs {formatPrice(item.price)}</span>
                                  <span className="text-primary fw-bold">
                                    Rs {formatPrice((item.qty * item.price).toFixed(2))}
                                  </span>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          </motion.div>
                        ))}
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </motion.div>
            </Col>
            
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-sm border-0">
                  <Card.Header className="bg-primary text-white">
                    <h3 className="mb-0">Order Summary</h3>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row className="py-2">
                        <Col>Items:</Col>
                        <Col className="text-end fw-bold">Rs {formatPrice(order.itemsPrice)}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col>Shipping:</Col>
                        <Col className="text-end fw-bold">Rs {formatPrice(order.shippingPrice)}</Col>
                      </Row>
                      <Row className="py-2">
                        <Col>Tax:</Col>
                        <Col className="text-end fw-bold">Rs {formatPrice(order.taxPrice)}</Col>
                      </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item className="bg-light">
                      <Row className="py-2">
                        <Col className="fw-bold fs-5">Total:</Col>
                        <Col className="text-end fw-bold fs-5 text-primary">
                          Rs {formatPrice(order.totalPrice)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    {!order.isPaid && (
                      <ListGroup.Item>
                        <Button
                          variant="success"
                          className="w-100 py-3 d-flex align-items-center justify-content-center"
                          onClick={() => {
                            setOrder({ ...order, isPaid: true, paidAt: new Date().toISOString() });
                          }}
                        >
                          <FaCheck className="me-2" /> Mark as Paid
                        </Button>
                      </ListGroup.Item>
                    )}
                    
                    {order.isPaid && !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          variant="primary"
                          className="w-100 py-3 d-flex align-items-center justify-content-center"
                          onClick={deliverOrderHandler}
                        >
                          <FaTruck className="me-2" /> Mark as Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card>
                
                <div className="mt-4 text-center">
                  <Link to="/profile" className="btn btn-outline-primary mt-3">
                    View All Orders
                  </Link>
                  <Link to="/" className="btn btn-outline-secondary mt-3 ms-2">
                    Continue Shopping
                  </Link>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Col>
      </Row>
    </motion.div>
  );
};

export default OrderScreen; 
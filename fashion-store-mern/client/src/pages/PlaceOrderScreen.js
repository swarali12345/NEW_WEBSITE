import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCreditCard, FaShoppingBag, FaCheck, FaBoxOpen } from 'react-icons/fa';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import { formatPrice } from '../utils/formatPrice';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  
  // State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Get data from localStorage
  const cartItems = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];
  
  const shippingAddress = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {};
  
  const paymentMethod = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : 'PayPal';

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
  const shippingPrice = (itemsPrice > 2000 ? 0 : 100).toFixed(2);
  const taxPrice = Number(0.15 * itemsPrice).toFixed(2);
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  // Check if the user has completed previous checkout steps
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null;
      
    if (!userInfo) {
      navigate('/login?redirect=placeorder');
    } else if (!shippingAddress.address) {
      navigate('/shipping');
    } else if (!paymentMethod) {
      navigate('/payment');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [navigate, shippingAddress, paymentMethod, cartItems]);

  const placeOrderHandler = () => {
    setLoading(true);
    setError('');
    
    // Simulate API call with timeout
    setTimeout(() => {
      try {
        // Create order object
        const order = {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        };
        
        // Mock successful order creation
        const createdOrder = {
          _id: Math.floor(Math.random() * 1000000),
          ...order,
          isPaid: false,
          isDelivered: false,
          createdAt: new Date().toISOString(),
        };
        
        // Save order to localStorage for demo purposes
        localStorage.setItem('latestOrder', JSON.stringify(createdOrder));
        
        // Clear cart items
        localStorage.setItem('cartItems', JSON.stringify([]));
        
        setLoading(false);
        
        // Navigate to order screen
        navigate(`/order/${createdOrder._id}`);
      } catch (error) {
        setError('Failed to place order. Please try again.');
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <h1 className="text-center mb-4">Place Order</h1>
      </motion.div>
      
      <Row>
        <Col md={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ListGroup variant='flush' className="mb-4 shadow-sm rounded">
              <ListGroup.Item className="bg-light">
                <h3 className="mb-3 d-flex align-items-center">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  Shipping Details
                </h3>
                <div className="ps-4 mb-2">
                  <strong className="d-block mb-2">Address:</strong>
                  <p className="ms-3 mb-0">
                    {shippingAddress.address}, <br />
                    {shippingAddress.city}, {shippingAddress.postalCode} <br />
                    {shippingAddress.country}
                  </p>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="bg-light">
                <h3 className="mb-3 d-flex align-items-center">
                  <FaCreditCard className="me-2 text-primary" />
                  Payment Method
                </h3>
                <div className="ps-4">
                  <strong className="d-block mb-2">Method:</strong>
                  <p className="ms-3 mb-0">{paymentMethod}</p>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="bg-light">
                <h3 className="mb-3 d-flex align-items-center">
                  <FaShoppingBag className="me-2 text-primary" />
                  Order Items
                </h3>
                {cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {cartItems.map((item, index) => (
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
                              <Link to={`/product/${item.id}`} className="text-decoration-none fw-bold">
                                {item.name}
                              </Link>
                            </Col>
                            <Col md={4} className="text-end">
                              <span className="d-block">{item.qty} x Rs {formatPrice(item.price)}</span>
                              <span className="text-primary fw-bold">Rs {formatPrice((item.qty * item.price).toFixed(2))}</span>
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
              <ListGroup variant='flush'>                
                <ListGroup.Item>
                  <Row className="py-2">
                    <Col>Items:</Col>
                    <Col className="text-end fw-bold">Rs {formatPrice(itemsPrice)}</Col>
                  </Row>
                  <Row className="py-2">
                    <Col>Shipping:</Col>
                    <Col className="text-end fw-bold">Rs {formatPrice(shippingPrice)}</Col>
                  </Row>
                  <Row className="py-2">
                    <Col>Tax:</Col>
                    <Col className="text-end fw-bold">Rs {formatPrice(taxPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                
                <ListGroup.Item className="bg-light">
                  <Row className="py-2">
                    <Col className="fw-bold fs-5">Total:</Col>
                    <Col className="text-end fw-bold fs-5 text-primary">Rs {formatPrice(totalPrice)}</Col>
                  </Row>
                </ListGroup.Item>
                
                {error && (
                  <ListGroup.Item>
                    <Message variant='danger'>{error}</Message>
                  </ListGroup.Item>
                )}
                
                <ListGroup.Item>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type='button'
                      className='btn-block w-100 d-flex align-items-center justify-content-center py-3'
                      disabled={cartItems.length === 0 || loading}
                      onClick={placeOrderHandler}
                    >
                      {loading ? <Loader /> : (
                        <>
                          <FaCheck className="me-2" /> Complete Order
                        </>
                      )}
                    </Button>
                  </motion.div>
                </ListGroup.Item>
              </ListGroup>
            </Card>

            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-4 text-center"
              >
                <FaBoxOpen className="text-primary mb-2" size={24} />
                <p className="text-muted mb-0 small">
                  Your order will be processed immediately after confirmation
                </p>
              </motion.div>
            )}
          </motion.div>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen; 
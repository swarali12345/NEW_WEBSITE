import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { motion } from 'framer-motion';
import dummyProducts from '../data/dummyProducts';
import { getCartItems, removeItemFromCart, updateCartItemQuantity, addItemToCart } from '../utils/cartHelpers';
import { formatPrice } from '../utils/formatPrice';

const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  
  // This would normally be stored in Redux
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  // This simulates getting the product and adding it to cart
  useEffect(() => {
    if (id) {
      const addToCart = async () => {
        // Find the product from our dummy data
        const productId = parseInt(id);
        const product = dummyProducts.find(p => p.id === productId);
        
        if (product) {
          const updatedCart = addItemToCart(product, qty);
          setCartItems(updatedCart);
        }
      };
      
      addToCart();
    }
  }, [id, qty]);

  const removeFromCartHandler = (id) => {
    const updatedCart = removeItemFromCart(id);
    setCartItems(updatedCart);
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  const updateQuantityHandler = (id, quantity) => {
    const updatedCart = updateCartItemQuantity(id, quantity);
    setCartItems(updatedCart);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Row>
        <Col md={8}>
          <h1 className="mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map(item => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="cart-item"
                >
                  <ListGroup.Item className="py-3">
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.id}`} className="text-decoration-none">
                          {item.name}
                        </Link>
                      </Col>
                      <Col md={2}>Rs {formatPrice(item.price)}</Col>
                      <Col md={2}>
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => updateQuantityHandler(item.id, e.target.value)}
                        >
                          {[...Array(item.countInStock).keys()]
                            .slice(0, 10) // Limit to 10 options
                            .map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                        </Form.Control>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </motion.div>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                    items
                  </h2>
                  Rs {formatPrice(
                    cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block w-100"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default CartScreen; 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Container, Alert } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaCheck, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Message from '../components/Message';
import { formatPrice } from '../utils/formatPrice';

const WishlistScreen = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);
  
  // Get wishlist items from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
  }, []);

  // Auto-hide alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Remove item from wishlist
  const removeFromWishlistHandler = (id) => {
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
  };

  // Add item to cart
  const addToCartHandler = (product) => {
    // Get current cart items
    const cartItems = localStorage.getItem('cartItems') 
      ? JSON.parse(localStorage.getItem('cartItems')) 
      : [];
    
    // Check if item already exists in cart
    const existItem = cartItems.find(x => x.id === product.id);
    
    let updatedCart;
    if (existItem) {
      // Update quantity if item exists
      updatedCart = cartItems.map(x => 
        x.id === product.id ? { ...x, qty: x.qty + 1 } : x
      );
    } else {
      // Add new item
      updatedCart = [...cartItems, { ...product, qty: 1 }];
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    // Show notification
    setAddedProduct(product);
    setShowAlert(true);
    
    // Scroll to top to ensure alert is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Trigger event for cart update
    const event = new Event('cartUpdated');
    window.dispatchEvent(event);
  };

  const goToCart = () => {
    setShowAlert(false);
    navigate('/cart');
  };

  return (
    <>
      {/* Large Top Alert */}
      {showAlert && addedProduct && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="sticky-top"
        >
          <Alert 
            variant="success" 
            className="m-0 border-0 rounded-0 shadow-lg"
            style={{ zIndex: 1090 }}
          >
            <div className="container py-3">
              <div className="d-flex flex-column flex-md-row align-items-center">
                <div className="d-flex align-items-center mb-3 mb-md-0">
                  <div className="me-3">
                    <img 
                      src={addedProduct.image} 
                      alt={addedProduct.name} 
                      className="border border-light"
                      style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                  </div>
                  <div>
                    <h4 className="mb-0 d-flex align-items-center">
                      <FaCheck className="me-2" /> Item Added to Cart!
                    </h4>
                    <p className="mb-0 fw-bold">{addedProduct.name} - Rs {formatPrice(addedProduct.price)}</p>
                  </div>
                </div>
                <div className="ms-md-auto d-flex">
                  <Button 
                    variant="light" 
                    className="me-2 fw-bold"
                    size="lg"
                    onClick={() => setShowAlert(false)}
                  >
                    Continue Shopping
                  </Button>
                  <Button 
                    variant="outline-light" 
                    size="lg"
                    className="fw-bold"
                    onClick={goToCart}
                  >
                    View Cart <FaArrowRight className="ms-2" />
                  </Button>
                </div>
              </div>
            </div>
          </Alert>
        </motion.div>
      )}
      
      <Container className="mt-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="my-4">My Wishlist</h1>
          
          {wishlistItems.length === 0 ? (
            <Message>
              Your wishlist is empty. <Link to="/">Continue Shopping</Link>
            </Message>
          ) : (
            <Row>
              {wishlistItems.map((item, index) => (
                <Col key={item.id} sm={12} md={6} lg={4} xl={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="mb-4"
                  >
                    <Card className="h-100 product-card">
                      <Link to={`/product/${item.id}`}>
                        <Card.Img 
                          src={item.image} 
                          variant="top" 
                          className="product-image"
                        />
                      </Link>
                      
                      <Card.Body className="d-flex flex-column">
                        <Link to={`/product/${item.id}`} className="text-decoration-none">
                          <Card.Title as="h5">{item.name}</Card.Title>
                        </Link>
                        
                        <Card.Text as="h6" className="mb-2">
                          Rs {formatPrice(item.price)}
                        </Card.Text>
                        
                        <div className="mt-auto d-flex justify-content-between">
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => removeFromWishlistHandler(item.id)}
                          >
                            <FaTrash /> Remove
                          </Button>
                          
                          <Button 
                            variant="primary" 
                            size="sm"
                            onClick={() => addToCartHandler(item)}
                          >
                            <FaShoppingCart className="me-1" /> Add to Cart
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          )}
        </motion.div>
      </Container>
    </>
  );
};

export default WishlistScreen; 
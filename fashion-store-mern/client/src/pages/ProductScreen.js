import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Toast } from 'react-bootstrap';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import axios from 'axios';
import { motion } from 'framer-motion';
import dummyProducts from '../data/dummyProducts';
import { addItemToCart } from '../utils/cartHelpers';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Always use dummy data for development
    const productId = parseInt(id);
    const dummyProduct = dummyProducts.find(p => p.id === productId);
    
    if (dummyProduct) {
      setProduct(dummyProduct);
    } else {
      setError('Product not found');
    }
    setLoading(false);
    
    // Keep API call for reference but don't use its data
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/Rs{id}`);
        console.log('API data received but using dummy data instead:', data);
      } catch (error) {
        console.log('API fetch failed, using dummy data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    // Use the new helper function to add the item to cart
    addItemToCart(product, qty);
    
    // Show toast notification
    setShowToast(true);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : product ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Cart Added Toast */}
          <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
            <Toast 
              onClose={() => setShowToast(false)} 
              show={showToast} 
              delay={3000} 
              autohide
              bg="success"
              className="text-white"
            >
              <Toast.Header>
                <strong className="me-auto">Added to Cart</strong>
              </Toast.Header>
              <Toast.Body>
                {qty} {qty > 1 ? 'items' : 'item'} added to your cart
                <div className="mt-2">
                  <Button 
                    size="sm" 
                    variant="light" 
                    className="w-100"
                    onClick={goToCart}
                  >
                    Go to Cart
                  </Button>
                </div>
              </Toast.Body>
            </Toast>
          </div>
          
          <Row>
            <Col md={6}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Image src={product.image} alt={product.name} fluid className="product-image" />
              </motion.div>
            </Col>
            
            <Col md={3}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating value={product.rating} text={`Rs{product.numReviews} reviews`} />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: Rs{product.price}</ListGroup.Item>
                  <ListGroup.Item>Description: {product.description}</ListGroup.Item>
                </ListGroup>
              </motion.div>
            </Col>
            
            <Col md={3}>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>Rs{product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={qty}
                              onChange={(e) => setQty(Number(e.target.value))}
                            >
                              {[...Array(product.countInStock).keys()]
                                .slice(0, 10) // Limit to 10 options
                                .map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    
                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block w-100"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </motion.div>
            </Col>
          </Row>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="my-5"
          >
            <h2>Customer Reviews</h2>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h4>Yash Sharma</h4>
                <Rating value={5} />
                <p>Reviewed on May 15, 2023</p>
                <p>Great product! The quality is excellent and it fits perfectly. Highly recommend!</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Shubham Kumar</h4>
                <Rating value={4} />
                <p>Reviewed on April 22, 2023</p>
                <p>Very happy with my purchase. The material is high quality and comfortable to wear.</p>
              </ListGroup.Item>
            </ListGroup>
          </motion.div>
        </motion.div>
      ) : (
        <Message variant="danger">Product not found</Message>
      )}
    </>
  );
};

export default ProductScreen; 
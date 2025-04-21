import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Badge, Button, Overlay, Tooltip, Toast, Modal } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaSearch, FaShoppingCart, FaCheck, FaArrowRight } from 'react-icons/fa';
import Rating from './Rating';
import { motion } from 'framer-motion';
import { addItemToCart } from '../utils/cartHelpers';
import { formatPrice } from '../utils/formatPrice';

const Product = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const target = React.useRef(null);

  // Check if product is already in wishlist on component mount
  useEffect(() => {
    const wishlistItems = localStorage.getItem('wishlistItems')
      ? JSON.parse(localStorage.getItem('wishlistItems'))
      : [];
    
    if (wishlistItems.some(item => item.id === product.id)) {
      setIsWishlisted(true);
    }
  }, [product.id]);

  // Auto close popup after 4 seconds
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    const newWishlistState = !isWishlisted;
    setIsWishlisted(newWishlistState);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1500);
    
    // Get current wishlist from localStorage
    const wishlistItems = localStorage.getItem('wishlistItems')
      ? JSON.parse(localStorage.getItem('wishlistItems'))
      : [];
    
    if (newWishlistState) {
      // Add to wishlist if not already included
      if (!wishlistItems.some(item => item.id === product.id)) {
        const updatedWishlist = [...wishlistItems, product];
        localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
      }
    } else {
      // Remove from wishlist
      const updatedWishlist = wishlistItems.filter(item => item.id !== product.id);
      localStorage.setItem('wishlistItems', JSON.stringify(updatedWishlist));
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    
    // Use the new helper function to add the item to cart
    addItemToCart(product, 1);
    
    // Show modal notification
    setShowModal(true);
  };

  // Function to go directly to cart
  const goToCart = () => {
    setShowModal(false);
    navigate('/cart');
  };

  return (
    <>
      {/* Cart Added Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="cart-notification-modal"
      >
        <Modal.Body className="p-4 text-center">
          <div className="mb-3">
            <div className="d-flex justify-content-center mb-3">
              <div 
                style={{ 
                  backgroundColor: '#28a745', 
                  borderRadius: '50%', 
                  width: '60px', 
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaCheck size={30} color="white" />
              </div>
            </div>
            <h3 className="fw-bold">Added to Cart!</h3>
          </div>
          
          <div className="border-top border-bottom py-3 my-3">
            <div className="row align-items-center">
              <div className="col-4 text-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '100px', 
                    objectFit: 'contain' 
                  }} 
                />
              </div>
              <div className="col-8 text-start">
                <h5>{product.name}</h5>
                <p className="mb-0 fw-bold">Rs {formatPrice(product.price)}</p>
              </div>
            </div>
          </div>
          
          <div className="d-grid gap-2 mt-3">
            <Button variant="success" size="lg" onClick={goToCart}>
              View Cart <FaArrowRight className="ms-2" />
            </Button>
            <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
              Continue Shopping
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          y: -10,
          transition: { duration: 0.3 }
        }}
        className="product-card-container"
      >
        <Card className="my-3 rounded border-0 h-100">
          <div className="product-image-container">
            <Link to={`/product/${product.id}`}>
              <Card.Img src={product.image} variant="top" className="product-image" />
            </Link>
            
            {/* Wishlist Button */}
            <button 
              className={`wishlist-icon ${isWishlisted ? 'active' : ''}`}
              onClick={toggleWishlist}
              ref={target}
            >
              {isWishlisted ? <FaHeart /> : <FaRegHeart />}
            </button>
            <Overlay target={target.current} show={showTooltip} placement="top">
              {(props) => (
                <Tooltip id="wishlist-tooltip" {...props}>
                  {isWishlisted ? 'Added to wishlist!' : 'Removed from wishlist!'}
                </Tooltip>
              )}
            </Overlay>
            
            
            
            {/* Sale Badge */}
            {product.onSale && (
              <Badge bg="danger" className="position-absolute top-0 start-0 m-2 badge-sale">
                SALE {product.discountPercentage}%
              </Badge>
            )}
            
            {/* New Badge */}
            {product.isNew && (
              <Badge bg="primary" className="position-absolute top-0 start-0 m-2 badge-new">
                NEW
              </Badge>
            )}
            
            {/* Quick Actions */}
            <div className="product-actions">
              <Link to={`/product/${product.id}`} className="action-btn">
                <FaSearch />
                <span className="action-text">Quick View</span>
              </Link>
              <button className="action-btn" onClick={addToCart}>
                <FaShoppingCart />
                <span className="action-text">Add to Cart</span>
              </button>
            </div>
          </div>

          <Card.Body className="d-flex flex-column">
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              <Card.Title as="h5" className="product-title mb-1">
                {product.name}
              </Card.Title>
            </Link>
            
            <Card.Text as="div" className="mb-2">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Text>
            
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <Card.Text as="h5" className="mb-0 d-flex align-items-center">
                {product.onSale ? (
                  <>
                    <span className="text-muted text-decoration-line-through me-2">Rs {formatPrice(product.originalPrice)}</span>
                    <span className="text-danger">Rs {formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span>Rs {formatPrice(product.price)}</span>
                )}
              </Card.Text>
              
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="add-to-cart-btn"
                onClick={addToCart}
              >
                <FaShoppingCart className="me-1" />
                Add
              </Button>
            </div>
          </Card.Body>
        </Card>
      </motion.div>
    </>
  );
};

export default Product; 
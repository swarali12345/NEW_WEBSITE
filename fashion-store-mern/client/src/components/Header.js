import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, Button, InputGroup, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaSearch, FaHeart, FaTags } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { logout } from '../redux/slices/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get user info from Redux store
  const { userInfo } = useSelector((state) => state.user);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItemCount, setCartItemCount] = useState(0);

  // Function to update cart item count from localStorage
  const updateCartCount = () => {
    const cartItems = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [];
    
    setCartItemCount(cartItems.reduce((acc, item) => acc + item.qty, 0));
  };

  // Get cart items from localStorage to display count
  useEffect(() => {
    // Initial cart count
    updateCartCount();
    
    // Add event listener for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Check if search term matches predefined categories (case-insensitive)
      const term = searchTerm.trim().toLowerCase();
      
      if (term === 'women' || term === 'woman') {
        navigate('/category/women');
      } else if (term === 'men' || term === 'man') {
        navigate('/category/men');
      } else if (term === 'children' || term === 'kids' || term === 'child') {
        navigate('/category/children');
      } else if (term === 'sale' || term === 'discount' || term === 'offers') {
        navigate('/category/sale');
      } else {
        // For other search terms, use the default search logic
        navigate(`/category/${searchTerm}`);
      }
      
      // Clear the search term after navigation
      setSearchTerm('');
    } else {
      navigate('/');
    }
  };

  // Function to handle navigation and scroll to top
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <header>
      {/* Main navigation bar with brand, search and account options */}
      <Navbar expand="lg" variant="dark" collapseOnSelect className="py-3">
        <Container>
          <Navbar.Brand 
            as="div" 
            onClick={() => handleNavigation('/')}
            style={{ cursor: 'pointer' }}
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="d-flex align-items-center"
            >
              <span className="fw-bold fs-3">FASHION STORE</span>
            </motion.div>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* Search Form */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto my-2 my-lg-0"
              style={{ maxWidth: '500px', width: '100%' }}
            >
              <Form onSubmit={submitHandler} className="d-flex">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  <Button variant="outline-light" type="submit" className="search-button">
                    <FaSearch />
                  </Button>
                </InputGroup>
              </Form>
            </motion.div>
            
            {/* User Interactions Area */}
            <Nav className="ms-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Nav.Link as={Link} to="/category/sale" className="me-3 position-relative">
                  <FaTags /> <span className="d-none d-md-inline">Sale</span>
                  <Badge 
                    pill 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                    style={{ fontSize: '0.6rem' }}
                  >
                    New
                  </Badge>
                </Nav.Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Nav.Link as={Link} to="/wishlist" className="me-3">
                  <FaHeart /> <span className="d-none d-md-inline">Wishlist</span>
                </Nav.Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Nav.Link as={Link} to="/cart" className="me-3 position-relative">
                  <FaShoppingCart /> 
                  <span className="d-none d-md-inline">Cart</span>
                  {cartItemCount > 0 && (
                    <Badge 
                      pill 
                      bg="warning" 
                      text="dark"
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                      style={{ fontSize: '0.6rem' }}
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Nav.Link>
              </motion.div>
              
              {userInfo ? (
                <NavDropdown 
                  title={<><FaUser /> <span className="d-none d-md-inline">{userInfo.name}</span></>}
                  id="username"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile">My Profile</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/wishlist">My Wishlist</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Nav.Link as={Link} to="/login">
                    <FaUser /> <span className="d-none d-md-inline">Sign In</span>
                  </Nav.Link>
                </motion.div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Simplified Category Navigation Bar */}
      <Nav className="bg-light py-2 shadow-sm category-nav">
        <Container>
          <Nav className="mx-auto d-flex flex-row justify-content-center">
            <Nav.Link onClick={() => handleNavigation('/category/women')} className="px-3 fw-semibold">Women</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/category/men')} className="px-3 fw-semibold">Men</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/category/children')} className="px-3 fw-semibold">Children</Nav.Link>
            <Nav.Link onClick={() => handleNavigation('/category/sale')} className="px-3 text-danger fw-semibold">Sale</Nav.Link>
          </Nav>
        </Container>
      </Nav>
    </header>
  );
};

export default Header; 
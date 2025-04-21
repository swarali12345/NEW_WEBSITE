import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SalesBanner from '../components/SalesBanner';
import axios from 'axios';
import { motion } from 'framer-motion';
import dummyProducts from '../data/dummyProducts';

const HomeScreen = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always use dummy data for development
    setProducts(dummyProducts);
    setLoading(false);
    
    // Keep API call for reference but don't use its data
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        console.log('API data received but using dummy data instead:', data);
      } catch (error) {
        console.log('API fetch failed, using dummy data:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category if a category parameter is provided
  const filteredProducts = category === 'sale'
    ? products.filter(product => product.onSale)
    : category
      ? products.filter(product => product.category === category)
      : products;

  // Get sale products
  const saleProducts = products.filter(product => product.onSale);

  // Prepare the heading text based on category
  const headingText = category === 'sale' 
    ? 'Sale Items'
    : category 
      ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` 
      : 'Latest Products';

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center my-5">
          <h1 className="display-4 fw-bold">{headingText}</h1>
          <motion.div
            className="mx-auto"
            style={{ width: '100px', height: '4px', background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))' }}
            initial={{ width: 0 }}
            animate={{ width: '100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </motion.div>

      {!category && <SalesBanner saleProducts={saleProducts} />}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : filteredProducts.length === 0 ? (
        <Message>No products found in this category</Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      <motion.div
        className="text-center my-5 p-5 rounded"
        style={{ 
          background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.1), rgba(37, 117, 252, 0.1))',
          backdropFilter: 'blur(5px)'
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="mb-4">Subscribe for Exclusive Offers</h2>
        <p className="lead mb-4">Join our community to receive special discounts and early access to new collections.</p>
        <div className="input-group mb-3 mx-auto" style={{ maxWidth: '500px' }}>
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            aria-label="Your Email"
          />
          <button className="btn btn-primary" type="button">
            Subscribe Now
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default HomeScreen; 
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatPrice';

const SalesBanner = ({ saleProducts }) => {
  // Get the top 4 products with the highest discount percentage
  const topSaleProducts = [...saleProducts]
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 4);

  return (
    <section className="sales-section my-5 py-4">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="display-5 fw-bold mb-3">Seasonal Sale</h2>
          <div 
            className="mx-auto" 
            style={{ 
              width: '150px', 
              height: '4px', 
              background: 'linear-gradient(to right, #ff4081, #7c4dff)' 
            }}
          ></div>
          <p className="lead text-muted mt-3">
            Grab these amazing deals before they're gone!
          </p>
        </motion.div>

        <Row>
          {topSaleProducts.map((product, index) => (
            <Col key={product.id} md={6} lg={3}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <Card className="sale-card border-0 shadow-sm h-100">
                    <div className="position-relative">
                      <Card.Img 
                        variant="top" 
                        src={product.image} 
                        className="sale-card-img"
                        style={{ height: '220px', objectFit: 'cover' }}
                      />
                      <div 
                        className="position-absolute top-0 start-0 bg-danger text-white py-1 px-2 m-2 rounded-pill"
                        style={{ fontWeight: 'bold' }}
                      >
                        {product.discountPercentage}% OFF
                      </div>
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title>{product.name}</Card.Title>
                      <div className="d-flex justify-content-center align-items-center">
                        <span className="text-muted text-decoration-line-through me-2">
                          Rs {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-danger fw-bold">
                          Rs {formatPrice(product.price)}
                        </span>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </motion.div>
            </Col>
          ))}
        </Row>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-4"
        >
          <Link 
            to="/category/sale" 
            className="btn btn-outline-primary btn-lg"
          >
            View All Sale Items
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default SalesBanner; 
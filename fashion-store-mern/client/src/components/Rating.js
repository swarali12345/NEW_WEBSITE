import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Star = ({ filled, half, color }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        scale: 1.2, 
        rotate: [0, 10, -10, 0],
        transition: { duration: 0.3 }
      }}
    >
      {filled ? (
        <FaStar style={{ color }} />
      ) : half ? (
        <FaStarHalfAlt style={{ color }} />
      ) : (
        <FaRegStar style={{ color }} />
      )}
    </motion.span>
  );
};

const Rating = ({ value, text, color = '#ffb100', size = '14px' }) => {
  // Calculate delays for staggered animation
  const delays = [0, 0.05, 0.1, 0.15, 0.2];

  return (
    <div className='rating d-flex align-items-center'>
      <div className="stars-container me-2">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <motion.span 
            key={index}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: delays[index]
            }}
            className="star"
          >
            {value >= star ? (
              <FaStar style={{ color, fontSize: size }} className="star-icon" />
            ) : value >= star - 0.5 ? (
              <FaStarHalfAlt style={{ color, fontSize: size }} className="star-icon" />
            ) : (
              <FaRegStar style={{ color, fontSize: size }} className="star-icon" />
            )}
          </motion.span>
        ))}
      </div>
      
      {text && (
        <motion.span 
          className='rating-text small text-muted'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          {text}
        </motion.span>
      )}
    </div>
  );
};

export default Rating; 
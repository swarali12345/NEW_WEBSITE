import React from 'react';
import { Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';

const Message = ({ variant = 'info', children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Alert variant={variant}>{children}</Alert>
    </motion.div>
  );
};

export default Message; 
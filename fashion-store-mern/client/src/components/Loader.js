import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center py-5">
      <motion.div 
        className="loader"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
};

export default Loader; 
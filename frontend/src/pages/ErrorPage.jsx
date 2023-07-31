import React from 'react';
import { motion } from 'framer-motion';
import './ErrorPage.css';
const ErrorPage = ({ errorMessage }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div>
    <motion.div
      className="error-container"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="error-message">
        <h1>Erreur</h1>
        <p>{errorMessage}</p>
      </div>
       
    </motion.div>
 
    </div>

  );
};

export default ErrorPage;

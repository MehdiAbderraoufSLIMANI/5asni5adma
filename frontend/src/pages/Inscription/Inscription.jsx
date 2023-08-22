import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import './Inscription.css';

const Inscription = () => {
  const navigate = useNavigate();

  const buttonVariants = {
    hover: { scale: 1.1, transition: { duration: 0.2 } }, // Scale the button on hover
    tap: { scale: 0.9, transition: { duration: 0.2 } }, // Scale the button on tap
  };

  return (
    <div className="inscription-container">
      <div className='inscription-form'>
      <div className="register-content">
          <div className="inscription">
            <p>Inscription</p>
            <div className="line"></div>
          </div>
          <div className="content">
            <div className="text">
              <p>Rejoignez-nous en tant que:</p>
            </div>
            {/* Add motion animations to the buttons */}
            <motion.button
              className="client-btn"
              onClick={() => navigate('/register-client')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <p>Je suis client</p>
            </motion.button>
            <motion.button
              className="worker-btn"
              onClick={() => navigate('/register-worker')}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <p>Je suis artisan</p>
            </motion.button>
          </div>
        </div>
        <div className="rectangle"></div>
      </div>
    </div>
  );
};

export default Inscription;

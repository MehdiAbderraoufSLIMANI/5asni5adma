// src/components/FAQ.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../../App';
import './FAQ.css';
const FAQ = () => {
  const [faqData, setFaqData] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  useEffect(() => {
    // Fetch the FAQ data from your Django backend API
    client
      .get('/api/FAQ/')
      .then(response => {
        setFaqData(response.data);
      })
      .catch(error => {
        console.error('Error fetching FAQ data:', error);
      });
  }, []);

  


  const handleQuestionClick = (index) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  return (<div>
    <div className="faq-container">
    <h1 className="faq-heading">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqData.map((faqItem, index) => (
          <motion.div
            key={index}
            className={`faq-item ${activeQuestion === index ? 'active' : ''}`}
            
            whileTap={{ scale: 0.95 }}
            onClick={() => handleQuestionClick(index)}
          >
            <h3>{activeQuestion === index ? (<span>-</span>):(<span>+</span>)} {faqItem.question}</h3>
            {activeQuestion === index && <p>{faqItem.answer}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
};

export default FAQ;

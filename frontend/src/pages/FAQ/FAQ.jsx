
import React, { useState, useEffect } from 'react';
import { client } from '../../App';
import faqImg from '../../resources/images/FAQ.png'
import './FAQ.css';

const FAQ = () => {

  const [faqData, setFaqData] = useState([]);
  

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

  return (
    <>
    <div className="faq-banner container-fluid">
      <div className="faq-header">
        <h3>Foire Aux Questions -FAQ-</h3>
        <p>Explorez les réponses à vos questions les plus fréquentes</p>
      </div>
    </div>

  <div className='faq-container container-fluid'>
    <div className="row  justify-content-around">
    <div className="faq-content col-md-6 ">
      {faqData.length > 0 ?
        <div className="accordion" id="accordionExample">
          {
            faqData.map((faq, index) => (
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`#collapse${index}`} >
                    {faq.question}
                  </button>
                </h2>
                <div id={`collapse${index}`} className="accordion-collapse collapse " data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>

            ))
          }
        </div> :
        <div className="alert alert-info w-50 mx-auto text-center">
          Aucun FAQ disponible
        </div>
      }
    </div>
    <div className="col-md-5 imag-container text-center align-self-start" >
      <img src={faqImg} height='70%' width='120%' alt='faq' />
    </div>
    </div>
  </div>
  </>
  );
};

export default FAQ;

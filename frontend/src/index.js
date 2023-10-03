import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FilterContext from './Context/FilterContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <FilterContext>
      
        <App />
      
      </FilterContext>
    
  </React.StrictMode>
);

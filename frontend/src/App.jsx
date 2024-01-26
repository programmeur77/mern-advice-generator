import React from 'react';

import { useState, useEffect } from 'react';
import Advice from './components/Advice';

import './App.scss';
function App() {
  const [currentAdvice, setCurrentAdvice] = useState(null);

  const fetchAdvice = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setAdviceAndSave(data.slip);
  };

  const setAdviceAndSave = (advice) => {
    setCurrentAdvice([advice]);
    localStorage.setItem('advice', JSON.stringify(advice));
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    if (!fetchAdvice()) {
      throw new Error();
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('advice')) {
      if (!fetchAdvice()) {
        throw new Error();
      }
    }

    setCurrentAdvice([JSON.parse(localStorage.getItem('advice'))]);
  }, []);

  return (
    <div className="generator-container">
      {currentAdvice &&
        currentAdvice.map((advice) => {
          return (
            <Advice
              advice={advice}
              key={advice.id}
              handleOnClick={handleOnClick}
            />
          );
        })}
    </div>
  );
}

export default App;

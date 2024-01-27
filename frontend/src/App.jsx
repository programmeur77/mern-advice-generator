import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Generator from './components/Generator';
import Advice from './components/Advice';

import './App.scss';
function App() {
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAdvice = async () => {
    setIsLoading(true);
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    setAdviceAndSave(data.slip);
    setIsLoading(false);
  };

  const setAdviceAndSave = (advice) => {
    setCurrentAdvice([advice]);
    localStorage.setItem('advice', JSON.stringify(advice));
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
    <Router>
      <div className="generator-container">
        <Generator
          currentAdvice={currentAdvice}
          fetchAdvice={fetchAdvice}
          isLoading={isLoading}
        />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Generator from './components/Generator';
import Login from './components/Login';

import './App.scss';
function App() {
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

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
    if (!localStorage.getItem('user')) {
      setUser(null);
    }

    if (!localStorage.getItem('advice')) {
      if (!fetchAdvice()) {
        throw new Error();
      }
    }

    setCurrentAdvice([JSON.parse(localStorage.getItem('advice'))]);
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <Router>
      <div className="generator-container">
        <Routes>
          <Route
            exact
            path="/"
            element={
              user !== null ? (
                <Generator
                  currentAdvice={currentAdvice}
                  fetchAdvice={fetchAdvice}
                  isLoading={isLoading}
                />
              ) : (
                <Login />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

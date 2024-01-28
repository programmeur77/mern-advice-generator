import React from 'react';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Generator from './components/Generator';
import FormContainer from './components/FormContainer';

import './App.scss';
import ProtectedRoutes from './components/ProtectedRoutes';
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
    setUser(JSON.parse(localStorage.getItem('user')));

    console.log(user);

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
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Generator
              currentAdvice={currentAdvice}
              fetchAdvice={fetchAdvice}
              isLoading={isLoading}
              user={user}
            />
          }
        />
        <Route path="/login" element={<FormContainer />} />
        <Route path="/register" element={<FormContainer />} />
      </Routes>
    </Router>
  );
}

export default App;

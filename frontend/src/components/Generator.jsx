import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Advice from './Advice';

const Generator = ({
  user,
  setUser,
  userId,
  currentAdvice,
  setCurrentAdvice,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    user === null ? navigate('/login') : null;
    currentAdvice === null ? generateAdvice() : null;
  }, []);

  const fetchAdvice = async () => {
    try {
      const adviceResponse = await fetch('https://api.adviceslip.com/advice');
      if (!adviceResponse.ok) throw new Error('Could not fetch advice');
      const advice = await adviceResponse.json();
      return advice;
    } catch (error) {
      console.log(error);
    }
  };

  const generateAdvice = async () => {
    try {
      const newAdvice = await fetchAdvice();
      if (!newAdvice) throw new Error('Error in fetching advice');
      console.log(newAdvice);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="generator-container">
        {currentAdvice &&
          currentAdvice.map((advice) => {
            return (
              <Advice
                advice={advice}
                key={advice.id}
                // handleOnClick={handleOnClick}
                isLoading={isLoading}
              />
            );
          })}
      </div>
    </>
  );
};

export default Generator;

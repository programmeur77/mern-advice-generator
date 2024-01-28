import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Advice from './Advice';

const Generator = ({ user, userId }) => {
  const [currentAdvice, setCurrentAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    user === null ? navigate('/login') : null;

    currentAdvice === null ? generateAdviceAndStore() : null;
  }, []);

  useEffect(() => {
    currentAdvice !== null ? createNewAdvice(currentAdvice) : console.log('no');
  }, [currentAdvice]);

  const fetchAdvice = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');

      if (response.ok) {
        const data = await response.json();
        setIsLoading(false);
        return data.slip;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCreateAdvice = async (advice) => {
    const response = await fetch(
      `http://localhost:3000/api/advice/${userId}/updateAdvice`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(advice),
      }
    );

    try {
      if (!response.ok) {
        throw new Error('Failed to create advice');
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const createNewAdvice = (currentAdvice) => {
    currentAdvice.map((advice) => {
      const newAdvice = {
        adviceId: advice.id,
        advice: advice.advice,
        generatedAt: new Date().toLocaleString(),
      };
      saveAdvice(newAdvice);
    });
  };

  const saveAdvice = async (advice) => {
    try {
      const adviceResponse = await fetchCreateAdvice(advice);
      if (!adviceResponse) {
        throw new Error('Failed to save advice');
      }
      console.log(adviceResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAdviceAndStore = async () => {
    const advice = await fetchAdvice();

    setCurrentAdvice([advice]);
    localStorage.setItem('advice', JSON.stringify(advice));
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

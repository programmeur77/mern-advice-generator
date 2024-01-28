import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Advice from './Advice';

const Generator = ({ currentAdvice, fetchAdvice, isLoading }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) navigate('/login');
  }, []);
  const handleOnClick = (e) => {
    e.preventDefault();
    if (!fetchAdvice()) {
      throw new Error();
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
                handleOnClick={handleOnClick}
                isLoading={isLoading}
              />
            );
          })}
      </div>
    </>
  );
};

export default Generator;

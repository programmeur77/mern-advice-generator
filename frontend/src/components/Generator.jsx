import React from 'react';
import { useState } from 'react';

import Advice from './Advice';

const Generator = ({ currentAdvice, fetchAdvice, isLoading }) => {
  const handleOnClick = (e) => {
    e.preventDefault();
    if (!fetchAdvice()) {
      throw new Error();
    }
  };

  return (
    <>
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
    </>
  );
};

export default Generator;

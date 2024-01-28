import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './FormContainer.scss';

const Login = () => {
  const [formTitle, setFormTitle] = useState('');
  const [error, setError] = useState(null);
  const location = useLocation();

  const handleOnBlur = (event) => {
    switch (event.target.name) {
      case 'email':
        console.log('email');
        break;
      case 'password':
        console.log('password');
        break;
      default:
        break;
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-container__form-title">{formTitle}</h1>
      {location.pathname === '/login' ? (
        <LoginForm
          setFormTitle={setFormTitle}
          error={error}
          handleOnBlur={handleOnBlur}
        />
      ) : (
        <SignupForm setFormTitle={setFormTitle} />
      )}
    </div>
  );
};

export default Login;

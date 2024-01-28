import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './FormContainer.scss';

const Login = () => {
  const [formTitle, setFormTitle] = useState('');
  const [error, setError] = useState(null);
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const location = useLocation();

  const handleOnChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmailValue(event.target.value);
        break;
      case 'password':
        setPasswordValue(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleOnBlur = (event) => {
    switch (event.target.name) {
      case 'email':
        if (emailValue === null) setError('Please enter your email');
        setError('');
        break;
      case 'password':
        if (passwordValue === null) setError('Please enter your password');
        setError('');
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
          handleOnChange={handleOnChange}
        />
      ) : (
        <SignupForm setFormTitle={setFormTitle} />
      )}
    </div>
  );
};

export default Login;

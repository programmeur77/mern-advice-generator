import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './FormContainer.scss';

const Login = () => {
  const location = useLocation();
  const [formTitle, setFormTitle] = useState('');

  return (
    <div className="form-container">
      <h1 className="form-container__form-title">{formTitle}</h1>
      {location.pathname === '/login' ? (
        <LoginForm setFormTitle={setFormTitle} />
      ) : (
        <SignupForm setFormTitle={setFormTitle} />
      )}
    </div>
  );
};

export default Login;

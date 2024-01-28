import React from 'react';

import LoginForm from './LoginForm';

import './FormContainer.scss';

const Login = () => {
  return (
    <div className="form-container">
      <h1 className="form-container__form-title">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;

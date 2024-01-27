import React from 'react';

import LoginForm from './LoginForm';

import './Login.scss';

const Login = () => {
  return (
    <div className="login">
      <h1 className="login__form-title">Login</h1>
      <LoginForm />
    </div>
  );
};

export default Login;

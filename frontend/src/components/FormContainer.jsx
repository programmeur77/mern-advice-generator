import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './FormContainer.scss';

const Login = () => {
  const [formTitle, setFormTitle] = useState('');
  const [error, setError] = useState([]);
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [passwordVisible, setPasswordVilsible] = useState(false);

  const location = useLocation();

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  const insertErrorMessage = (errorMessage) => {
    if (errorMessage.length > 0) {
      setError(error.push(errorMessage));
    }
    setError([errorMessage]);
  };

  const clearErrorMessage = (errorMessage) => {
    const updatedErrorArray = error.filter((error) => error !== errorMessage);
    setError(updatedErrorArray);
  };

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
        if (emailValue !== null || emailValue !== '') {
          clearErrorMessage('Email is required');

          if (!emailPattern.test(emailValue)) {
            insertErrorMessage('Invalid email');
          } else {
            clearErrorMessage('Invalid email');
          }
        } else {
          insertErrorMessage('Email is required');
        }
        break;
      case 'password':
        if (passwordValue === null || passwordValue === '') {
          insertErrorMessage('Password is required');
        } else {
          const newErrorArray = error.filter(
            (error) => error !== 'Password is required'
          );
          setError(newErrorArray);
        }
        break;
      default:
        break;
    }
  };

  const handlePasswordVisibility = () => {
    setPasswordVilsible(!passwordVisible);
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-container__form-title">{formTitle}</h1>
        {location.pathname === '/login' ? (
          <LoginForm
            setFormTitle={setFormTitle}
            error={error}
            passwordVisible={passwordVisible}
            handleOnBlur={handleOnBlur}
            handleOnChange={handleOnChange}
            handlePasswordVisibility={handlePasswordVisibility}
          />
        ) : (
          <SignupForm setFormTitle={setFormTitle} />
        )}
      </div>
      <div className="form-container__link-section">
        {location.pathname === '/login' ? (
          <p className="link-section__text">
            Don't have an account yet ?
            <Link to="/register" className="link-section__link">
              &nbsp;Register
            </Link>
          </p>
        ) : (
          <p className="link-section__text">
            Already have an account ?
            <Link to="/login" className="link-section__link">
              &nbsp;Login
            </Link>
          </p>
        )}
      </div>
    </>
  );
};

export default Login;

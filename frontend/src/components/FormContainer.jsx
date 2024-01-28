import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

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
  const navigate = useNavigate();

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  const postUserFetch = async (user) => {
    const newUser = await fetch(
      `http://localhost:3000/api/users/${
        location.pathname === '/login' ? 'login' : 'create'
      }`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: user,
      }
    );

    if (!newUser.ok) {
      console.log(newUser.status);
    }

    return newUser.json();
  };

  const insertErrorMessage = (errorMessage) => {
    setError(error.push(errorMessage));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error.length > 0) {
      return;
    }

    const User = { email: emailValue, password: passwordValue };

    postUserFetch(JSON.stringify(User))
      .then((data) => {
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.advice !== undefined)
          localStorage.setItem('advice', JSON.stringify(data.user.advice));
        navigate('/');
      })
      .catch((error) => console.log(error));
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
            handleSubmit={handleSubmit}
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

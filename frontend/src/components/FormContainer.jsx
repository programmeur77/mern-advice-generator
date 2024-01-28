import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './FormContainer.scss';

const FormContainer = ({ user, setUser, setUserId }) => {
  const [formTitle, setFormTitle] = useState('');
  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);
  const [passwordVisible, setPasswordVilsible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

  useEffect(() => {
    user !== null ? navigate('/advice') : null;
  }, []);

  const postUserFetch = async (user) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${
          location.pathname === '/login' ? 'login' : 'create'
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.user;
      }
    } catch (error) {
      console.log(error);
    }
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

  const handlePasswordVisibility = () => {
    setPasswordVilsible(!passwordVisible);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailValue === null || passwordValue === null) {
      return;
    }

    const newUser = { email: emailValue, password: passwordValue };

    postUserFetch(newUser)
      .then((user) => {
        setUser(user);
        setUserId(user._id);
        // if (user.advice !== undefined) {
        //   localStorage.setItem('advice', JSON.stringify(data.user.advice));
        // }
        navigate('/advice');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="form-container">
        <h1 className="form-container__form-title">{formTitle}</h1>
        {location.pathname === '/login' ? (
          <LoginForm
            setFormTitle={setFormTitle}
            passwordVisible={passwordVisible}
            handlePasswordVisibility={handlePasswordVisibility}
            handleOnChange={handleOnChange}
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

export default FormContainer;

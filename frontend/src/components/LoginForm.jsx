import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IoMdEye } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';

import './LoginForm.scss';

const LoginForm = ({ setFormTitle, error, handleOnBlur }) => {
  useEffect(() => {
    setFormTitle('Login');
  }, []);
  return (
    <>
      <form action="POST" className="login-form">
        <input
          type="text"
          name="email"
          className="login-form__email-input"
          placeholder="example@example.com"
          onBlur={handleOnBlur}
          autoFocus
        />
        <div className="login-form__password-container">
          <input
            type="password"
            name="password"
            className="login-form__password-input"
            placeholder="Password"
            onBlur={handleOnBlur}
          />
          <IoMdEye className="login-form__eye-icon" />
        </div>
        <p className="login-form__error">Error</p>
        <button className="login-form__submit-btn">
          <FiLogIn className="login-form__btn-icon" />
        </button>
      </form>

      <div className="login-form__link-section">
        <Link
          to="/forgotten-password"
          className="login-form__forgotten-password-link"
        >
          Forgotten password
        </Link>

        <p className="login-form__no-account-text">
          Don't have an account yet ?
          <Link to="/register" className="login-form__register-link">
            &nbsp;Register
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginForm;

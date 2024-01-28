import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { FiLogIn } from 'react-icons/fi';

import './LoginForm.scss';

const LoginForm = ({
  setFormTitle,
  error,
  passwordVisible,
  handleOnBlur,
  handleOnChange,
  handlePasswordVisibility,
}) => {
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
          onChange={handleOnChange}
          autoFocus
        />
        <div className="login-form__password-container">
          {passwordVisible ? (
            <input
              type="text"
              name="password"
              className="login-form__password-input"
              placeholder="Password"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
          ) : (
            <input
              type="password"
              name="password"
              className="login-form__password-input"
              placeholder="Password"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
            />
          )}
          {passwordVisible ? (
            <IoMdEyeOff
              className="login-form__eye-icon"
              onClick={handlePasswordVisibility}
            />
          ) : (
            <IoMdEye
              className="login-form__eye-icon"
              onClick={handlePasswordVisibility}
            />
          )}
        </div>
        {error.length > 0 ? (
          <div className="login-form__error">{error}</div>
        ) : null}
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
      </div>
    </>
  );
};

export default LoginForm;

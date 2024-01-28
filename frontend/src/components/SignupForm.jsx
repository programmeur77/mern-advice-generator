import React from 'react';
import { useEffect } from 'react';

const SignupForm = ({ setFormTitle }) => {
  useEffect(() => {
    setFormTitle('Sign Up');
  }, []);
};

export default SignupForm;

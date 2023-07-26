import React, { useContext, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

import UserContext from '../UserContext';
import Form from './Form';
import InlineMessage from './InlineMessage';

const QUESTIONS = [
  {
    type: 'text',
    id: 'username',
    label: 'Username',
  },
  {
    type: 'password',
    id: 'password',
    label: 'Password',
  },
];

function SignIn({ mode }) {
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [inlineMessages, setInlineMessages] = useState([]);

  const saveToken = ({ data }) => {
    setToken(data.token);
    navigate('/');
  };
  const onSignIn = (values) => axios
    .get('http://localhost:8000/tokens', { params: values })
    .then(saveToken)
    .catch(({ message }) => {
      inlineMessages.push({ type: 'error', message });
      setInlineMessages([...inlineMessages]);
    });
  const onSignUp = (values) => axios
    .post('http://localhost:8000/users', values)
    .then(saveToken)
    .catch(({ message }) => {
      inlineMessages.push({ type: 'error', message });
      setInlineMessages([...inlineMessages]);
    });

  const signingIn = mode === 'sign-in';
  const linkPrompt = signingIn
    ? "Don't have an account yet?"
    : 'Already have an account?';
  const linkText = signingIn
    ? 'Sign up here.'
    : 'Sign in here.';
  const linkHref = signingIn ? '/sign-up' : '/sign-in';
  return (
    <div>
      {inlineMessages.map(({ message, type }) => (
        <InlineMessage key={message} type={type}>
          {message}
        </InlineMessage>
      ))}
      <Form
        questions={QUESTIONS}
        onSubmit={signingIn ? onSignIn : onSignUp}
      />
      {linkPrompt}
      <Link to={linkHref}>{linkText}</Link>
    </div>
  );
}

SignIn.propTypes = { mode: propTypes.string.isRequired };

export default SignIn;

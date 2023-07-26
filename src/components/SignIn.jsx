import React from 'react';
import axios from 'axios';

import Form from './Form';

const QUESTIONS = [
  {
    type: 'text',
    id: 'username',
    label: 'Username',
  },
  {
    type: 'text',
    id: 'password',
    label: 'Password',
  },
];

function SignIn() {
  const onSubmit = (values) => axios
    .get('http://localhost:8000/tokens', { params: values })
    .then(() => {})
    .catch(({ message }) => { console.error(message); });

  return (
    <Form
      questions={QUESTIONS}
      onSubmit={onSubmit}
    />
  );
}

export default SignIn;

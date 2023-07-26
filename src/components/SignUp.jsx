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

function SignUp() {
  const onSubmit = (values) => axios
    .post('http://localhost:8000/users', values)
    .then(() => {})
    .catch(({ message }) => { console.error(message); });

  return (
    <Form
      questions={QUESTIONS}
      onSubmit={onSubmit}
    />
  );
}

export default SignUp;

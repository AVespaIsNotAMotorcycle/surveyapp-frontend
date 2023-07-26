import React, { useState } from 'react';
import propTypes from 'prop-types';

import Input from './Input';

function formatValues(questions) {
  const values = {};
  questions.forEach(({ id, defaultValue }) => {
    values[id] = defaultValue || '';
  });
  return values;
}

function Form({ questions, onSubmit }) {
  const [values, setValues] = useState(formatValues(questions));
  return (
    <form>
      {questions.map((question) => (
        <Input
          key={question.id}
          id={question.id}
          label={question.label}
          onChange={({ target }) => {
            setValues({
              ...values,
              [question.id]: target.value,
            });
          }}
          value={values[question.id]}
          type={question.type}
        />
      ))}
      <button
        type="submit"
        onClick={(event) => {
          event.preventDefault();
          onSubmit(values);
        }}
      >
        Submit
      </button>
    </form>
  );
}

Form.propTypes = {
  questions: propTypes.arrayOf(
    propTypes.instanceOf(Object),
  ).isRequired,
  onSubmit: propTypes.func.isRequired,
};

export default Form;

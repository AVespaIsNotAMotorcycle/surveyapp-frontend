import React, { useState } from 'react';
import propTypes from 'prop-types';

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
        <label
          key={question.id}
          htmlFor={question.id}
        >
          {question.label}
          <input
            id={question.id}
            onChange={({ target }) => {
              setValues({
                ...values,
                [question.id]: target.value,
              });
            }}
          />
        </label>
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

import React from 'react';
import propTypes from 'prop-types';

import './Input.css';

function Input({
  label,
  id,
  type,
  value,
  onChange,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

Input.propTypes = {
  label: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  type: propTypes.string.isRequired,
  value: propTypes.string,
  onChange: propTypes.func,
};
Input.defaultProps = {
  value: '',
  onChange: () => {},
};

export default Input;

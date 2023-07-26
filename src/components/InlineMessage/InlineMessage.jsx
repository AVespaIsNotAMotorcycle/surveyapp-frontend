import React from 'react';
import propTypes from 'prop-types';

import './InlineMessage.css';

function InlineMessage({ type, children }) {
  return (
    <div className={`inline-message-${type} inline-message`}>
      {children}
    </div>
  );
}

InlineMessage.propTypes = {
  type: propTypes.string,
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};
InlineMessage.defaultProps = {
  type: 'success',
  children: null,
};

export default InlineMessage;

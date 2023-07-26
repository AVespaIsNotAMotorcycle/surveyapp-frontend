import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';

import UserContext from '../UserContext';
import InlineMessage from './InlineMessage';

function Surveys() {
  const { token } = useContext(UserContext);
  const [surveys, setSurveys] = useState([]);
  const [inlineMessages, setInlineMessages] = useState([]);

  useEffect(() => {
    if (!token) return;
    axios.get(
      'http://localhost:8000/surveys',
      { headers: { authorization: token } },
    )
      .then(({ data }) => { setSurveys(data); })
      .catch(({ message }) => {
        inlineMessages.push({
          key: Date.now(),
          type: 'error',
          message,
        });
        setInlineMessages([...inlineMessages]);
      });
  }, [token]);

  return (
    <div>
      {inlineMessages.map(({ key, type, message }) => (
        <InlineMessage key={key} type={type}>
          {message}
        </InlineMessage>
      ))}
      {surveys.length === 0 && (
        <InlineMessage type="success">
          There are no surveys available.
        </InlineMessage>
      )}
      {surveys}
    </div>
  );
}

export default Surveys;

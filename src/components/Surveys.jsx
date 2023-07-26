import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import InlineMessage from './InlineMessage';

import routes from '../routes';

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
      <Link to={routes.newSurvey}>New Survey</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Updated</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map(({
            id,
            name,
            createdAt,
            updatedAt,
          }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{createdAt}</td>
              <td>{updatedAt}</td>
              <td>
                <Link to={`/surveys/${id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Surveys;

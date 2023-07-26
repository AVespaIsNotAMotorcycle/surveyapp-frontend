import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import routes from '../routes';

function Navbar() {
  const { token } = useContext(UserContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!token && (<li><Link to={routes.signIn}>Sign In</Link></li>)}
        <li><Link to={routes.surveys}>Surveys</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

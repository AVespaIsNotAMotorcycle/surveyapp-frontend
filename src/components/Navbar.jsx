import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/sign-in">Sign In</Link></li>
        <li><Link to="/surveys">Surveys</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

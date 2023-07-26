import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="sign-in">Sign In</Link></li>
        <li><Link to="sign-up">Sign Up</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

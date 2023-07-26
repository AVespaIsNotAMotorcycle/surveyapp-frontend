import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import { UserContextProvider } from './UserContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const routes = {
  signIn: 'sign-in',
  signUp: 'sign-up',
};

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.signUp} element={<SignUp />} />
          <Route path={routes.signIn} element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

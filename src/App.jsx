import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';

import './App.css';

import { UserContextProvider } from './UserContext';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';

const routes = {
  signIn: 'sign-in',
  signUp: 'sign-up',
};

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path={routes.signUp}
              element={<SignIn mode="sign-up" />}
            />
            <Route
              path={routes.signIn}
              element={<SignIn mode="sign-in" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

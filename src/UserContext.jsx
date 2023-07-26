import React, {
  createContext,
  useMemo,
  useState,
} from 'react';
import propTypes from 'prop-types';

const UserContext = createContext();

function UserContextProvider({ children }) {
  const [token, setToken] = useState();

  const value = useMemo(() => ({
    token,
    setToken,
  }), [token]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.arrayOf(propTypes.node),
  ]),
};
UserContextProvider.defaultProps = { children: null };

export { UserContextProvider };
export default UserContext;

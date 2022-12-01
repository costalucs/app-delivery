import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { login, getMe } from '../helpers/api/users';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  async function login(email, password) {
    const token = await login({ email, password });
    setToken(returnedToken);
    setUser({ id, name, email, role });
  }

  const value = {
    login,
    user,
    token,
  };

  useEffect(() => {
    const mounted = true;
  }, []);

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;

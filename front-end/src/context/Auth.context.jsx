import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { login as logMe, getMe } from '../helpers/api/users';

const AuthContext = createContext({ user: null });

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    try {
      const { token: returnedToken } = await logMe({ email, password });
      localStorage.setItem('token', returnedToken);
      setToken(returnedToken);
      const { name, role, id } = await getMe(token);
      localStorage.setItem('user', JSON.stringify({ id, name, role }));
      setUser({ id, name, role });
    } catch (e) {
      alert(e);
    }
  }

  function signOut() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const value = useMemo(() => ({
    signIn,
    signOut,
    user,
    token,
  }), [user, token]);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      setUser({});
      setToken(null);
    } else {
      setToken(localToken);
      setUser(async () => getMe(localToken));
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext);

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;

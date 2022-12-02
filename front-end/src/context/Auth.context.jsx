import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { login as logMe, getMe } from '../helpers/api/users';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  async function signIn(email, password) {
    try {
      const returnedToken = await logMe({ email, password });
      console.log(returnedToken);
      localStorage.setItem('token', returnedToken.token);
      setToken(returnedToken.token);
      const { name, role, id } = await getMe(token);
      localStorage.setItem('user', JSON.stringify({ id, name, role }));
      setUser({ id, name, role });
    } catch (e) {
      console.log(e);
      alert(e.message);
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

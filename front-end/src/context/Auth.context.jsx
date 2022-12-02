import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { login as logMe, getMe } from '../helpers/api/users';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = useCallback(async ({ email, password }) => {
    try {
      const returnedToken = await logMe({ email, password });
      localStorage.setItem('token', returnedToken.token);
      setToken(returnedToken);
      const checkUser = await getMe(token);
      const { name, id, role } = checkUser;
      localStorage.setItem('user', JSON.stringify({ id, name, role }));
      setUser({ id, name, role });
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  }, [token, user]);

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  const value = useMemo(() => ({
    login,
    logout,
    user,
    token,
  }), [user, token, login]);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);
      getMe(localToken).then((data) => setUser(data)).catch((e) => console.log(e));
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

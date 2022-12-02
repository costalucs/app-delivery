import React, {
  createContext,
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

  const login = async ({ email, password }) => {
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
    }
  };

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
  }

  const value = useMemo(() => ({
    login,
    logout,
    user,
    token,
  }), [user, token]);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      setToken(localToken);

      getMe(localToken).then((data) => {
        setUser(data);
      }).catch((e) => console.log(e));

      localStorage.setItem('user', JSON.stringify(user));
    }
  }, []);

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => useContext(AuthContext).user;
export const useLogin = () => {
  const { login } = useContext(AuthContext);
  return (user) => login(user);
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;

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
  const [contextToken, setToken] = useState('null');
  const [contextUser, setUser] = useState({});

  function contextLogout() {
    localStorage.clear();
    setUser({});
    setToken('null');
  }

  async function contextLogin({ email, password }) {
    try {
      const returnedToken = await logMe({ email, password });
      localStorage.setItem('token', returnedToken);
      setToken(returnedToken);
    } catch (e) {
      console.log(e);
      contextLogout();
    }
  }

  async function asyncGetMe() {
    const user = await getMe(contextToken);
    if (user.id) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      contextLogout();
      // should some how return message?
    }
  }

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken && localToken !== 'null') {
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (contextToken !== null && contextToken !== 'null') {
      asyncGetMe();
    }
  }, [contextToken]);

  const value = useMemo(
    () => ({
      login: contextLogin,
      logout: contextLogout,
      user: contextUser,
      token: contextToken,
      register: async (newUser) => {
        await registerUser(newUser)
          .then(
            (returnedToken) => {
              localStorage.setItem('token', returnedToken);
              setToken(returnedToken);
              return returnedToken;
            },
          ).catch((e) => { console.log(e); });
      },
    }),
    [contextToken, contextUser, contextLogin, contextLogout],
  );

  return (
    <AuthContext.Provider value={ value }>
      {children}
    </AuthContext.Provider>
  );
}

export const useSession = () => ({ ...useContext(AuthContext) });

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthProvider;

import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getMe, getSellers, login as logMe, registerUser } from '../helpers/api/users';

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [contextToken, setToken] = useState('null');
  const [contextUser, setUser] = useState({});

  const contextLogout = useMemo(() => () => {
    localStorage.clear();
    setUser({});
    setToken('null');
  }, []);

  async function asyncGetMe() {
    const user = await getMe(contextToken);
    if (user.id) {
      setUser(user);
      localStorage.setItem('user', JSON.stringify({ ...user, token: contextToken }));
    } else {
      contextLogout();
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
      login: async ({ email, password }) => {
        try {
          const returnedToken = await logMe({ email, password });
          localStorage.setItem('token', returnedToken);
          setToken(returnedToken);
          return true;
        } catch (e) {
          console.log(e);
          contextLogout();
          return false;
        }
      },
      sellers: async (token) => {
        try {
          const sellers = await getSellers(token);
          return sellers;
        } catch (e) {
          return false;
        }
      },
      logout: contextLogout,
      user: contextUser,
      token: contextToken,
      register: async (newUser) => {
        await registerUser(newUser)
          .then(
            ({ data }) => {
              localStorage.setItem('token', data.token);
              setToken(data.token);
              return true;
            },
          ).catch((e) => {
            console.log(e);
            contextLogout();
            return false;
          });
      },
    }),
    [contextToken, contextUser, contextLogout],
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

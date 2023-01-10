import { useMemo, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';
import './index.css';

import {
  loginSchema,
  registerSchema,
} from '../../helpers/validations/credentials';

import { useSession } from '../../context/Auth.context';

function Login() {
  const { pathname } = useLocation();
  const [emailInput, setEmail] = useState('');
  const [passwordInput, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoginInvalid, setLoginValidation] = useState(false);

  const navigate = useHistory();
  const session = useSession();

  const location = useMemo(() => {
    if (pathname === '/login') return 'login';
    return 'register';
  }, [pathname]);

  const handleLogin = async () => {
    const confirm = await session.login({
      email: emailInput,
      password: passwordInput,
    });
    if (!confirm) setLoginValidation(true);
  };

  const handleSignUp = async () => {
    const confirm = await session.register({
      email: emailInput,
      password: passwordInput,
      name: userName,
    });
    if (!confirm) setLoginValidation(true);
  };

  const buttonOptions = location === 'login'
    ? {
      datatestid: 'common_login__button-login',
      name: 'Login',
      type: 'submit',
      state: !loginSchema.isValidSync({
        email: emailInput,
        password: passwordInput,
      }),
      handle: handleLogin,
    }
    : {
      datatestid: 'common_register__button-register',
      name: 'Cadastrar',
      type: 'submit',
      state: !registerSchema.isValidSync({
        email: emailInput,
        password: passwordInput,
        name: userName,
      }),
      handle: handleSignUp,
    };

  const buttonRegister = {
    datatestid: `common_${location}__button-register`,
    name: 'Register',
    type: 'button',
    state: false,
    handle: () => {
      setLoginValidation(false);
      navigate.push('/register');
    },
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'name') setUserName(value);
  };

  return (
    <div className="fullscreen">
      <div className="input-container">
        {session.user.id
          && (session.user.role === 'seller' ? (
            <Redirect to="/seller/orders" />
          ) : (
            <Redirect to="/customer/products" />
          ))}
        {location === 'register' && (
          <div className="input-box-container">
            <Input
              className="input_login"
              datatestid="common_register__input-name"
              label="Nome"
              id="name-input-text"
              type="email"
              value={ userName }
              name="name"
              placeHolder="Your name here"
              handle={ handleChange }
            />
          </div>
        )}
        <div className="input-box-container">
          <Input
            datatestid={ `common_${location}__input-email` }
            className="input_login"
            label="Login"
            id={ `${location}-email-input-text` }
            type="email"
            value={ emailInput }
            name="email"
            placeHolder="email@email.com"
            handle={ handleChange }
          />
          <Input
            className="input_login"
            datatestid={ `common_${location}__input-password` }
            label="Password"
            name="password"
            id={ `${location}-password-input-text` }
            type="password"
            value={ passwordInput }
            handle={ handleChange }
            placeHolder="Password"
          />
        </div>

        <div className="buttons-container">
          <Button { ...buttonOptions } />
          {pathname === '/login' && <Button { ...buttonRegister } />}
        </div>

        <div className="error-message-container">
          {isLoginInvalid && location === 'login' && (
            <p data-testid="common_login__element-invalid-email">Login Inválido</p>
          )}
          {isLoginInvalid && location === 'register' && (
            <p data-testid="common_register__element-invalid_register">
              Registro Inválido
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;

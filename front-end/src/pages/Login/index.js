import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { getUserInfo } from '../../helpers/api/login';
import { registerUser } from '../../helpers/api/registerUser';
import { loginSchema, registerSchema } from '../../helpers/validations/credentials';

function Login() {
  const { pathname } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoginValid, setIsLoginValid] = useState(false);
  const location = pathname === '/login' ? 'login' : 'register';
  const navigate = useHistory();

  const handleLogin = async () => {
    try {
      const userInfo = await getUserInfo(email, password);
      console.log(userInfo);
      navigate.push('/customer/products');
    } catch (error) {
      console.log(error);
      setIsLoginValid(true);
    }
    // use local Storage
    // gerar jwt
    // console.log(userInfo);
  };

  const handleSignUp = async () => {
    const whatever = await registerUser({ email, password, name: userName });

    console.log(whatever);
  };

  const buttonOptions = location === 'login'
    ? {
      datatestid: 'common_login__button-login',
      name: 'Login',
      type: 'submit',
      state: !loginSchema.isValidSync({ email, password }),
      handle: handleLogin,
    } : {
      datatestid: 'common_login__button-resgister',
      name: 'Cadastrar',
      type: 'submit',
      state: !registerSchema.isValidSync({ email, password, name: userName }),
      handle: handleSignUp,
    };

  const buttonRegister = {
    datatestid: 'common_login__button-register',
    name: 'Register',
    type: 'button',
    state: false,
    handle: () => navigate.push('/register'),
  };

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'name') setUserName(value);
  };

  return (
    <div>
      {pathname === '/register' && <Input
        datatestid="common_register__input-name"
        label="Nome"
        id="name-input-text"
        type="email"
        value={ userName }
        name="name"
        placeHolder="email@email.com"
        handle={ handleChange }
      />}
      <Input
        datatestid={ `common_${location}__input-email` }
        label="Login"
        id={ `${location}-input-text` }
        type="email"
        value={ email }
        name="email"
        placeHolder="email@email.com"
        handle={ handleChange }
      />
      <Input
        datatestid={ `common_${location}__input-password` }
        label="Password"
        name="password"
        id={ `${location}-input-text` }
        type="password"
        value={ password }
        handle={ handleChange }
        placeHolder="Password"
      />

      <Button { ...buttonOptions } />
      {pathname === '/login' && <Button { ...buttonRegister } />}
      {isLoginValid
      && <p data-testid="common_login__element-invalid-email">Login Inválido</p>}
    </div>
  );
}

export default Login;

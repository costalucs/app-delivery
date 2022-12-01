import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { getUserInfo } from '../../helpers/api/login';
import { registerUser } from '../../helpers/api/registerUser';

function Login() {
  const { pathname } = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const location = pathname === '/login' ? 'login' : 'register';

  const handleLogin = async () => {
    const userInfo = await getUserInfo(email, password);
    // use local Storage
    // gerar jwt
    console.log(userInfo);
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
      state: false,
      handle: handleLogin,
    } : {
      datatestid: 'common_login__button-resgister',
      name: 'Cadastrar',
      type: 'submit',
      state: false,
      handle: handleSignUp,
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
    </div>
  );
}

export default Login;

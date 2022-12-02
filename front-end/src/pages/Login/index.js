import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useUser } from '../../context/Auth.context';
import { registerUser } from '../../helpers/api/users';

function Login() {
  const { pathname } = useLocation();
  const [emailInput, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const location = useMemo(() => {
    if (pathname === '/login') return 'login';
    return 'register';
  }, [pathname]);

  const user = useUser();
  console.log(user);

  const handleSignUp = async () => {
    const whatever = await registerUser({ email: emailInput, password, name: userName });

    console.log(whatever);
  };

  const buttonOptions = location === 'login'
    ? {
      datatestid: 'common_login__button-login',
      name: 'Login',
      type: 'submit',
      state: false,
      handle: () => user.login({ email: emailInput, password }),
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
      {location === 'register' && <Input
        datatestid="common_register__input-name"
        label="Nome"
        id="name-input-text"
        type="email"
        value={ userName }
        name="name"
        placeHolder="Your name here"
        handle={ handleChange }
      />}
      <Input
        datatestid={ `common_${location}__input-email` }
        label="Login"
        id={ `${location}-email-input-text` }
        type="email"
        value={ emailInput }
        name="email"
        placeHolder="email@email.com"
        handle={ handleChange }
      />
      <Input
        datatestid={ `common_${location}__input-password` }
        label="Password"
        name="password"
        id={ `${location}-password-input-text` }
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

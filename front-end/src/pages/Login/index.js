import { useLocation } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

function Login() {
  const location = useLocation();
  const buttonOptions = location.pathname === '/login'
    ? {
      datatestid: 'common_login__button-login',
      name: 'Login',
      type: 'submit',
      state: 'true',
    } : {
      datatestid: 'common_login__button-resgister',
      name: 'Cadastrar',
      type: 'submit',
      state: 'true',
    };
  return (
    <div>
      {location.pathname === '/register' && <Input
        datatestid="common_register__input-name"
        label="Nome"
        id="name-input-text"
        type="email"
        placeHolder="email@email.com"
      />}
      <Input
        datatestid={
          location.pathname === '/login'
            ? 'common_login__input-email' : 'common_register__input-email'
        }
        label="Login"
        id="login-input-text"
        type="email"
        placeHolder="email@email.com"
      />
      <Input
        datatestid={ location.pathname === '/login'
          ? 'common_login__input-password' : 'common_register__input-password' }
        label="Password"
        id="login-input-text"
        type="password"
        placeHolder="Password"
      />

      <Button { ...buttonOptions } />
    </div>
  );
}

export default Login;

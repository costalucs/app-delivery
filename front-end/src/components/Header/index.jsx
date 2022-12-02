import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Header() {
  const navigate = useHistory();
  // const getLocalStorage = () => {
  //   // const obj = localStorage.getItem(key);
  //   // return JSON.parse(obj);
  // };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate.push('/login');
  };

  console.log('oie');

  // const { name } = getLocalStorage('user');
  return (
    <header>
      <nav>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus Pedidos
        </Link>
      </nav>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        nome user
      </p>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ handleLogout }
      >
        Sair
      </Link>
    </header>
  );
}

export default Header;

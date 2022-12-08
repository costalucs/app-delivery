import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../context/Auth.context';

function Header() {
  const session = useSession();

  const { name } = session.user;
  return (
    <header>
      {/* <p>
        Olá,
        {' '}
        {name}
        !
      </p> */}
      <nav>
        <Link
          to="/customer/products"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link>
        {session.user.role === 'customer' && (

          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </Link>)}
      </nav>
      <p
        data-testid="customer_products__element-navbar-user-full-name"
      >
        Olá,
        {' '}
        {name}
        !
      </p>
      <Link
        to="/login"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => session.logout() }
      >
        Sair
      </Link>
    </header>
  );
}

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../context/Auth.context';
import './index.css';

function Header() {
  const session = useSession();

  const { name, role } = session.user;
  return (
    <header>
      <nav>
        <div className="nav_link products">
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>
        </div>
        <div className="nav_link orders">
          <Link
            to={ `/${role}/orders` }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </Link>
        </div>
      </nav>
      <div className="segunda_coluna">
        <div className="nav_link nome">
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            Olá,
            {' '}
            {name}
            !
          </p>
        </div>
        <div className="nav_link logout sair">
          <Link
            to="/login"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => session.logout() }
          >
            Sair
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;

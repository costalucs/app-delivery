import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function OrderCard({ sale, userRole = 'customer' }) {
  const { id, status, saleDate, address, totalPrice } = sale;

  return (
    <Link to={ `/${userRole}/orders/${id}` }>
      <div>
        <p
          data-testid={ `${userRole}_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}

        </p>
      </div>
      <div>
        <div>
          <p data-testid={ `${userRole}_orders__element-delivery-status-${id}` }>
            {status}
          </p>
          <div>
            <p data-testid={ `${userRole}_orders__element-order-date-${id}` }>
              {saleDate}
            </p>
            <p data-testid={ `${userRole}_orders__element-card-price-${id}` }>
              {totalPrice}
            </p>
          </div>
        </div>
        <div>
          <p
            data-testid={ `${userRole}_orders__element-card-address-${id}` }
          >
            {address}

          </p>
        </div>
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
  }).isRequired,
  userRole: PropTypes.string.isRequired,
};

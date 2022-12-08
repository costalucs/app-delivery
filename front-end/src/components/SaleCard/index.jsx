import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function SalesCard({ sale }) {
  const { id, status, saleDate, deliveryAddress, deliveryNumber, totalPrice } = sale;

  return (
    <Link to={ `/seller/order/${id}` }>
      <div>
        <p
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}

        </p>
      </div>
      <div>
        <div>
          <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
            {status}
          </p>
          <div>
            <p data-testid={ `seller_orders__element-order-date-${id}` }>
              {saleDate}
            </p>
            <p data-testid={ `seller_orders__element-card-price-${id}` }>
              {totalPrice}
            </p>
          </div>
        </div>
        <div>
          <p
            data-testid={ `seller_orders__element-card-address-${id}` }
          >
            {`${deliveryAddress}, ${deliveryNumber}`}

          </p>
        </div>
      </div>
    </Link>
  );
}

SalesCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    saleDate: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
    deliveryNumber: PropTypes.string.isRequired,
    totalPrice: PropTypes.string.isRequired,
  }).isRequired,
};

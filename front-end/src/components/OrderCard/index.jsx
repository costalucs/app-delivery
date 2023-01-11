import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.css';

export default function OrderCard({ sale, userRole = 'customer' }) {
  const { id, status, saleDate, address, totalPrice } = sale;

  const renderFirstColumn = () => (
    <div className="first_column__container">
      <div>
        <p
          data-testid={ `${userRole}_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}

        </p>
      </div>
    </div>
  );

  const renderStatusClassName = () => {
    if (status === 'Pendente') {
      return 'pendente';
    }
    if (status === 'Preparando') {
      return 'preparando';
    }
    if (status === 'Entregue') {
      return 'entregue';
    }
  };

  const renderSecondColumnFirstRow = () => (
    <div className="second_column_first_row__container">
      <div className={ `status_container ${renderStatusClassName()}` }>
        <div>
          <p data-testid={ `${userRole}_orders__element-delivery-status-${id}` }>
            {status}
          </p>
        </div>
      </div>
      <div className="data_container">
        <div>
          <p data-testid={ `${userRole}_orders__element-order-date-${id}` }>
            {saleDate}
          </p>
        </div>
        <div>
          <p data-testid={ `${userRole}_orders__element-card-price-${id}` }>
            R$
            {' '}
            {totalPrice}
          </p>
        </div>
      </div>
    </div>
  );

  const renderSecondColumnSecondRow = () => (
    <div className="address_container">
      <div>
        <p
          data-testid={ `${userRole}_orders__element-card-address-${id}` }
        >
          {address}
        </p>
      </div>
    </div>
  );

  const renderSecondColumn = () => (
    <div className="second_column__container">
      {
        renderSecondColumnFirstRow()
      }
      {
        renderSecondColumnSecondRow()
      }
    </div>
  );

  return (
    <Link
      className="order_card__container"
      to={ `/${userRole}/orders/${id}` }

    >
      {
        renderFirstColumn()
      }
      {
        renderSecondColumn()
      }

      <div />
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

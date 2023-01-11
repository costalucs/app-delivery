import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useCart } from '../../context/Cart.context';
import formatPrice from '../../helpers/mappers&formatters/formatPrice';
import { useSession } from '../../context/Auth.context';

function ProductTable({ product: { price, id, name, quantity }, index }) {
  const { removeItem } = useCart();
  const { pathname } = useLocation();
  const { user: { role } } = useSession();
  const page = pathname.includes('/checkout') ? 'checkout' : 'order_details';

  return (
    <tr key={ id }>
      <td
        className="item__text"
        data-testid={ `${role}_${page}__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td data-testid={ `${role}_${page}__element-order-table-name-${index}` }>
        {name}
      </td>
      <td
        data-testid={ `${role}_${page}__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `${role}_${page}__element-order-table-unit-price-${index}` }
      >
        R$
        {' '}
        {formatPrice(+price)}
      </td>
      <td
        data-testid={ `${role}_${page}__element-order-table-sub-total-${index}` }
      >
        R$
        {' '}
        {formatPrice(quantity * price)}
      </td>
      {pathname === '/customer/checkout' && (
        <td>
          <button
            data-testid={ `customer_checkout__element-order-table-remove-${index}` }
            type="button"
            onClick={ () => removeItem(id) }
          >
            Remover
          </button>
        </td>
      )}
    </tr>
  );
}

ProductTable.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductTable;

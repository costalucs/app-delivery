import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/Cart.context';

function ProductTable({ product: { price, id, name, quantity }, index }) {
  const { removeItem } = useCart();

  return (
    <tr key={ id }>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        {(+price).toFixed(2).replace(/\./, ',')}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {(quantity * price).toFixed(2).replace(/\./, ',')}
      </td>
      <td>
        <button
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          type="button"
          onClick={ () => removeItem(id) }
        >
          Remover
        </button>
      </td>
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

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/Cart.context';

function ProductCard({ id, name, price, urlImage }) {
  const [quantity, setQuantity] = useState(0);
  const cart = useCart();

  function addButon() {
    setQuantity(quantity + 1);
    // cart.addProduct({ id, name, price, quantity });
  }

  function removeButton() {
    if (quantity === 0) return setQuantity(0);
    setQuantity(quantity - 1);
    // cart.removeProduct({ id, name, price, quantity });
  }

  function changeValue({ target: { value } }) {
    setQuantity(value);
  }

  useEffect(() => {
    cart.handleQuantity({ id, name, price, quantity });
  }, [quantity]);

  return (
    <div>
      <div>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `R$ ${(price.replace(/\./, ','))}` }
        </span>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ `${name}` }
        />
      </div>
      <div>
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <button
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ removeButton }
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ quantity }
          onChange={ changeValue }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ addButon }
        >
          +
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = ({
  id: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  urlImage: PropTypes.string,
}).isRequired;

export default ProductCard;

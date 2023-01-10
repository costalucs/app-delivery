import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/Cart.context';
import './index.css';

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
    <div className="product_card_container">
      <span
        className="price_tag"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {`R$ ${(price.replace(/\./, ','))}`}
      </span>
      <div className="image_container">

        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ `${name}` }
        />
      </div>
      <div className="price_container">
        <div className="title">
          <p
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            {name}
          </p>
        </div>
        <div className="buttons_container">
          <button
            type="button"
            className="button sub"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ removeButton }
          >
            -
          </button>
          <input
            type="number"
            className="input_quantity"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            value={ quantity }
            onChange={ changeValue }
          />
          <button
            type="button"
            className="button add"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ addButon }
          >
            +
          </button>
        </div>
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

import PropTypes from 'prop-types';
import React from 'react';

function ProductCard({ id, name, price, urlImage }) {
  return (
    <div>
      <div>
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `R$ ${(price)}` }
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
        >
          -
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          style={ { appearance: 'textfield' } }
        />
        <button
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
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

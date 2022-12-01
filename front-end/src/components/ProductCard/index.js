import React from 'react';
import PropTypes from 'prop-types';

function ProductCard({ name, price, urlImage }) {
  return (
    <div data-testid="oi">
      <h1>
        {name}
      </h1>
      <p>{price}</p>
      <img alt={ name } src={ urlImage } />
    </div>
  );
}

ProductCard.propTypes = ({
  name: PropTypes.string,
  price: PropTypes.number,
  urlImage: PropTypes.string,
}).isRequired;

export default ProductCard;

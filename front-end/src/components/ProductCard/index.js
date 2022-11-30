import React from 'react';

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

export default ProductCard;

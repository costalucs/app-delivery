import PropTypes from 'prop-types';
import React, { createContext, useContext, useMemo, useRef, useState } from 'react';

const CartContext = createContext({});

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const fisrtRender = useRef(true);

  function handleSetQuantity({ id, name, price, quantity }) {
    if (fisrtRender.current) {
      fisrtRender.current = false;
      return;
    }

    const index = cart.findIndex((items) => items.id === id);
    if (index < 0) {
      return setCart([...cart, { id, name, price, quantity }]
        .filter((i) => i.quantity > 0));
    }

    const newCart = cart.map((item) => {
      if (item.id !== id) return item;
      return { id, name, price, quantity };
    }).filter((i) => i.quantity > 0);

    setCart(newCart);
  }

  const value = useMemo(
    () => ({
      cart,
      handleQuantity: handleSetQuantity,
    }),
    [cart],
  );

  return (
    <CartContext.Provider value={ value }>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => ({ ...useContext(CartContext) });

CartProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default CartProvider;

import PropTypes from 'prop-types';
import React, {
  createContext,
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';

const CartContext = createContext({});

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const fisrtRender = useRef(true);

  function calcCartTotalValue(checkoutCart) {
    let total = 0;

    if (!checkoutCart[0]) return setTotalValue(0);

    checkoutCart.forEach(({ price, quantity }) => {
      total += (price * quantity);
    });
    return setTotalValue(total);
  }

  useEffect(() => {
    calcCartTotalValue(cart);
  }, [cart]);

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

  function removeItem(id) {
    const newCart = cart.filter((item) => item.id !== id);
    return setCart(newCart);
  }

  const value = useMemo(
    () => ({
      cart,
      totalValue,
      handleQuantity: handleSetQuantity,
      calcCartTotalValue,
      removeItem,
    }),
    [cart, totalValue],
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

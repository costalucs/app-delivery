import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/Cart.context';
import { getProducts } from '../../helpers/api/products';

export default function Products() {
  const navigate = useHistory();
  const [items, setItems] = useState();
  const cart = useCart();
  const [cartValue, setCartValue] = useState(0);

  function calcCartTotalValue(checkoutCart) {
    let total = 0;

    if (!checkoutCart[0]) return setCartValue(0);

    checkoutCart.forEach(({ price, quantity }) => {
      total += (price * quantity);
    });
    return setCartValue(total);
  }

  useEffect(() => {
    calcCartTotalValue(cart.cart);
  }, [cart]);

  useEffect(() => {
    getProducts().then((data) => setItems(data));
  }, []);

  function checkoutButton() {
    navigate.push('/customer/checkout');
  }

  return (
    <>
      <Header />
      <div>
        {items?.map((i, index) => <ProductCard key={ index } { ...i } />)}
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__button-cart"
          onClick={ checkoutButton }
          disabled={ cartValue === 0 }
        >
          Carrinho:
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { `${cartValue.toFixed(2).replace(/\./, ',')}` }
          </span>
        </button>
      </div>

    </>
  );
}

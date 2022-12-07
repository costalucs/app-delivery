import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { useCart } from '../../context/Cart.context';
import { getProducts } from '../../helpers/api/products';

export default function Products() {
  const navigate = useHistory();
  const [items, setItems] = useState();
  const { totalValue } = useCart();

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
          disabled={ totalValue === 0 }
        >
          Carrinho:
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            { `${totalValue.toFixed(2).replace(/\./, ',')}` }
          </span>
        </button>
      </div>

    </>
  );
}

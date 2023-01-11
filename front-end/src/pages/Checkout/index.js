import React from 'react';
import FormCheckout from '../../components/FormCheckout';
import Header from '../../components/Header';
import ProductTable from '../../components/ProductTable';
import { useCart } from '../../context/Cart.context';
import formatPrice from '../../helpers/mappers&formatters/formatPrice';
import './index.css';

function Checkout() {
  const { totalValue, cart } = useCart();

  const renderProductsInCart = () => (
    <section>
      <div className="input-container-checkout first">
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
          <th>Remover Item</th>
        </tr>
        <tbody>
          {cart.map((p, i) => <ProductTable key={ p.id } product={ p } index={ i } />)}
        </tbody>
        <div
          className="total_price__info"
          data-testid="customer_checkout__element-order-total-price"
        >
          {`Total: R$ ${formatPrice(totalValue)}`}
        </div>
      </div>
    </section>
  );

  return (
    <div className="checkout-container">
      <Header />
      <div className="checkout__wrapper">
        {
          renderProductsInCart()
        }
        <FormCheckout />
      </div>
    </div>
  );
}

export default Checkout;

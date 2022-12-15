import React from 'react';
import FormCheckout from '../../components/FormCheckout';
import Header from '../../components/Header';
import ProductTable from '../../components/ProductTable';
import { useCart } from '../../context/Cart.context';
import formatPrice from '../../helpers/mappers&formatters/formatPrice';

function Checkout() {
  const { totalValue, cart } = useCart();

  return (
    <>
      <Header />
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
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Total: R$ ${formatPrice(totalValue)}`}
      </div>
      <FormCheckout />
    </>
  );
}

export default Checkout;

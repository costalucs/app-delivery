import React from 'react';
import Header from '../../components/Header';
import SaleCard from '../../components/OrderCard';
import { useSales } from '../../context/Orders.context';

function MyOrders() {
  const sales = useSales();
  return (
    <>
      <Header />
      <main>
        {sales.map((sale) => (
          <SaleCard key={ `sale-card-key-${sale.id}` } sale={ sale } />
        ))}
      </main>
    </>
  );
}

export default MyOrders;

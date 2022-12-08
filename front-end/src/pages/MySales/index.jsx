import React from 'react';
import Header from '../../components/Header';
import SaleCard from '../../components/SaleCard';
import { useSales } from '../../context/Seller.context';

function MySales() {
  const sales = useSales();
  console.log(sales);
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

export default MySales;

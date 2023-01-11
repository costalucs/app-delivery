import React from 'react';
import Header from '../../components/Header';
import SaleCard from '../../components/OrderCard';
import { useSession } from '../../context/Auth.context';
import { useOrders } from '../../context/Orders.context';
import './index.css';

function MyOrders() {
  const { orders } = useOrders();
  const session = useSession();
  return (
    <>
      <Header />
      <main className="orders_list__wrapper">
        {(session && session.user && session.user.id) && (orders.length
          ? orders.map((sale) => (
            <SaleCard
              key={ `sale-card-key-${sale.id}` }
              sale={ sale }
              userRole={ session.user.role }
            />
          ))
          : null)}
      </main>
    </>
  );
}

export default MyOrders;

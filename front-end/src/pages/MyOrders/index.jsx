import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import SaleCard from '../../components/OrderCard';
import { useSession } from '../../context/Auth.context';
import { useOrders } from '../../context/Orders.context';

function MyOrders() {
  const sales = useOrders();
  const session = useSession();
  return (
    <>
      {(!session || !session.user) && <Redirect to="/login" />}
      <Header />
      <main>
        {sales.length
          && sales.map((sale) => {
            if (session.user.role === 'seller') {
              return (
                <SaleCard
                  key={ `sale-card-key-${sale.id}` }
                  sale={ sale }
                  userRole="seller"
                />
              );
            }
            return (
              <SaleCard
                key={ `sale-card-key-${sale.id}` }
                sale={ sale }
              />
            );
          })}
      </main>
    </>
  );
}

export default MyOrders;

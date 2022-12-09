import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useOrders } from '../../context/Orders.context';
import { useSession } from '../../context/Auth.context';
import ProductTable from '../../components/ProductTable';
import Header from '../../components/Header';

function OrderDetails() {
  const {
    params: { id },
  } = useRouteMatch();
  const { orders } = useOrders();
  const {
    user: { role },
  } = useSession();

  const [myOrder, setMyOrder] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (orders.length > 0 && (role === 'customer' || role === 'seller')) {
      const found = orders.find((order) => order.id === Number(id));
      setMyOrder(found);
      setLoaded(true);
    }
  }, [id, orders, role]);

  const ORDER_TESTID = `${role}_order_details__element-order-details-label-order-id`;
  const DATE_TESTID = `${role}-order_details__element-order-details-label-order-date`;
  const STS_TESTID = `${role}-order-details__element-order-details-label-delivery-status`;
  const TOTAL_TESTID = `${role}_order_details__element-order-total-price`;
  return (
    <>
      <Header />
      {loaded && (
        <main>
          <h2>Detalhes do pedido</h2>
          <section>
            <div>
              <p
                data-testid={ ORDER_TESTID }
              >
                {myOrder.id || ''}
              </p>
              {role !== 'seller' && <p>{myOrder.seller.name}</p>}
              <p
                data-testid={ DATE_TESTID }
              >
                {myOrder.date}
              </p>
              <p
                data-testid={ STS_TESTID }
              >
                {myOrder.status}
              </p>
              {/* if seller -> btn preparar + btn saiu para entrega */}
              {/* if customer -> btn marcar como entregue */}
            </div>
            <tbody>
              {myOrder.products.map(
                (p, i) => <ProductTable key={ p.id } product={ p } index={ i } />,
              )}
            </tbody>
            <div
              data-testid={ TOTAL_TESTID }
            >
              {`Total: R$ ${myOrder.totalPrice}`}
            </div>
          </section>
        </main>
      )}
    </>
  );
}

export default OrderDetails;

import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useOrders } from '../../context/Orders.context';
import { useSession } from '../../context/Auth.context';
import Header from '../../components/Header';

function OrderDetails() {
  const { params: { id } } = useRouteMatch();
  const { orders } = useOrders();
  const { user: { role } } = useSession();
  const myOrder = orders.find((order) => order.id === id);
  console.log(myOrder);
  return (
    <>
      <Header />
      <main>
        <h2>Detalhes do pedido</h2>
        <section>
          <div>
            <p data-testid={ `` }>{myOrder.id}</p>
            {/* if customer -> seller_id */}
            {/* data */}
            {/* status */}
            {/* id seller -> btn preparar + btn saiu para entrega */}
            {/* if customer -> btn marcar como entregue */}
          </div>
          <div>
            tabela de pedidos
            item(index) | descrição(nome do produto) | quantidade | v. unitário | subtotal
            - item 1
            - item 2
          </div>
          <span>float bottom right - total value</span>
        </section>
      </main>

    </>
  );
}

export default OrderDetails;

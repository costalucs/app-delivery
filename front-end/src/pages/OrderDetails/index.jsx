import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useOrders } from '../../context/Orders.context';
import { useSession } from '../../context/Auth.context';
import ProductTable from '../../components/ProductTable';
import Header from '../../components/Header';
import './index.css';

function OrderDetails() {
  const { params: { id } } = useRouteMatch();
  const { orders, refresh, updateOrder } = useOrders();
  const { user: { role }, token } = useSession();

  const [myOrder, setMyOrder] = useState({});
  const [loaded, setLoaded] = useState(false);

  const [cantDispatch, setCantDispatch] = useState(true);
  const [cantPrepare, setCantPrep] = useState(true);
  const [cantDeliver, setCantDlv] = useState(true);

  useEffect(() => { setCantPrep(myOrder.status !== 'Pendente'); }, [myOrder]);
  useEffect(() => { setCantDispatch(myOrder.status !== 'Preparando'); }, [myOrder]);
  useEffect(() => { setCantDlv(myOrder.status !== 'Em Trânsito'); }, [myOrder]);

  useEffect(() => {
    if (orders.length > 0 && (role === 'customer' || role === 'seller')) {
      const found = orders.find((order) => order.id === Number(id));
      console.log(found);
      setMyOrder(found);
      setLoaded(true);
    }
  }, [id, orders, role]);

  const ORDER_TID = `${role}_order_details__element-order-details-label-order-id`;
  const DATE_TID = `${role}_order_details__element-order-details-label-order-date`;
  const SATUS_TID = `${role}_order_details__element-order-details-label-delivery-status`;
  const TOTAL_TID = `${role}_order_details__element-order-total-price`;
  const SEL_NAM_TID = 'customer_order_details__element-order-details-label-seller-name';
  const CUS_BTN_TID = 'customer_order_details__button-delivery-check';
  const SEL_PRE_TID = 'seller_order_details__button-preparing-check';
  const SEL_DIP_TID = 'seller_order_details__button-dispatch-check';

  async function handleDlvCk(e) {
    e.preventDefault();
    await updateOrder(id, token, 'Entregue');
    await refresh();
  }

  async function handlePrep(e) {
    e.preventDefault();
    await updateOrder(id, token, 'Preparando');
    await refresh();
  }

  async function handleTraf(e) {
    e.preventDefault();
    await updateOrder(id, token, 'Em Trânsito');
    await refresh();
  }

  const renderStatusClassName = (status) => {
    if (status === 'Pendente') {
      return 'pendente';
    }
    if (status === 'Preparando') {
      return 'preparando';
    }
    if (status === 'Entregue') {
      return 'entregue';
    }
  };

  return (
    <>
      <Header />
      {loaded ? (
        <main className="order_details__wrapper">
          <div>
            <h2>Detalhes do pedido</h2>
            <section className="order_details">
              <div className="table_row_header">
                <p data-testid={ ORDER_TID }>{` PEDIDO ${myOrder.id}`}</p>
                {role !== 'seller' && (
                  <p data-testid={ SEL_NAM_TID }>{`VENDEDOR: ${myOrder.seller.name}`}</p>
                )}
                <p
                  data-testid={ DATE_TID }
                  className="date_value"
                >
                  { `REALIZADO EM: ${myOrder.saleDate}` }

                </p>
                <p
                  data-testid={ SATUS_TID }
                  className={ `status_column ${renderStatusClassName(myOrder.status)}` }
                >
                  {myOrder.status}

                </p>
                {role === 'customer' && (
                  <button
                    data-testid={ CUS_BTN_TID }
                    type="button"
                    onClick={ handleDlvCk }
                    disabled={ cantDeliver }
                  >
                    Marcar como entregue
                  </button>
                )}
                {role === 'seller' && (
                  <>
                    <button
                      data-testid={ SEL_PRE_TID }
                      type="button"
                      onClick={ handlePrep }
                      disabled={ cantPrepare }
                    >
                      PREPARAR PEDIDO
                    </button>
                    <button
                      data-testid={ SEL_DIP_TID }
                      type="button"
                      onClick={ handleTraf }
                      disabled={ cantDispatch }
                    >
                      SAIU PARA ENTREGA
                    </button>
                  </>
                )}
              </div>
              <thead>
                <th>Item</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Valor Unitário</th>
                <th>Sub-total</th>
              </thead>
              <tbody className="details">
                {myOrder.products.map(
                  (p, i) => <ProductTable key={ p.id } product={ p } index={ i } />,
                )}
              </tbody>
              <div className="total_value" data-testid={ TOTAL_TID }>
                <div />
                <div />
                <div />
                <div />
                <div>{`Total: R$ ${myOrder.totalPrice}`}</div>
              </div>
            </section>
          </div>
        </main>
      ) : <p>loading component</p>}
    </>
  );
}

export default OrderDetails;

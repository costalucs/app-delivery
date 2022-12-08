import { createContext, useContext, useState, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSession } from './Auth.context';
import getMyOrders from '../helpers/api/orders';

const ordersContext = createContext({});

export default function OrdersProvider({ children }) {
  const session = useSession();
  const [orders, setOrders] = useState([]);
  const firstRender = useRef(true);

  async function fillSales() {
    if (firstRender.current) {
      firstRender.current = false;
    } else if (session.user && session.user.id) {
      const response = await getMyOrders(session.token);
      setOrders(response);
    } else {
      setOrders([]);
    }
  }

  useEffect(() => {
    fillSales();
  }, []);

  useEffect(() => {
    fillSales();
  }, [session, orders]);

  const value = useMemo(() => {
    if (session.user) {
      return {
        orders,
      };
    }
    return {};
  }, [session.user, orders]);

  return (
    <ordersContext.Provider value={ value }>
      {children}
    </ordersContext.Provider>
  );
}

OrdersProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useOrders = async () => ({ ...await useContext(ordersContext).orders });

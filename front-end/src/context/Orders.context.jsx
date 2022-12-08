import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession } from './Auth.context';
import getMyOrders from '../helpers/api/orders';

const ordersContext = createContext({});

export default function OrdersProvider({ children }) {
  const session = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fillSales() {
      if (session.user) {
        const response = await getMyOrders(session.token);
        setOrders(response);
      } else {
        setOrders([]);
      }
    }
    fillSales();
  }, [session]);

  const value = useMemo(() => {
    if (session.user) {
      return orders;
    }
    return [];
  }, [session, orders]);

  return (
    <ordersContext.Provider value={ value }>
      {children}
    </ordersContext.Provider>
  );
}

OrdersProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useOrders = () => ({ ...useContext(ordersContext).sales });

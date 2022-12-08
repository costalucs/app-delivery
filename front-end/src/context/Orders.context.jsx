import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { getMyOrders } from '../helpers/api/sales';
import { useSession } from './Auth.context';

const ordersContext = createContext({
  orders: [],
});

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState('null');
  const { token: sessionToken } = useSession();

  async function fillSales() {
    if (token !== 'null') {
      const response = await getMyOrders(token);
      setOrders(response);
    }
  }

  useEffect(() => {
    if (token !== 'null') {
      fillSales();
    }
  }, [token]);

  useEffect(() => {
    if (sessionToken !== undefined) {
      setToken(sessionToken);
    }
  }, [sessionToken]);

  const value = useMemo(() => ({
    orders,
    refresh: async () => { await fillSales(); },
  }), [sessionToken, orders]);

  return (
    <ordersContext.Provider value={ value }>{children}</ordersContext.Provider>
  );
}

OrdersProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useOrders = () => ({
  ...useContext(ordersContext),
});

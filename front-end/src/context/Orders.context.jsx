import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
  // useRef,
} from 'react';
import PropTypes from 'prop-types';
import getMyOrders from '../helpers/api/orders';
import { useSession } from './Auth.context';

const ordersContext = createContext({
  orders: [],
});

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const firstRender = useRef(true);
  const { token } = useSession();

  async function fillSales() {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (token) {
      const response = await getMyOrders(token);
      setOrders(response);
    }
  }

  useEffect(() => {
    fillSales();
  }, [firstRender, token]);

  const value = useMemo(() => ({ orders }), [orders, token, firstRender]);

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

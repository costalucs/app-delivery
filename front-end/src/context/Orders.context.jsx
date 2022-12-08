import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  // useRef,
} from 'react';
import PropTypes from 'prop-types';
import getMyOrders from '../helpers/api/orders';

const ordersContext = createContext({
  orders: [],
});

export default function OrdersProvider({ children }) {
  const [orders, setOrders] = useState([]);

  async function fillSales() {
    const response = await getMyOrders(localStorage.getItem('token'));
    setOrders(response);
  }

  useEffect(() => {
    fillSales();
  }, []);

  const value = useMemo(() => ({ orders }), [orders]);

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

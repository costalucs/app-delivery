import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession } from './Auth.context';
import { getMyOrders, getMySales } from '../helpers/api/sales';

const sellerContext = createContext({});

export default function SellerProvider({ children }) {
  const session = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const { user: { role } } = session;
    async function fillSales() {
      if (role === 'customers') {
        const response = await getMyOrders(session.token);
        setOrders(response);
      } else if (role === 'seller') {
        const response = await getMySales(session.token);
        setOrders(response);
      } else {
        setOrders([]);
      }
    }
    fillSales();
  }, [session]);

  const value = useMemo(() => {
    if (session.user.role) {
      return orders;
    }
    return [];
  }, [session, orders]);

  return (
    <sellerContext.Provider value={ value }>
      {children}
    </sellerContext.Provider>
  );
}

SellerProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export const useSales = () => ({ ...useContext(sellerContext).sales });

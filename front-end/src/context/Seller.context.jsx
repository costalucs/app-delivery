import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSession } from './Auth.context';
import { getMySales } from '../helpers/api/sales';

const sellerContext = createContext({});

export default function SellerProvider({ children }) {
  const session = useSession();
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fillSales() {
      const response = await getMySales(session.token);
      setSales(response);
      console.log(response);
    }
    fillSales();
  }, []);

  const value = useMemo(() => {
    if (session.user.role === 'seller') {
      return { sales };
    }
    return {};
  }, [session, sales]);

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

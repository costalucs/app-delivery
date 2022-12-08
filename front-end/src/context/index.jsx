import PropTypes from 'prop-types';
import AuthProvider from './Auth.context';
import CartProvider from './Cart.context';
// import OrdersProvider from './Orders.context';

function AppContext({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        {/* <OrdersProvider> */}
        {children}
        {/* </OrdersProvider> */}
      </CartProvider>
    </AuthProvider>
  );
}

AppContext.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppContext;

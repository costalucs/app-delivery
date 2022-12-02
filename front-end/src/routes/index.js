import { Route, Routes, Navigate } from 'react-router-dom';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import MyOrders from '../pages/MyOrders';
import OrderDetails from '../pages/OrderDetails';
import Products from '../pages/Products';

export default function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to="/login" /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Login /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders/" element={ <MyOrders /> } />
      <Route path="/seller/orders/" element={ <MyOrders /> } />
      <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route path="/seller/orders/:id" element={ <OrderDetails /> } />
    </Routes>
  );
}

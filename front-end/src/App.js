import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import SellerProvider from './context/Seller.context';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import MySales from './pages/MySales';
import OrderDetails from './pages/OrderDetails';
import Products from './pages/Products';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ Login } />
        <Route exact path="/customer/products" component={ Products } />
        <Route exact path="/customer/checkout" component={ Checkout } />
        {/* <Route exact path="/customer/orders/" component={ MyOrders } /> */}
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/seller/orders/:id" component={ OrderDetails } />
      </Switch>
      <SellerProvider>
        <Switch>
          <Route exact path="/seller/orders/" component={ MySales } />
        </Switch>
      </SellerProvider>
    </>
  );
}

export default App;

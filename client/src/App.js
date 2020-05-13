import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import { ProductsProvider } from './context/Products/ProductsContext';

import { CartProvider } from './context/Cart/CartContext';

import Navbar from './components/Navbar/Navbar';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductPage from './components/Products/ProductPage';
import Login from './components/Login/Login';
import SignUp from './components/Login/SignUp';
import { UsersProvider } from './context/Users/UsersContext';

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <UsersProvider>
          <Router>
            <>
              <Navbar />

              <Switch>
                <Route exact path="/" component={Products} />

                <Route exact path="/cart" component={Cart} />

                <Route exact path="/products/:id" component={ProductPage} />

                <Route exact path="/login" component={Login} />

                <Route exact path="/signup" component={SignUp} />
              </Switch>
            </>
          </Router>
        </UsersProvider>
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;

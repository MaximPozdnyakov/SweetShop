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

function App() {
  return (
    <CartProvider>
      <ProductsProvider>
        <Router>
          <>
            <Navbar />

            <Switch>
              <Route exact path="/" component={Products} />

              <Route exact path="/cart" component={Cart} />

              <Route exact path="/products/:id" component={ProductPage} />

              <Route exact path="/login" component={Login} />
            </Switch>
          </>
        </Router>
      </ProductsProvider>
    </CartProvider>
  );
}

export default App;

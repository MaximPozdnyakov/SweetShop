import React, { useContext } from 'react';

import ListOfCartItems from './ListOfCartItems';
import Total from './Total';

import { CartContext } from '../../context/Cart/CartContext';

import Loader from 'react-loader-spinner';

function Cart() {
  const { isCartLoaded } = useContext(CartContext);

  return (
    <>
      {!isCartLoaded ? (
        <div
          className="container justify-content-center d-flex align-items-center"
          style={{ height: '80vh' }}
        >
          <Loader type="Oval" color="#00BFFF" height={200} width={200} />
        </div>
      ) : (
        <div style={{ background: '#F7F8F9' }}>
          <h1>My Cart</h1>
          <section className="container d-flex justify-content-between">
            <ListOfCartItems />
            <Total />
          </section>
        </div>
      )}
    </>
  );
}

export default Cart;

import React, { useContext } from 'react';

import { CartContext } from '../../context/Cart/CartContext';

function Total() {
  const { cartItems } = useContext(CartContext);

  const numOfProductsInCart = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div
      className="border p-5 text-center mx-auto col-xl-4 col-md-6"
      style={{ height: 'min-content' }}
    >
      <div className="d-flex justify-content-between mb-5">
        <h4 className="font-weight-bold">Total</h4>
        <div>
          <h4 className="font-weight-bold text-right">$ {total}</h4>
          <h5 className="">{numOfProductsInCart} Products</h5>
        </div>
      </div>
      <a className="btn btn-success btn-lg text-white btn-block font-weight-bold">
        BUY NOW
      </a>
    </div>
  );
}

export default Total;

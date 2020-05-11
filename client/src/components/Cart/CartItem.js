import React, { useState, useContext } from 'react';

import { CartContext } from '../../context/Cart/CartContext';
import QuantityOfItem from './QuantityOfItem';

function CartItem(props) {
  const { id, title, price, srcToImg } = props;

  const { deleteItemById, updateQuantityOfItemById } = useContext(CartContext);

  return (
    <div className="row d-flex justify-content-between align-items-center mb-3">
      <div className="col-md-2 col-sm-2 col-3 d-flex justify-content-start px-0">
        <img
          src={srcToImg}
          style={{ width: '100px', height: '100px' }}
          alt="..."
        />
      </div>
      <div className="col-md-10 col-sm-10 col-9 row">
        <div className="col-md-8 col-sm-8 col-12 row">
          <div className="col-md-7 col-12 d-flex justify-content-md-center justify-content-start">
            <h4 style={{ whiteSpace: 'nowrap' }}>{title}</h4>
          </div>
          <div className="col-md-5 col-12 d-flex justify-content-md-center justify-content-start">
            <h4 className="text-success">$ {price}</h4>
          </div>
        </div>
        <div className="col-md-4 col-sm-5 col-12 ml-1 ml-sm-0 row">
          <div className="col-6 d-flex justify-content-center">
            <QuantityOfItem id={id} key={id} />
          </div>
          <div className="col-6 mt-1 d-flex justify-content-center">
            <i
              className="fas fa-times text-primary"
              onClick={() => {
                updateQuantityOfItemById(id, 0);
                deleteItemById(id);
              }}
              style={{ fontSize: '26px' }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;

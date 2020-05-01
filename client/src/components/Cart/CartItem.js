import React, { useState, useContext } from 'react';

import { CartContext } from '../../context/Cart/CartContext';
import QuantityOfItem from './QuantityOfItem';

function CartItem(props) {
  const { id, title, price, srcToImg } = props;

  const { deleteItemById, updateQuantityOfItemById } = useContext(CartContext);

  return (
    <tr>
      <th scope="row">
        <img
          src={srcToImg}
          className="mr-3"
          style={{ width: '100px', height: '100px' }}
          alt="..."
        />
      </th>
      <td>
        <h4 style={{ whiteSpace: 'nowrap' }}>{title}</h4>
      </td>
      <td>
        <h4 className="text-success">$ {price}</h4>
      </td>
      <td>
        <QuantityOfItem id={id} key={id} />
      </td>
      <td>
        <a
          className="btn btn-danger text-white"
          onClick={() => {
            updateQuantityOfItemById(id, 0);
            deleteItemById(id);
          }}
        >
          DELETE
        </a>
      </td>
    </tr>
  );
}

export default CartItem;

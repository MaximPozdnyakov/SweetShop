import React, { useState, useContext } from 'react';

import { CartContext } from '../../context/Cart/CartContext';

function CartItem(props) {
  const { id, title, price, srcToImg, quantity } = props;

  const [state, setState] = useState(quantity);

  const { updateQuantityOfItemById, deleteItemById } = useContext(CartContext);

  return (
    <tr>
      <th scope="row">
        <img
          src={srcToImg}
          className="mr-3"
          style={{ width: '100px' }}
          alt="..."
        />
      </th>
      <td>
        <h2>{title}</h2>
      </td>
      <td>
        <h2 className="text-success">{price}</h2>
      </td>
      <td>
        <div className="form-group">
          <input
            type="text"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              updateQuantityOfItemById(id, e.target.value);
            }}
          ></input>
        </div>
      </td>
      <td>
        <a
          className="btn btn-danger text-white"
          onClick={() => {
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

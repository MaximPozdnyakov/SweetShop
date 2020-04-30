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
        <h4 style={{ whiteSpace: 'nowrap' }}>{title}</h4>
      </td>
      <td>
        <h4 className="text-success">$ {price}</h4>
      </td>
      <td>
        <div className="form-group">
          <select
            className="form-control custom-select"
            id="exampleFormControlSelect1"
            style={{ width: 'max-content' }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option>10+</option>
          </select>
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

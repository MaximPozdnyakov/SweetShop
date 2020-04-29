import React, { useContext } from 'react';

import { CartContext } from '../../context/Cart/CartContext';

import CartItem from './CartItem';

export default function ListOfCardItems() {
  const { cartItems, isCartLoaded } = useContext(CartContext);
  console.log(cartItems);

  let cartItemsComponents = cartItems.map((item) => (
    <CartItem
      id={item._id}
      title={item.title}
      price={item.price}
      srcToImg={item.srcToImg}
      quantity={item.quantity}
      key={item._id}
    />
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{cartItemsComponents}</tbody>
    </table>
  );
}

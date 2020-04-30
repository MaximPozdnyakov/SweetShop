import React, { useContext } from 'react';

import { CartContext } from '../../context/Cart/CartContext';

import CartItem from './CartItem';

export default function ListOfCardItems() {
  const { cartItems } = useContext(CartContext);

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
    <table className="table table-borderless col-8">
      <tbody>{cartItemsComponents}</tbody>
    </table>
  );
}

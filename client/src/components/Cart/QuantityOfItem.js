import React, { useState, useContext } from "react";

import { CartContext } from "../../context/Cart/CartContext";

function QuantityOfItem(props) {
  const id = props.id;

  const { updateQuantityOfItemById, cartItems } = useContext(CartContext);

  const [quantity, setQuantity] = useState(
    cartItems.filter((item) => item._id === id)[0].quantity
  );

  return (
    <div className="">
      {quantity > 9 ? (
        <input
          type="text"
          value={quantity}
          onChange={(e) => {
            setQuantity(Number(e.target.value));
          }}
          onBlur={() => {
            updateQuantityOfItemById(id, quantity);
          }}
          autoFocus={true}
          className="form-control "
        />
      ) : (
        <select
          className="form-control custom-select"
          id="exampleFormControlSelect1"
          style={{ width: "max-content" }}
          value={quantity}
          onChange={(e) => {
            const selectedIndex = e.target.options.selectedIndex + 1;

            setQuantity(selectedIndex);
            updateQuantityOfItemById(id, selectedIndex);
          }}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option>10+</option>
        </select>
      )}
    </div>
  );
}

export default QuantityOfItem;

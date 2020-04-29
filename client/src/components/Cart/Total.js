import React, { useContext } from "react";

import { CartContext } from "../../context/Cart/CartContext";

function Total() {
    const { cartItems } = useContext(CartContext);

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div>
            <h2>{total}</h2>
            <a href="/cart" className="btn btn-success">
                Buy
            </a>
        </div>
    );
}

export default Total;

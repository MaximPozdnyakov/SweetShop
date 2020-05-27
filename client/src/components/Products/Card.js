import React, { useContext, useState, useEffect } from "react";

import { CartContext } from "../../context/Cart/CartContext";

import { Link } from "react-router-dom";

function Card(props) {
  const { cartItems, addItem, deleteItemById } = useContext(CartContext);

  const [cartItem, setCartItem] = useState(
    cartItems.find((item) => item.productId === props._id)
  );

  useEffect(() => {
    setCartItem(cartItems.find((item) => item.productId === props._id));
  }, [cartItems]);

  return (
    <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-4">
      <Link to={`/products/${props._id}`} className="text-decoration-none">
        <div className="card" className="mx-auto" style={{ width: "250px" }}>
          <img
            src={props.srcToImg}
            className="card-img-top"
            style={{ height: "250px", width: "250px" }}
            alt="..."
          />
          <button
            className="btn btn-primary"
            style={{
              position: "relative",
              left: "198px",
              bottom: "38px",
            }}
            onClick={(e) => {
              e.preventDefault();
              cartItem
                ? deleteItemById(cartItem._id)
                : addItem({
                    productId: props._id,
                    title: props.title,
                    price: props.price,
                    srcToImg: props.srcToImg,
                  });
            }}
          >
            {cartItem ? (
              <i className="fas fa-check"></i>
            ) : (
              <i className="fas fa-cart-plus"></i>
            )}
          </button>
          <div
            className="card-body d-flex justify-content-between"
            style={{
              position: "relative",
              bottom: "30px",
            }}
          >
            <h5 className="card-title">{props.title}</h5>
            <span className="text-success font-weight-bold">
              ${props.price}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card;

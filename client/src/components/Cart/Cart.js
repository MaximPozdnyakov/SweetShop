import React, { useContext } from "react";

import ListOfCartItems from "./ListOfCartItems";
import Total from "./Total";

import { CartContext } from "../../context/Cart/CartContext";

import Loader from "react-loader-spinner";

function Cart() {
  const { isCartLoaded, cartItems } = useContext(CartContext);

  return (
    <>
      {!isCartLoaded ? (
        <div
          className="container justify-content-center d-flex align-items-center"
          style={{ height: "80vh" }}
        >
          <Loader type="Oval" color="#00BFFF" height={200} width={200} />
        </div>
      ) : (
        <div className="px-3">
          {!cartItems.length ? (
            <h1 className="m-sm-5 mx-3 my-5 font-weight-bold">
              Your Cart Is Empty
            </h1>
          ) : (
            <>
              <h1 className="m-sm-5 m-3 font-weight-bold">Your Cart</h1>
              <section className="mx-sm-5 m-3 row">
                <ListOfCartItems />
                <Total />
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;

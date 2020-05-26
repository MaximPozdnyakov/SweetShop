import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import CartReducer from "./CartReducer";

export const CartContext = createContext();

export function CartProvider(props) {
  const [cartState, dispatch] = useReducer(CartReducer, {
    isCartLoaded: false,
    cartItems: [],
  });

  const { isCartLoaded, cartItems } = cartState;

  useEffect(() => {
    getCartItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getCartItems() {
    try {
      const cartItems = await axios.get("/api/cart");
      console.log(
        cartItems.data.filter(
          (cartItem) => cartItem.ownerId === localStorage.getItem("token")
        )
      );
      dispatch({
        type: "GET_ITEMS",
        payload: cartItems.data.filter(
          (cartItem) => cartItem.ownerId === localStorage.getItem("token")
        ),
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteItemById(id) {
    try {
      await axios.delete(`/api/cart/${id}`);
      dispatch({
        type: "DELETE_ITEM_BY_ID",
        payload: id,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function updateQuantityOfItemById(id, quantity) {
    try {
      await axios.put(`/api/cart/${id}`, { quantity });
      dispatch({
        type: "UPDATE_QUANTITY_OF_ITEM_BY_ID",
        payload: { id, quantity },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function addItem(product) {
    try {
      await axios.post(`/api/cart/`, {
        productId: product._id,
        title: product.title,
        price: product.price,
        srcToImg: product.srcToImg,
        ownerId: localStorage.getItem("token"),
      });
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: product._id,
          title: product.title,
          price: product.price,
          srcToImg: product.srcToImg,
          ownerId: localStorage.getItem("token"),
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        deleteItemById,
        updateQuantityOfItemById,
        addItem,
        isCartLoaded,
        getCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

import React, { createContext, useEffect, useReducer } from "react";
import CartReducer from "./CartReducer";
import axios from "axios";

export const CartContext = createContext();

export function CartProvider(props) {
    const [cartItems, dispatch] = useReducer(CartReducer, []);

    console.log(cartItems);

    useEffect(() => {
        getCartItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getCartItems() {
        const cartItems = await axios.get("/api/cart");
        dispatch({
            type: "GET_ALL_ITEMS",
            payload: cartItems.data,
        });
    }

    async function deleteItemById(id) {
        await axios.delete(`/api/cart/${id}`);
        dispatch({
            type: "DELETE_ITEM_BY_id",
            payload: id,
        });
    }

    async function updateQuantityOfItemById(id, quantity) {
        await axios.put(`/api/cart/${id}`, { quantity });
        dispatch({
            type: "UPDATE_QUANTITY_OF_ITEM_BY_ID",
            payload: { id, quantity },
        });
    }

    async function addItem(product) {
        await axios.post(`/api/cart/`, {
            title: product.title,
            price: product.price,
            srcToImg: product.srcToImg,
        });
        dispatch({
            type: "ADD_ITEM",
            payload: {
                title: product.title,
                price: product.price,
                srcToImg: product.srcToImg,
            },
        });
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                deleteItemById,
                updateQuantityOfItemById,
                addItem,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}

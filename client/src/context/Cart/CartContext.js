import React, { createContext, useReducer, useContext } from "react";
import axios from "axios";
import CartReducer from "./CartReducer";
import { UsersContext } from "../Users/UsersContext";

export const CartContext = createContext();

export function CartProvider(props) {
    const { user } = useContext(UsersContext);

    const [cartState, dispatch] = useReducer(CartReducer, {
        isCartLoaded: false,
        isQuantityLoaded: true,
        cartItems: [],
    });

    const { isCartLoaded, cartItems, isQuantityLoaded } = cartState;

    async function getCartItems() {
        let userId;
        if (Object.keys(user).length !== 0) {
            userId = user._id;
        } else {
            userId = localStorage.getItem("guest");
        }
        try {
            const cartItems = await axios.post("/api/cart", { userId });
            dispatch({
                type: "GET_ITEMS",
                payload: cartItems.data,
            });
        } catch (err) {
            console.log(err);
        }
        dispatch({
            type: "CART_LOADED",
        });
    }

    async function deleteItemById(id) {
        let userId;
        if (Object.keys(user).length !== 0) {
            userId = user._id;
        } else {
            userId = localStorage.getItem("guest");
        }
        try {
            console.log("userId", userId);
            await axios.delete(`/api/cart/${id}`, { data: { userId } });
            dispatch({
                type: "DELETE_ITEM_BY_ID",
                payload: id,
            });
        } catch (err) {
            console.log(err);
        }
        dispatch({
            type: "CART_LOADED",
        });
    }

    async function deleteItemsByOwner() {
        let userId;
        if (Object.keys(user).length !== 0) {
            userId = user._id;
        } else {
            userId = localStorage.getItem("guest");
        }
        dispatch({
            type: "CART_NOT_LOADED",
        });
        try {
            await axios.delete(`/api/cart/owner`, { data: { userId } });
            dispatch({
                type: "DELETE_ITEM_BY_OWNER",
            });
        } catch (err) {
            console.log(err);
        }
        dispatch({
            type: "CART_LOADED",
        });
    }

    async function updateQuantityOfItem(id, quantity) {
        let userId;
        if (Object.keys(user).length !== 0) {
            userId = user._id;
        } else {
            userId = localStorage.getItem("guest", { userId });
        }
        try {
            await axios.put(`/api/cart/${id}`, { quantity });
            dispatch({
                type: "UPDATE_QUANTITY_OF_ITEM",
                payload: { id, quantity },
            });
        } catch (err) {
            console.log(err);
        }
    }

    async function addItem({ productId }) {
        let userId;
        if (Object.keys(user).length !== 0) {
            userId = user._id;
        } else {
            userId = localStorage.getItem("guest");
        }
        try {
            const item = await axios.post(`/api/cart/store`, {
                productId,
                quantity: 1,
                userId,
            });
            dispatch({
                type: "ADD_ITEM",
                payload: {
                    _id: item.data._id,
                    productId: item.data.productId,
                    ownerId: item.data.ownerId,
                    quantity: item.data.quantity,
                },
            });
        } catch (err) {
            console.log(err);
        }
        dispatch({
            type: "CART_LOADED",
        });
    }

    const cartNotLoaded = () => {
        dispatch({
            type: "CART_NOT_LOADED",
        });
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                deleteItemById,
                updateQuantityOfItem,
                addItem,
                isCartLoaded,
                getCartItems,
                deleteItemsByOwner,
                isQuantityLoaded,
                cartNotLoaded,
            }}
        >
            {props.children}
        </CartContext.Provider>
    );
}

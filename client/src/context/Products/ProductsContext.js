import React, { createContext, useReducer } from "react";
import ProductsReducer from "./ProductsReducer";
import axios from "axios";

export const ProductsContext = createContext();

export function ProductsProvider(props) {
    const [productsState, dispatch] = useReducer(ProductsReducer, {
        products: [],
        isProductsLoaded: false,
    });

    const { products, isProductsLoaded } = productsState;

    function getProducts() {
        axios
            .get("/api/products")
            .then((res) => {
                dispatch({
                    type: "GET_ALL_PRODUCTS",
                    payload: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <ProductsContext.Provider
            value={{
                getProducts,
                products,
                isProductsLoaded,
            }}
        >
            {props.children}
        </ProductsContext.Provider>
    );
}

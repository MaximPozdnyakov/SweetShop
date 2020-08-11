import React, { useContext } from "react";
import { v4 as uuid } from "uuid";

import { CartContext } from "../../context/Cart/CartContext";

import CartItem from "./CartItem";
import { ProductsContext } from "../../context/Products/ProductsContext";

export default function ListOfCardItems() {
    const { cartItems } = useContext(CartContext);
    const { products } = useContext(ProductsContext);

    let cartItemsComponents = cartItems.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        return (
            <CartItem
                id={item._id}
                title={product.title}
                category={product.category}
                price={product.price}
                srcToImg={product.srcToImg}
                quantity={item.quantity}
                key={uuid()}
            />
        );
    });

    return (
        <div className="lg:w-3/4 md:w-2/3 w-full pr-md-8 pr-0 flex flex-row flex-wrap">
            {cartItemsComponents}
        </div>
    );
}

import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { CartContext } from "../../context/Cart/CartContext";
import Stripe from "./Stripe";
import { ProductsContext } from "../../context/Products/ProductsContext";
import { UsersContext } from "../../context/Users/UsersContext";

import { If, Then, Else } from "react-if";

function Total() {
    const { cartItems } = useContext(CartContext);
    const { products } = useContext(ProductsContext);
    const { isAuthenticated } = useContext(UsersContext);

    const total = cartItems.reduce(
        (sum, item) =>
            sum +
            products.find((p) => p._id === item.productId).price *
                item.quantity,
        0
    );

    return (
        <div className="lg:w-1/4 md:w-1/3 w-64 bg-gray-200 h-40 rounded-lg md:px-8 flex px-0 py-8 flex-col px-4 mx-auto mb-8">
            <h2 className="text-gray-900 text-xl font-semibold title-font mb-5 text-center">
                Total: ${total}
            </h2>
            <If condition={isAuthenticated}>
                <Then>
                    <Stripe price={total} />
                </Then>
                <Else>
                    <div className="mx-auto text-md mt-2 text-gray-900">
                        <Link
                            to="/login"
                            className="text-pink-500 underline hover:text-pink-600"
                        >
                            Login
                        </Link>{" "}
                        to make purchase
                    </div>
                </Else>
            </If>
        </div>
    );
}

export default Total;

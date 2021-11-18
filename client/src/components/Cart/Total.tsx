import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { If, Then, Else } from "react-if";

import Stripe from "./Stripe";

import ProductsStore from "../../stores/ProductsStore";
import CartStore from "../../stores/CartStore";
import UserStore from "../../stores/UserStore";
interface IProps {
    ProductsStore?: ProductsStore;
    CartStore?: CartStore;
    UserStore?: UserStore;
}

class Total extends React.Component<IProps> {
    getTotal = () => {
        const { cartItems } = this.props.CartStore!;
        const { products } = this.props.ProductsStore!;
        return cartItems.reduce((sum, item) => {
            const product = products.find((p) => p._id === item.productId);
            if (!product) return sum;
            return sum + product.price * item.quantity;
        }, 0);
    };
    render() {
        const { isAuthenticated } = this.props.UserStore!;
        const total = this.getTotal();
        return (
            <div className="lg:w-1/4 md:w-1/3 w-64 bg-gray-200 h-40 rounded-lg md:px-8 flex px-0 py-8 flex-col px-4 mx-auto mb-8">
                <h2 className="text-gray-900 text-xl font-semibold title-font mb-5 text-center">
                    Total: ${total}
                </h2>
                <If condition={isAuthenticated}>
                    <Then>
                        <Stripe total={total} />
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
}

export default inject(
    "ProductsStore",
    "UserStore",
    "CartStore"
)(observer(Total));

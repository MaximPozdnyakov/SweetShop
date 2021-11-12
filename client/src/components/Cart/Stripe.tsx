import React from "react";
import { observer, inject } from "mobx-react";
import { toast, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

import StripeCheckout, { Token } from "react-stripe-checkout";

import CartStore from "../../stores/CartStore";
interface IProps {
    CartStore?: CartStore;
    total: number;
}

toast.configure({ autoClose: 8000 });

class Stripe extends React.Component<IProps> {
    makePurchase = async (token: Token) => {
        const { total } = this.props;
        const { deleteAllCartItems, makePurchase } = this.props.CartStore!;
        const status = await makePurchase({
            token: String(token),
            total,
        });
        if (status === "success") {
            deleteAllCartItems();
            toast("Success! Check emails for details", {
                type: "success",
                position: toast.POSITION.BOTTOM_RIGHT as ToastPosition,
            });
            return <Redirect to="/" />;
        } else {
            toast("Something went wrong", {
                type: "error",
                position: toast.POSITION.BOTTOM_RIGHT as ToastPosition,
            });
        }
    };

    render() {
        const { total } = this.props;
        return (
            <StripeCheckout
                stripeKey="pk_test_ayuZ3A3Id4kkad2kQwGYZSAF00GRCscdGP"
                label="Buy now"
                token={this.makePurchase}
                amount={total * 100}
                name={"Sweet Purchase"}
                ComponentClass="div"
            >
                <button className="text-white mt-2 bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg w-full">
                    Buy now
                </button>
            </StripeCheckout>
        );
    }
}

export default inject("CartStore")(observer(Stripe));

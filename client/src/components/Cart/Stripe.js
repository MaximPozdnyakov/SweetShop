import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";
import { CartContext } from "../../context/Cart/CartContext";
import "react-toastify/dist/ReactToastify.css";
import { Redirect } from "react-router-dom";

toast.configure({ autoClose: 8000 });

function Stripe(props) {
    const { price } = props;

    const { deleteItemsByOwner, cartNotLoaded } = useContext(CartContext);

    function handleToken(token) {
        cartNotLoaded();
        axios
            .post("/pay/charge", {
                token,
                product: {
                    name: "Sweet Purchase",
                    price: price * 100,
                },
                userToken: localStorage.getItem("token"),
            })
            .then((res) => {
                const { status } = res.data;
                if (status === "success") {
                    deleteItemsByOwner();
                    toast("Success! Check emails for details", {
                        type: "success",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    return <Redirect to="/" />;
                } else {
                    toast("Something went wrong", {
                        type: "error",
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                }
            });
    }
    return (
        <StripeCheckout
            stripeKey="pk_test_ayuZ3A3Id4kkad2kQwGYZSAF00GRCscdGP"
            label="Buy now"
            token={handleToken}
            billingAddress
            shippingAddress
            amount={price * 100}
            name={"Sweet Purchase"}
            ComponentClass="div"
        >
            <button className="text-white mt-2 bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg w-full">
                Buy now
            </button>
        </StripeCheckout>
    );
}

export default Stripe;

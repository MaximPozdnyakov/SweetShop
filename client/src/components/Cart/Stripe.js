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

  const { deleteItemsByOwner } = useContext(CartContext);

  function handleToken(token) {
    axios
      .post("/pay/charge", {
        token,
        product: {
          name: "Sweet Purchase",
          price: price * 100,
        },
      })
      .then((res) => {
        const { status } = res.data;
        if (status === "success") {
          toast("Success! Check emails for details", {
            type: "success",
            position: toast.POSITION.BOTTOM_RIGHT,
          });
          deleteItemsByOwner();
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
    <div>
      <StripeCheckout
        stripeKey="pk_test_ayuZ3A3Id4kkad2kQwGYZSAF00GRCscdGP"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={price * 100}
        name={"Sweet Purchase"}
      />
    </div>
  );
}

export default Stripe;

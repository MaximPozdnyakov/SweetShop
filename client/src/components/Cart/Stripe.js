import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

toast.configure();

function Stripe() {
  function handleToken(token) {
    axios
      .post("/pay/charge", {
        token,
        product: {
          name: "Cock",
          price: 1000,
        },
      })
      .then((res) => {
        const { status } = res.data;
        if (status === "success") {
          toast("Success! Check emails for details", {
            type: "success",
          });
        } else {
          toast("Something went wrong", {
            type: "error",
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
        amount={1000}
        name={"Cock"}
      />
      <button className="btn btn-success btn-lg text-white btn-block font-weight-bold">
        BUY NOW
      </button>
    </div>
  );
}

export default Stripe;

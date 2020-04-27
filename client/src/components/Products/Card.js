import React, { useContext } from "react";

import CartContext from "../../context/Cart/CartContext";

function Card(props) {
    // const { cartItems } = useContext();

    // const isAdded =
    return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-12 mb-4">
            <div className="card">
                <img
                    src={props.srcToImg}
                    className="card-img-top"
                    style={{ height: "250px" }}
                    alt="..."
                />
                <div className="card-body d-flex justify-content-between">
                    <h5 className="card-title">{props.title}</h5>
                    <span className="text-success font-weight-bold">
                        ${props.price}
                    </span>
                    <a
                        href="/"
                        className="btn btn-primary"
                        style={{
                            position: "absolute",
                            right: "0",
                            bottom: "76px",
                        }}
                    >
                        <i class="fas fa-cart-plus"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Card;

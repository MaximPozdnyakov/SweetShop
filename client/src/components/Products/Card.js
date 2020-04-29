import React, { useContext } from "react";

import { CartContext } from "../../context/Cart/CartContext";

function Card(props) {
    const { cartItems, addItem, deleteItemById } = useContext(CartContext);

    const isAdded = cartItems.find((item) => item._id === props._id);

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
                        onClick={(e) => {
                            e.preventDefault();
                            isAdded
                                ? deleteItemById(props._id)
                                : addItem({
                                      _id: props._id,
                                      title: props.title,
                                      price: props.price,
                                      srcToImg: props.srcToImg,
                                  });
                        }}
                    >
                        {isAdded ? (
                            <i className="fas fa-check"></i>
                        ) : (
                            <i className="fas fa-cart-plus"></i>
                        )}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Card;

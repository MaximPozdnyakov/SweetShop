import React from "react";

function Card(props) {
    return (
        <div className="col-xl-3 col-md-4 col-sm-6 col-12">
            <div className="card">
                <img
                    src={props.srcToImg}
                    className="card-img-top"
                    style={{ height: "250px" }}
                    alt="..."
                />
                <div className="card-body d-flex justify-content-between">
                    <h5 className="card-title">{props.title}</h5>
                    <span>${props.price}</span>
                </div>
                <div className="card-footer">
                    <a href="/" className="btn btn-primary">
                        <i class="fas fa-cart-plus"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Card;

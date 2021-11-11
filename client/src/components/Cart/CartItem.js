import React from "react";
import { observer, inject } from "mobx-react";

class CartItem extends React.Component {
    deleteCartItem = (e) => {
        e.preventDefault();
        const { productId } = this.props;
        const { deleteCartItem } = this.props.CartStore;
        deleteCartItem({ productId });
    };

    changeQuantityBy = (e, difference) => {
        e.preventDefault();
        const { quantity, productId } = this.props;
        const { updateQuantityOfItem } = this.props.CartStore;
        const newQuantity = quantity + difference;
        if (newQuantity >= 1) {
            updateQuantityOfItem({ productId, quantity: newQuantity });
        } else {
            this.deleteCartItem(e);
        }
    };

    render() {
        const { title, price, srcToImg, quantity, category } = this.props;
        return (
            <div className="w-full lg:w-1/2 flex flex-wrap flex-row mb-8">
                <div className="w-1/2 h-48 overflow-hidden flex flex-row xl:justify-center justify-end">
                    <img
                        className="object-cover object-center h-full block"
                        src={srcToImg}
                        alt="..."
                        style={{ minWidth: 200 }}
                    />
                </div>
                <div className="w-1/2 flex flex-col justify-between py-2 pl-4">
                    <div>
                        <div className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            {category.toUpperCase()}
                        </div>
                        <div className="text-gray-900 title-font text-lg font-medium">
                            {title}
                        </div>
                        <div className="text-gray-900 title-font text-lg font-semibold">
                            ${price}
                        </div>
                    </div>
                    <div className="flex flex-row">
                        Quantity:{" "}
                        <div
                            className="border rounded-full flex items-center justify-center w-5 h-5 ml-3 mr-2 cursor-pointer"
                            onClick={(e) => this.changeQuantityBy(e, -1)}
                        >
                            <div className="h-3 mb-3">-</div>
                        </div>{" "}
                        {quantity}{" "}
                        <div
                            className="border rounded-full flex items-center justify-center w-5 h-5 ml-2 cursor-pointer"
                            onClick={(e) => this.changeQuantityBy(e, 1)}
                        >
                            <div className="h-3 mb-3">+</div>
                        </div>
                    </div>
                    <div
                        className="inline-flex text-gray-700 bg-gray-200 w-24 border-0 py-1 pl-4 focus:outline-none hover:bg-gray-300 rounded text-lg cursor-pointer"
                        onClick={this.deleteCartItem}
                    >
                        Remove
                    </div>
                </div>
            </div>
        );
    }
}

export default inject("CartStore")(observer(CartItem));

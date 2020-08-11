import React, { useContext, useState } from "react";

import { CartContext } from "../../context/Cart/CartContext";

import { If, Then } from "react-if";

function CartItem(props) {
    const { id, title, price, srcToImg, quantity, category } = props;

    const { deleteItemById, updateQuantityOfItem } = useContext(CartContext);

    const [quantityState, setQuantityState] = useState(quantity);

    const handleDelete = (e) => {
        e.preventDefault();
        setQuantityState(0);
        deleteItemById(id);
    };

    const quantityPlus = (e) => {
        e.preventDefault();
        setQuantityState(quantityState + 1);
        updateQuantityOfItem(id, quantity + 1);
    };
    const quantityMinus = (e) => {
        e.preventDefault();
        setQuantityState(quantityState - 1);
        if (quantity > 1) {
            updateQuantityOfItem(id, quantity - 1);
        } else {
            handleDelete();
        }
    };

    return (
        <If condition={quantityState >= 1}>
            <Then>
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
                                onClick={quantityMinus}
                            >
                                <div className="h-3 mb-3">-</div>
                            </div>{" "}
                            {quantityState}{" "}
                            <div
                                className="border rounded-full flex items-center justify-center w-5 h-5 ml-2 cursor-pointer"
                                onClick={quantityPlus}
                            >
                                <div className="h-3 mb-3">+</div>
                            </div>
                        </div>
                        <div
                            className="inline-flex text-gray-700 bg-gray-200 w-24 border-0 py-1 pl-4 focus:outline-none hover:bg-gray-300 rounded text-lg cursor-pointer"
                            onClick={handleDelete}
                        >
                            Remove
                        </div>
                    </div>
                </div>
            </Then>
        </If>
    );
}

export default CartItem;

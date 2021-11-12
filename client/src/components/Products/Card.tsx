import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { If, Then, Else } from "react-if";

import CartStore, { ICartItem } from "../../stores/CartStore";
interface IProps {
    CartStore?: CartStore;
    id: string;
    title: string;
    category: string;
    srcToImg: string;
    price: number;
}

class Card extends React.Component<IProps> {
    toggleProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const { addCartItem, deleteCartItem } = this.props.CartStore!;
        const productId = this.props.id;
        const cartItem = this.getCartItem();
        if (!cartItem) {
            addCartItem({ productId });
        } else {
            deleteCartItem({ productId });
        }
    };

    getCartItem = (): ICartItem | undefined => {
        const { cartItems } = this.props.CartStore!;
        const productId = this.props.id;
        return cartItems.find((item) => item.productId === productId);
    };

    render() {
        const { id, title, category, srcToImg, price } = this.props;
        const cartItem = this.getCartItem();

        return (
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link to={`/store/${id}`}>
                    <div className="block relative h-48 rounded overflow-hidden">
                        <img
                            alt=" "
                            className="object-cover object-center w-full h-full block"
                            src={srcToImg}
                        />
                    </div>
                    <div className="mt-4 relative">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                            {category.toUpperCase()}
                        </h3>
                        <h2 className="text-gray-900 title-font text-lg font-medium">
                            {title}
                        </h2>
                        <p className="mt-1">${price}</p>
                        <button
                            className="bg-pink-500 hover:bg-pink-600 px-3 py-1 absolute bottom-0 right-0 text-white rounded"
                            onClick={this.toggleProduct}
                        >
                            <If condition={!!cartItem}>
                                <Then>
                                    <i className="fas fa-check"></i>
                                </Then>
                                <Else>
                                    <i className="fas fa-cart-plus"></i>
                                </Else>
                            </If>
                        </button>
                    </div>
                </Link>
            </div>
        );
    }
}

export default inject("CartStore")(observer(Card));

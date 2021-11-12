import React from "react";
import { observer, inject } from "mobx-react";

import CartItem from "./CartItem";

import ProductsStore from "../../stores/ProductsStore";
import CartStore from "../../stores/CartStore";
interface IProps {
    ProductsStore?: ProductsStore;
    CartStore?: CartStore;
}

class ListOfCardItems extends React.Component<IProps> {
    render() {
        const { cartItems } = this.props.CartStore!;
        const { products } = this.props.ProductsStore!;
        const cartItemsComponents = cartItems.map((item) => {
            const product = products.find(
                (product) => product._id === item.productId
            );
            if (!product) return null;
            return (
                <CartItem
                    productId={item.productId}
                    title={product.title}
                    category={product.category}
                    price={product.price}
                    srcToImg={product.srcToImg}
                    quantity={item.quantity}
                    key={item.productId}
                />
            );
        });
        return (
            <div className="lg:w-3/4 md:w-2/3 w-full pr-md-8 pr-0 flex flex-row flex-wrap">
                {cartItemsComponents}
            </div>
        );
    }
}

export default inject("ProductsStore", "CartStore")(observer(ListOfCardItems));

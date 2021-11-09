import React from "react";
import { observer, inject } from "mobx-react";
import { If, Then, Else } from "react-if";

import ListOfCartItems from "./ListOfCartItems";
import Total from "./Total";

@inject("CartStore")
@observer
class Cart extends React.Component {
    render() {
        const { cartItems } = this.props.CartStore;
        return (
            <section className="text-gray-700 body-font">
                <div className="container mx-auto flex mt-24 md:flex-row flex-col-reverse">
                    <If condition={cartItems.length === 0}>
                        <Then>
                            <div className="mx-auto text-2xl text-gray-900">
                                Your cart is empty
                            </div>
                        </Then>
                        <Else>
                            <ListOfCartItems />
                            <Total />
                        </Else>
                    </If>
                </div>
            </section>
        );
    }
}

export default Cart;

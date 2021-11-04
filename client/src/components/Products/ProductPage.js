import React, { useContext, useState, useEffect } from "react";
import { ProductsContext } from "../../context/Products/ProductsContext";
import { CartContext } from "../../context/Cart/CartContext";

import { If, Then, Else } from "react-if";

function ProductPage(props) {
    const id = props.match.params.id;

    const { products } = useContext(ProductsContext);
    const { cartItems, addItem, deleteItemById } = useContext(CartContext);

    const [product, setProduct] = useState(products.find((p) => p._id === id));
    useEffect(() => {
        setProduct(products.find((p) => p._id === id));
    }, [products, id]);
    const { title, price, srcToImg } = product;

    const [cartItem, setCartItem] = useState(
        cartItems.find((item) => item.productId === id)
    );

    useEffect(() => {
        setCartItem(cartItems.find((item) => item.productId === id));
    }, [cartItems, id]);

    const addRemoveProduct = (e) => {
        e.preventDefault();
        if (!cartItem) {
            setCartItem({ id });
            addItem({
                productId: id,
            });
        } else {
            setCartItem(undefined);
            deleteItemById(cartItem._id);
        }
    };
    return (
        <section className="text-gray-700 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                        src={srcToImg}
                    />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                            SWEET SHOP
                        </h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                            {title}
                        </h1>
                        <p className="leading-relaxed">
                            Fam locavore kickstarter distillery. Mixtape
                            chillwave tumeric sriracha taximy chia microdosing
                            tilde DIY. XOXO fam indxgo juiceramps cornhole raw
                            denim forage brooklyn. Everyday carry +1 seitan
                            poutine tumeric. Gastropub blue bottle austin
                            listicle pour-over, neutra jean shorts keytar banjo
                            tattooed umami cardigan.
                        </p>
                        <div className="flex mt-4">
                            <span className="title-font font-medium text-2xl text-gray-900">
                                ${price}
                            </span>
                            <button
                                className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                                onClick={addRemoveProduct}
                            >
                                <If condition={!!cartItem}>
                                    <Then>Remove product</Then>
                                    <Else>Add product</Else>
                                </If>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductPage;

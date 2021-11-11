import React from "react";
import { observer, inject } from "mobx-react";

import Card from "./Card";

class Products extends React.Component {
    render() {
        const { products } = this.props.ProductsStore;
        const cards = products.map((product) => (
            <Card
                id={product._id}
                title={product.title}
                category={product.category}
                srcToImg={product.srcToImg}
                price={product.price}
                key={product._id}
            />
        ));
        return (
            <section className="text-gray-700 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">{cards}</div>
                </div>
            </section>
        );
    }
}

export default inject("ProductsStore")(observer(Products));

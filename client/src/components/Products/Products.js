import React, { useContext } from "react";

import Search from "./Search";
import Card from "./Card";
import { ProductsContext } from "../../context/Products/ProductsContext";

function Products() {
    const { displayedProducts, header } = useContext(ProductsContext);

    const cards = displayedProducts.map((product) => (
        <Card
            title={product.title}
            srcToImg={product.srcToImg}
            price={product.price}
            key={product._id}
        />
    ));

    return (
        <main>
            <h1 className="text-center my-5 color-primary">{header}</h1>
            <Search />
            <div className="row col-xl-10 col-md-12 mx-auto">{cards}</div>
        </main>
    );
}

export default Products;

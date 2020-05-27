import React, { useContext } from "react";

import Card from "./Card";
import { ProductsContext } from "../../context/Products/ProductsContext";

import Loader from "react-loader-spinner";

function Products() {
  const { displayedProducts, header, isProductsLoaded } = useContext(
    ProductsContext
  );

  const cards = displayedProducts.map((product) => (
    <Card
      _id={product._id}
      title={product.title}
      srcToImg={product.srcToImg}
      price={product.price}
      key={product._id}
    />
  ));

  return (
    <main>
      {!isProductsLoaded ? (
        <div
          className="container justify-content-center d-flex align-items-center"
          style={{ height: "80vh" }}
        >
          <Loader type="Oval" color="#00BFFF" height={200} width={200} />
        </div>
      ) : (
        <>
          <h1 className="text-center my-5">{header}</h1>
          <div className="row col-xl-11 col-lg-11 col-md-12 col-sm-12 mx-auto">
            {cards}
          </div>
        </>
      )}
    </main>
  );
}

export default Products;

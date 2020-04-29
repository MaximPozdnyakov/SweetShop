import React, { useContext } from 'react';

import Search from './Search';
import Card from './Card';
import { ProductsContext } from '../../context/Products/ProductsContext';

import Loader from 'react-loader-spinner';

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
    <main style={{ background: '#F7F8F9' }}>
      {!isProductsLoaded ? (
        <div
          className="container justify-content-center d-flex align-items-center"
          style={{ height: '80vh' }}
        >
          <Loader type="Oval" color="#00BFFF" height={200} width={200} />
        </div>
      ) : (
        <>
          <h1 className="text-center my-5 color-primary">{header}</h1>
          <Search />
          <div className="row col-xl-10 col-md-12 mx-auto">{cards}</div>
        </>
      )}
    </main>
  );
}

export default Products;

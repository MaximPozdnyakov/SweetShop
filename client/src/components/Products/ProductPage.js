import React, { useContext } from 'react';
import { ProductsContext } from '../../context/Products/ProductsContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/Cart/CartContext';

function ProductPage(props) {
  const { id } = props.match.params;

  const { allProducts } = useContext(ProductsContext);

  const { srcToImg, title, price } = allProducts.find((p) => p._id === id);

  const { cartItems, addItem, deleteItemById } = useContext(CartContext);

  const isAdded = cartItems.find((item) => item._id === id);

  return (
    <div className="mt-5 mx-auto col-xl-6 col-lg-8 col-12 row">
      <img src={srcToImg} alt="..." className="col-sm-6 col-12" />
      <div className="col-sm-6 d-flex flex-column  justify-content-between text-center">
        <div className="my-3">
          <h2 style={{ lineHeight: '1.5em' }}>{title}</h2>
          <h4 className="text-success">${price}</h4>
        </div>

        <button
          className="btn btn-primary my-3"
          onClick={(e) => {
            e.preventDefault();
            isAdded
              ? deleteItemById(id)
              : addItem({
                  _id: id,
                  title,
                  price,
                  srcToImg,
                });
          }}
        >
          {isAdded ? <>REMOVE ITEM FROM CART</> : <>ADD TO CART</>}
        </button>
        <Link to="/" className="btn btn-primary my-3">
          CONTINUE SHOPPING
        </Link>
        <Link to="/cart" className="btn btn-primary my-3">
          GO TO CART
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;

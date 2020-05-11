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
    <div className="mt-5 mx-auto col-6 row">
      <img src={srcToImg} alt="..." className="col-6" />
      <div className="col-6 d-flex flex-column  justify-content-between text-center">
        <div>
          <h2 style={{ lineHeight: '1.5em' }}>{title}</h2>
          <h4 className="text-success">${price}</h4>
        </div>

        <button
          className="btn btn-primary"
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
          {isAdded ? <>ITEM IS ADDED TO CART</> : <>ADD TO CART</>}
        </button>
        <Link to="/" className="btn btn-primary">
          CONTINUE SHOPPING
        </Link>
        <Link to="/cart" className="btn btn-primary">
          GO TO CART
        </Link>
      </div>
    </div>
  );
}

export default ProductPage;

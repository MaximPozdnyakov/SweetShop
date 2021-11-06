import React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { If, Then, Else } from "react-if";

@inject("CartStore")
@observer
class Card extends React.Component {
    constructor(props) {
        super(props);
        const { cartItems } = this.props.CartStore;
        this.state = {
            cartItem: cartItems.find(
                (item) => item.productId === this.props.id
            ),
        };
    }

    toggleProduct = (e) => {
        e.preventDefault();
        const { addCartItem, deleteItemById } = this.props.CartStore;
        if (!this.state.cartItem) {
            this.setState({
                cartItem: { id: this.props.id },
            });
            addCartItem({
                productId: this.props.id,
            });
        } else {
            this.setState({
                cartItem: undefined,
            });
            deleteItemById(this.state.cartItem._id);
        }
    };

    render() {
        const { id, title, category, srcToImg, price } = this.props;
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
                            <If condition={!!this.state.cartItem}>
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

export default Card;

// function Card(props) {
//     const { id, title, category, srcToImg, price } = props;

//     const { cartItems, addItem, deleteItemById } = useContext(CartContext);

//     const [cartItem, setCartItem] = useState(
//         cartItems.find((item) => item.productId === id)
//     );

//     useEffect(() => {
//         setCartItem(cartItems.find((item) => item.productId === id));
//     }, [cartItems, id]);

//     const addRemoveProduct = (e) => {
//         e.preventDefault();
//         if (!cartItem) {
//             setCartItem({ id });
//             addItem({
//                 productId: id,
//             });
//         } else {
//             setCartItem(undefined);
//             deleteItemById(cartItem._id);
//         }
//     };

//     return (
//         <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
//             <Link to={`/store/${id}`}>
//                 <div className="block relative h-48 rounded overflow-hidden">
//                     <img
//                         alt="ecommerce"
//                         className="object-cover object-center w-full h-full block"
//                         src={srcToImg}
//                     />
//                 </div>
//                 <div className="mt-4 relative">
//                     <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
//                         {category.toUpperCase()}
//                     </h3>
//                     <h2 className="text-gray-900 title-font text-lg font-medium">
//                         {title}
//                     </h2>
//                     <p className="mt-1">${price}</p>
//                     <button
//                         className="bg-pink-500 hover:bg-pink-600 px-3 py-1 absolute bottom-0 right-0 text-white rounded"
//                         onClick={addRemoveProduct}
//                     >
//                         <If condition={!!cartItem}>
//                             <Then>
//                                 <i className="fas fa-check"></i>
//                             </Then>
//                             <Else>
//                                 <i className="fas fa-cart-plus"></i>
//                             </Else>
//                         </If>
//                     </button>
//                 </div>
//             </Link>
//         </div>
//     );
// }

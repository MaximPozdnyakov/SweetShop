import { action, observable, makeObservable, when, runInAction } from "mobx";
import axios from "axios";

class CartStore {
    constructor(props) {
        makeObservable(this);
        this.UserStore = props.UserStore;
        when(
            () => this.UserStore.isUserLoaded,
            () => this.fetchCart()
        );
    }

    @observable cartItems = [];
    @observable isCartLoaded = false;

    fetchCart = async () => {
        try {
            this.setCartNotLoaded();
            const cartItems = await axios.post("/api/cart", {
                userId: this.UserStore.userId,
            });
            this.setCartItems(cartItems.data);
        } catch (e) {}
    };

    addCartItem = async ({ productId }) => {
        try {
            const item = await axios.post(`/api/cart/store`, {
                productId,
                quantity: 1,
                userId: this.UserStore.userId,
            });
            runInAction(() => {
                this.cartItems = [
                    ...this.cartItems,
                    {
                        _id: item.data._id,
                        productId: item.data.productId,
                        ownerId: item.data.ownerId,
                        quantity: item.data.quantity,
                    },
                ];
            });
        } catch (e) {}
    };

    updateQuantityOfItem = async (id, quantity) => {
        runInAction(() => {
            this.cartItems = this.cartItems.map((item) => {
                if (item._id === id) {
                    item.quantity = quantity;
                }
                return item;
            });
        });
        try {
            await axios.put(`/api/cart/${id}`, {
                quantity,
                userId: this.UserStore.userId,
            });
        } catch (err) {}
    };

    deleteItemById = async (id) => {
        runInAction(() => {
            this.cartItems = this.cartItems.filter((item) => item._id !== id);
        });
        try {
            await axios.delete(`/api/cart/${id}`, {
                data: { userId: this.UserStore.userId },
            });
        } catch (e) {}
    };

    deleteItemsByOwner = async () => {
        runInAction(() => {
            this.cartItems = [];
        });
        try {
            await axios.delete(`/api/cart/owner`, {
                data: { userId: this.UserStore.userId },
            });
        } catch (e) {}
    };

    @action setCartItems(cartItems) {
        this.cartItems = cartItems;
        this.isCartLoaded = true;
    }

    @action setCartNotLoaded() {
        this.isCartLoaded = false;
    }
}

export default CartStore;

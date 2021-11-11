import { makeAutoObservable, reaction, runInAction } from "mobx";
import axios from "axios";

class CartStore {
    constructor(props) {
        makeAutoObservable(this);
        this.UserStore = props.UserStore;
        reaction(
            () => this.UserStore.isUserLoaded,
            () => this.fetchCart()
        );
    }

    cartItems = [];
    isCartLoaded = false;

    fetchCart = async () => {
        if (!this.UserStore.isUserLoaded) return;
        try {
            this.setCartNotLoaded();
            const { userId } = this.UserStore;
            const cartItems = await axios.post("/api/cart", {
                userId,
            });
            this.setCartItems(cartItems.data);
        } catch (e) {}
    };

    addCartItem = async ({ productId }) => {
        const { userId } = this.UserStore;
        runInAction(() => {
            this.cartItems = [
                ...this.cartItems,
                {
                    productId,
                    ownerId: userId,
                    quantity: 1,
                },
            ];
        });
        try {
            const newCartItem = await axios.post(`/api/cart/store`, {
                productId,
                quantity: 1,
                userId,
            });
            runInAction(() => {
                this.cartItems = this.cartItems.map((item) => {
                    if (item.productId === productId) {
                        item._id = newCartItem.data._id;
                    }
                    return item;
                });
            });
        } catch (e) {}
    };

    updateQuantityOfItem = async ({ productId, quantity }) => {
        runInAction(() => {
            this.cartItems = this.cartItems.map((item) => {
                if (item.productId === productId) {
                    item.quantity = quantity;
                }
                return item;
            });
        });
        try {
            const { userId } = this.UserStore;
            const id = this.cartItems.find(
                (item) => item.productId === productId
            )._id;
            await axios.put(`/api/cart/${id}`, {
                quantity,
                userId,
            });
        } catch (err) {}
    };

    deleteCartItem = async ({ productId }) => {
        const id = this.cartItems.find(
            (item) => item.productId === productId
        )._id;
        runInAction(() => {
            this.cartItems = this.cartItems.filter(
                (item) => item.productId !== productId
            );
        });
        try {
            const { userId } = this.UserStore;
            await axios.delete(`/api/cart/${id}`, {
                data: { userId },
            });
        } catch (e) {}
    };

    deleteAllCartItems = async () => {
        runInAction(() => {
            this.cartItems = [];
        });
        try {
            const { userId } = this.UserStore;
            await axios.delete(`/api/cart/owner`, {
                data: { userId },
            });
        } catch (e) {}
    };

    makePurchase = async ({ token, total }) => {
        try {
            this.setCartNotLoaded();
            const purchaseRes = await axios.post("/pay/charge", {
                token,
                product: {
                    name: "Sweet Purchase",
                    price: total * 100,
                },
                userToken: localStorage.getItem("token"),
            });
            this.setCartLoaded();
            return purchaseRes.data.status;
        } catch (e) {}
    };

    setCartItems(cartItems) {
        this.cartItems = cartItems;
        this.isCartLoaded = true;
    }

    setCartLoaded() {
        this.isCartLoaded = true;
    }

    setCartNotLoaded() {
        this.isCartLoaded = false;
    }
}

export default CartStore;

import { makeAutoObservable, reaction, runInAction } from "mobx";
import axios from "axios";
import UserStore from "./UserStore";

export interface ICartItem {
    __v?: number;
    _id?: string;
    productId: string;
    ownerId: string;
    quantity: number;
}

interface ICartStore {
    cartItems: ICartItem[];
    isCartLoaded: boolean;
    UserStore: UserStore;
}

class CartStore implements ICartStore {
    UserStore;
    cartItems: ICartItem[] = [];
    isCartLoaded = false;

    constructor(props: { UserStore: UserStore }) {
        makeAutoObservable(this);
        this.UserStore = props.UserStore;
        reaction(
            () => this.UserStore.isUserLoaded,
            () => this.fetchCart()
        );
    }

    fetchCart = async () => {
        if (!this.UserStore.isUserLoaded) return;
        try {
            this.setCartNotLoaded();
            const { userId } = this.UserStore;
            const { data: cartItems }: { data: ICartItem[] } = await axios.post(
                "/api/cart",
                { userId }
            );
            this.setCartItems(cartItems);
        } catch (e) {}
    };

    addCartItem = async ({ productId }: { productId: string }) => {
        const { userId } = this.UserStore;
        runInAction(() => {
            this.cartItems = [
                ...this.cartItems,
                { productId, ownerId: userId, quantity: 1 },
            ];
        });
        try {
            const { data: newCartItem }: { data: ICartItem } = await axios.post(
                `/api/cart/store`,
                { productId, quantity: 1, userId }
            );
            runInAction(() => {
                this.cartItems = this.cartItems.map((item) => {
                    if (item.productId === productId) {
                        item._id = newCartItem._id;
                    }
                    return item;
                });
            });
        } catch (e) {}
    };

    updateQuantityOfItem = async ({
        productId,
        quantity,
    }: {
        productId: string;
        quantity: number;
    }) => {
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
            )!._id;
            if (!id) return;
            await axios.put(`/api/cart/${id}`, { quantity, userId });
        } catch (err) {}
    };

    deleteCartItem = async ({ productId }: { productId: string }) => {
        const id = this.cartItems.find(
            (item) => item.productId === productId
        )!._id;
        if (!id) return;
        runInAction(() => {
            this.cartItems = this.cartItems.filter(
                (item) => item.productId !== productId
            );
        });
        try {
            const { userId } = this.UserStore;
            await axios.delete(`/api/cart/${id}`, { data: { userId } });
        } catch (e) {}
    };

    deleteAllCartItems = async () => {
        runInAction(() => (this.cartItems = []));
        try {
            const { userId } = this.UserStore;
            await axios.delete(`/api/cart/owner`, { data: { userId } });
        } catch (e) {}
    };

    makePurchase = async ({
        token,
        total,
    }: {
        token: string;
        total: number;
    }) => {
        try {
            this.setCartNotLoaded();
            type PurchaseResponse = { data: { status: string } };
            const { data: purchaseRes }: PurchaseResponse = await axios.post(
                "/pay/charge",
                {
                    token,
                    product: { name: "Sweet Purchase", price: total * 100 },
                    userToken: localStorage.getItem("token"),
                }
            );
            this.setCartLoaded();
            return purchaseRes.status;
        } catch (e) {}
    };

    setCartItems(cartItems: ICartItem[]) {
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

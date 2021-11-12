import ProductsStore from "./ProductsStore";
import MsgStore from "./MsgStore";
import UserStore from "./UserStore";
import CartStore from "./CartStore";

class GlobalStore {
    ProductsStore: ProductsStore;
    MsgStore: MsgStore;
    UserStore: UserStore;
    CartStore: CartStore;

    constructor() {
        this.ProductsStore = new ProductsStore();
        this.MsgStore = new MsgStore();
        this.UserStore = new UserStore(this);
        this.CartStore = new CartStore(this);
    }
}

export default GlobalStore;

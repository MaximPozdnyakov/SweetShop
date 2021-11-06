import ProductsStore from "./ProductsStore";
import MsgStore from "./MsgStore";
import UserStore from "./UserStore";
import CartStore from "./CartStore";

class GlobalStore {
    constructor() {
        this.ProductsStore = new ProductsStore(this);
        this.MsgStore = new MsgStore(this);
        this.UserStore = new UserStore(this);
        this.CartStore = new CartStore(this);
    }
}

export default GlobalStore;

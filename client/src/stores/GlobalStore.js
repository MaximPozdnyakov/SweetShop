import ProductsStore from "./ProductsStore";
import MsgStore from "./MsgStore";
import UserStore from "./UserStore";

class GlobalStore {
    constructor() {
        this.ProductsStore = new ProductsStore(this);
        this.MsgStore = new MsgStore(this);
        this.UserStore = new UserStore(this);
    }
}

export default GlobalStore;

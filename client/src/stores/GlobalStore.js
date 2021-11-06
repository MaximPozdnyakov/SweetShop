import ProductsStore from "./ProductsStore";
import MsgStore from "./MsgStore";

class GlobalStore {
    constructor() {
        this.ProductsStore = new ProductsStore(this);
        this.MsgStore = new MsgStore(this);
    }
}

export default GlobalStore;

import { action, observable, when, makeObservable } from "mobx";
import axios from "axios";

class ProductsStore {
    constructor() {
        makeObservable(this);
        when(
            () => !this.isProductsLoaded,
            () => this.fetchProducts()
        );
    }

    @observable products = [];
    @observable isProductsLoaded = false;

    @action fetchProducts = async () => {
        try {
            const products = await axios.get("/api/products");
            this.isProductsLoaded = true;
            this.products = products.data;
        } catch (e) {}
    };
}

export default ProductsStore;

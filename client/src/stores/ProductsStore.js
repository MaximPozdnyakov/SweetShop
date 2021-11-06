import { action, observable, when } from "mobx";
import axios from "axios";

class ProductsStore {
    constructor() {
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
            this.products = products;
        } catch (e) {}
    };
}

export default ProductsStore;

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

    async fetchProducts() {
        try {
            const products = await axios.get("/api/products");
            this.setProducts(products.data);
        } catch (e) {}
    }

    @action setProducts(products) {
        this.isProductsLoaded = true;
        this.products = products;
    }
}

export default ProductsStore;

import { when, makeAutoObservable } from "mobx";
import axios from "axios";

class ProductsStore {
    constructor() {
        makeAutoObservable(this);
        when(
            () => !this.isProductsLoaded,
            () => this.fetchProducts()
        );
    }

    products = [];
    isProductsLoaded = false;

    async fetchProducts() {
        try {
            const products = await axios.get("/api/products");
            this.setProducts(products.data);
        } catch (e) {}
    }

    setProducts(products) {
        this.isProductsLoaded = true;
        this.products = products;
    }
}

export default ProductsStore;

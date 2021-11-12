import { when, makeAutoObservable } from "mobx";
import axios from "axios";

export interface IProduct {
    __v: number;
    _id: string;
    category: string;
    created_at: string;
    price: number;
    srcToImg: string;
    title: string;
}

interface IProductsStore {
    products: IProduct[];
    isProductsLoaded: boolean;
}

class ProductsStore implements IProductsStore {
    constructor() {
        makeAutoObservable(this);
        when(
            () => !this.isProductsLoaded,
            () => this.fetchProducts()
        );
    }

    products: IProduct[] = [];
    isProductsLoaded = false;

    async fetchProducts() {
        try {
            const { data: products }: { data: IProduct[] } = await axios.get(
                "/api/products"
            );
            this.setProducts(products);
        } catch (e) {}
    }

    setProducts(products: IProduct[]) {
        this.isProductsLoaded = true;
        this.products = products;
    }
}

export default ProductsStore;

import { getContext, setContext } from "svelte"
import type { Product } from "$lib/type"
import OrderService from "$lib/services/order-service"
import ProductService from "$lib/services/product-service"
import { OrderStore } from "$lib/state/order-store.svelte"

export const PRODUCT_KEY = "products"

export class ProductStore {
	products = $state<Product[]>([])

	async loadProducts(products: Product[]) {
		this.products = products
	}

	sortProducts(by: "name" | "price", order: "asc" | "desc") {}
}

export function setProductStore() {
	const products = new ProductStore()
	return setContext<ProductStore>(PRODUCT_KEY, products)
}

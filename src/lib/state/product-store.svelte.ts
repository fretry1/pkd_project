import { getContext, setContext } from "svelte"
import type { Product } from "$lib/type"
import OrderService from "$lib/services/order-service"
import ProductService from "$lib/services/product-service"
import { OrderStore } from "$lib/state/order-store.svelte"
import { preloadData } from "$app/navigation"

export const PRODUCT_KEY = "products"

export class ProductStore {
	products = $state<Product[]>([])

	async loadProducts(products: Product[]) {
		this.products = products
	}

	#sortByPrice(prod: Product[], mode?: "asc" | "desc"): Product[] {
		return mode === "asc"
			? prod.sort((a, b) => a.price - b.price)
			: mode === "desc"
				? prod.sort((a, b) => b.price - a.price)
				: prod
	}

	#sortByAlph(prod: Product[], mode?: "asc" | "desc"): Product[] {
		return mode === "asc"
			? prod.sort((a, b) => (a.title > b.title ? 1 : b.title > a.title ? -1 : 0))
			: mode === "desc"
				? prod.sort((a, b) => (b.title > a.title ? 1 : a.title > b.title ? -1 : 0))
				: prod
	}

	sortProducts(by: "name" | "price", order: "asc" | "desc"): Product[] {
		switch (by) {
			case "name":
				switch (order) {
					case "asc":
						return this.#sortByAlph(this.products, "asc")

					case "desc":
						return this.#sortByAlph(this.products, "desc")
				}
			case "price":
				switch (order) {
					case "asc":
						return this.#sortByPrice(this.products, "asc")
					case "desc":
						return this.#sortByPrice(this.products, "desc")
				}
		}
	}
}

export function setProductStore() {
	const products = new ProductStore()
	return setContext<ProductStore>(PRODUCT_KEY, products)
}

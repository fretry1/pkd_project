import { getContext, setContext } from "svelte"
import type { Order, OrderItem, Status } from "$lib/type"
import OrderService from "$lib/services/order-service"

export const ORDER_KEY = "order"

export class OrderStore {
	order = $state<Order>({
		id: "",
		created_at: "",
		status: "CREATED",
		Items: new Map<string, OrderItem>(),
		total: 0
	})

	async initializeNewOrder() {
		const [o, err] = await OrderService.createOrder()
		if (err) {
			console.error("Failed to initialize a new order: ", err)
			return
		}
		this.order = o!
	}

	// TODO: implement
	addProductOnOrder(productId: string) {}

	// TODO: implement
	removeProductFromOrder(productId: string) {}

	getQuantityInCart(productId: string): number {
		return this.order.Items.has(productId) ? this.order.Items.get(productId)!.quantity : 0
	}

	// TODO: perform after order payment
	clearOrder() {
		this.order.Items.clear()
		this.order.total = 0
		this.order.status = "CREATED"
	}
}

export function setOrderStore() {
	const orderStore = new OrderStore()
	return setContext<OrderStore>(ORDER_KEY, orderStore)
}

export function getOrderStore() {
	return getContext<OrderStore>(ORDER_KEY)
}

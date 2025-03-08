import { getContext, setContext } from "svelte"
import type { Order, OrderItem, Status } from "$lib/type"
import OrderService from "$lib/services/order-service"

export const ORDER_KEY = "order"

export class OrderStore {
	order = $state<Order>({
		id: "",
		createdAt: "",
		status: "CREATED",
		items: new Map<string, OrderItem>(),
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

	async changeQtyOfProduct(productId: string, s: "inc" | "dec") {
		let qty = this.order.items.get(productId)?.quantity ?? 0
		if (qty === 0 && s === "dec") return
		qty = qty === 0 ? 1 : qty + (s === "inc" ? 1 : -1)
		const [updatedOrder, err] = await OrderService.setProductOnOrder(this.order.id, productId, qty)
		if (err) {
			console.error(`Failed to ${s} qty of product ${productId} on order ${this.order.id}`)
			return
		}
		this.order = updatedOrder
	}

	// TODO: implement
	removeProductFromOrder(productId: string) {}

	getQuantityInCart(productId: string): number {
		try {
			const orderItem = this.order.items.get(productId)
			return orderItem?.quantity ?? 0
		} catch (e) {
			console.error(e)
			return 0
		}
	}

	// TODO: perform after order payment
	clearOrder() {
		this.order.items.clear()
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

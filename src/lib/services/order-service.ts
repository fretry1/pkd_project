import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt,
	PResult,
	AppError
} from "$lib/type"
import { api } from "./api"

async function createOrder(): PResult<Order, AppError> {
	return await api.post("/orders")
}

async function getAllOrders(): PResult<Order[], AppError> {
	return api.get("/orders")
}

async function setProductOnOrder(
	orderId: string,
	productId: string,
	quantity: number
): PResult<Order, AppError> {
	return api.put(orderId + "/products/" + productId, { quantity })
}

// No use-case yet
async function modifyOrderStatus(orderId: string, options: string): PResult<Order, AppError> {
	const status = options.toUpperCase()
	return api.put(orderId, { status })
}

// No use-case yet
async function removeOrder(id: string): Promise<void | number> {
	if (id === "ALL") {
		return api.delUgly(`/orders`)
	}
	return api.delUgly(`/orders/${id}`)
}

export default {
	createOrder,
	getAllOrders,
	setProductOnOrder
	// ...
}

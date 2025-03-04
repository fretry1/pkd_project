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
import { apiCommunicator as api } from "./api-client"

export async function createEmptyOrder(): PResult<Order, AppError> {
	return await api.post("/orders")
}

export async function getAll(): PResult<Order[], AppError> {
	return api.get("/orders")
}

export async function modifyOrderProducts(
	orderId: string,
	productId: string,
	quantity: number
): PResult<Order, AppError> {
	return api.put(orderId + "/products/" + productId, { quantity })
}

export async function modifyOrderStatus(
	orderId: string,
	options: string
): PResult<Order, AppError> {
	const status = options.toUpperCase()
	return api.put(orderId, { status })
}

export async function removeOrder(id: string): Promise<void | number> {
	if (id === "ALL") {
		return api.delUgly(`/orders`)
	}
	return api.delUgly(`/orders/${id}`)
}

const banan: Product = {
	id: "5",
	title: "banan",
	description: "en frukt",
	price: 10
}

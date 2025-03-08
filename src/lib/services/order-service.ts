import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt,
	PResult,
	AppError,
	Result
} from "$lib/type"
import { api } from "./api"

/**
 * type Order = {
 * 	id: string
 * 	createdAt: string
 * 	status: Status
 * 	items: Map<string, OrderItem>
 * 	total: number
 * }
 */
function parseOrder(json: any): Result<Order, AppError> {
	try {
		// Parsing logic goes here

		const items = json.items // ska finnas där enligt typ-beskrivningen
		// hämta keys och values from items (entries, values)
		const keys = Object.entries(items)
		const map = new Map()
		for (let i = 0; i < keys.length; i++) {
			const [key, value] = keys[i]
			map.set(key, value)
		}

		json.items = map

		return [json as Order, null]
	} catch (ex) {
		return [
			null,
			{
				code: "json parse error",
				message: ex.toString()
			}
		]
	}
}

async function createOrder(): PResult<Order, AppError> {
	const [created, err] = await api.post("/orders")
	if (err) return [null, err]
	const [parsed, parseErr] = parseOrder(created)
	if (parseErr) return [null, parseErr]
	console.log("Parsed order: ", parsed)
	return [parsed, null]
}

async function getAllOrders(): PResult<Order[], AppError> {
	return api.get("/orders")
}

async function setProductOnOrder(
	orderId: string,
	productId: string,
	quantity: number
): PResult<Order, AppError> {
	const [order, err] = await api.put(`/orders/${orderId}/products/${productId}`, { quantity })
	if (err) return [null, err]
	const [parsed, parseErr] = parseOrder(order)
	if (parseErr) return [null, parseErr]
	console.log("Parsed order: ", parsed)
	return [parsed, null]
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

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

/**
 * Parses a JSON object into an Order object.
 * @param json - The JSON object to parse.
 * @returns A Result containing the parsed Order object or an AppError.
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
	} catch (ex: any) {
		return [
			null,
			{
				code: "json parse error",
				message: ex.toString()
			}
		]
	}
}

/**
 * Creates a new order.
 * @returns A PResult containing the created Order object or an AppError.
 */
async function createOrder(): PResult<Order, AppError> {
	const [created, err] = await api.post("/orders")
	if (err) return [null, err]
	const [parsed, parseErr] = parseOrder(created)
	if (parseErr) return [null, parseErr]
	console.log("Parsed order: ", parsed)
	return [parsed, null]
}

/**
 * Retrieves all orders.
 * @returns A PResult containing an array of Order objects or an AppError.
 */
async function getAllOrders(): PResult<Order[], AppError> {
	return api.get("/orders")
}

/**
 * Sets a product on an order with a specified quantity.
 * @param orderId - The ID of the order.
 * @param productId - The ID of the product.
 * @param quantity - The quantity of the product to set on the order.
 * @returns A PResult containing the updated Order object or an AppError.
 */
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
/**
 * Modifies the status of an order.
 * @param orderId - The ID of the order.
 * @param options - The new status to set on the order.
 * @returns A PResult containing the updated Order object or an AppError.
 */
async function modifyOrderStatus(orderId: string, options: string): PResult<Order, AppError> {
	const status = options.toUpperCase()
	return api.put(orderId, { status })
}

// No use-case yet
/**
 * Removes an order by ID. If the ID is "ALL", removes all orders.
 * @param id - The ID of the order to remove, or "ALL" to remove all orders.
 * @returns A Promise that resolves to void or a number.
 */
async function removeOrder(id: string): Promise<void | number> {
	if (id === "ALL") {
		return api.delUgly(`/orders`)
	}
	return api.delUgly(`/orders/${id}`)
}

export default {
	createOrder,
	getAllOrders,
	setProductOnOrder,
	removeOrder
	// ...
}

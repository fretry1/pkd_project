import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt,
	AppError,
	PResult
} from "$lib/type"
import { api } from "./api"

/**
 * Retrieves all products from Go server.
 * @returns A PResult containing an array of Product objects or an AppError.
 */
export async function getAllProducts(): PResult<Product[], AppError> {
	return await api.get("/products")
}

export default {
	getAllProducts
}

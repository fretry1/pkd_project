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
import { apiCommunicator as api } from "./api-client"

export async function getAllProducts(): PResult<Product[], AppError> {
	return await api.get("/products")
}

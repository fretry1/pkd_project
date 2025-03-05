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

async function getAllProducts(): PResult<Product[], AppError> {
	return await api.get("/products")
}

export default {
	getAllProducts
}

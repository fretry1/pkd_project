import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt
} from "$lib/type"
import { apiCommunicator as api } from "./api-client"

export async function getAllProducts() {
	const [product, err] = await api.get("/products")
	if (err) {
		return
	}
}

import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt
} from "$lib/type"
import { apiCommunicator } from "./api-client"

async function getAllProducts() {
	const [product, err] = await apiCommunicator.get("/products")
	if (err) {
		return
	}
}

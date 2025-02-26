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

function create_empty_order() {
	apiCommunicator.post("/orders")
}

function modify_order_products() {}

function modify_order_status() {}

function remove_order() {
	apiCommunicator.delete("orders", "{id}")
}

const banan: Product = {
	id: 5,
	titel: "banan",
	description: "en frukt",
	price: 10
}

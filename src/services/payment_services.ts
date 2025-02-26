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

function create_customer_details() {
	apiCommunicator.post("/payment")
}

function get_order_details() {}

function initiate_payment() {}

function issue_payment() {}

function create_receipt() {}

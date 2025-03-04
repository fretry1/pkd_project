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

export async function createCustomerCetails() {
	return api.post("/payment")
}

export async function getOrderDetails() {}

export async function initiatePayment() {}

export async function issuePayment() {}

export async function createReceipt() {}

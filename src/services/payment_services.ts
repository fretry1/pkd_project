import { assets } from "$app/paths"
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

export async function createCustomerCetails(): PResult<CustomerDetails, AppError> {
	return api.post("/payment")
}

/**
 * @param id - id of the customer
 * @return - Promise<[Order, null] | [null, E]>
 */
export async function getOrderDetails(id: string): PResult<Order, AppError> {
	return api.get(`/payment/${id}/orders`)
}

/**
 * @param id - id of the customer
 * @param status - status of the specific payment of the customer
 * @return - Promise<[Order, null] | [null, E]>
 */
export async function setPaymentStatus(id: string, status: string): PResult<Order, AppError> {
	return api.put(`/payment/${id}/orders`, { status: status })
}

/**
 * @param id - id of the customer
 * @return - Promise<[Order, null] | [null, E]>
 */
export async function createReceipt(id: string): PResult<Receipt, AppError> {
	return api.post(`/receipt`)
}

export async function findReceipt(id: string): PResult<Receipt, AppError> {
	return api.get(`/receipt/${id}`)
}

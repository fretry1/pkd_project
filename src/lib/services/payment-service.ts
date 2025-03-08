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
import { api } from "./api"

/**
 * Issues a payment for a given order with the provided order id and customer details.
 * @param orderId - The ID of the order.
 * @param customerDetails - The details of the customer making the payment.
 * @returns A PResult containing the Payment object or an AppError.
 */
export async function issuePayment(
	orderId: String,
	customerDetails: CustomerDetails
): PResult<Payment, AppError> {
	return await api.post("/payments", { orderId, customerDetails })
}

// NOT IMPLEMENTED IN BACKEND YET
/**
 * Creates customer details.
 * @returns A PResult containing the CustomerDetails object or an AppError.
 */
async function createCustomerDetails(): PResult<CustomerDetails, AppError> {
	return api.post("/payment")
}

/**
 * NOT IMPLEMENTED IN BACKEND YET
 * @param id - id of the customer
 * @return - Promise<[Order, null] | [null, E]>
 */
async function getOrderDetails(id: string): PResult<Order, AppError> {
	return api.get(`/payment/${id}/orders`)
}

/**
 * NOT IMPLEMENTED IN BACKEND YET
 * @param id - id of the customer
 * @param status - status of the specific payment of the customer
 * @return - Promise<[Order, null] | [null, E]>
 */
async function setPaymentStatus(id: string, status: string): PResult<Order, AppError> {
	return api.put(`/payment/${id}/orders`, { status: status })
}

/**
 * NOT IMPLEMENTED IN BACKEND YET
 * @param id - id of the customer
 * @return - Promise<[Order, null] | [null, E]>
 */
async function createReceipt(id: string): PResult<Receipt, AppError> {
	return api.post(`/receipt`)
}

// NOT IMPLEMENTED IN BACKEND YET
async function findReceipt(id: string): PResult<Receipt, AppError> {
	return api.get(`/receipt/${id}`)
}

export default {
	issuePayment
}

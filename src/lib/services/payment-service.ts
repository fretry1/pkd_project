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

export async function createPayment(
	orderID: String,
	customerDetails: CustomerDetails
): PResult<Payment, AppError> {
	return await api.post("/payments", {
		orderId: orderID,
		customerDetails: customerDetails
	})
}

// NOT IMPLEMENTED IN BACKEND YET
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

// TODO: implement
async function issuePayment(orderId: string, details: CustomerDetails): PResult<Order, AppError> {}

export default {}

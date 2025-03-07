export type Product = {
	id: string
	title: string
	description: string
	price: number
}

export type OrderItem = {
	product: Product
	quantity: number
}

export type Order = {
	id: string
	createdAt: string
	status: Status
	items: Map<string, OrderItem>
	total: number
}

export type Payment = {
	id: string
	orderId: string
	amount: number
	issuedAt: string
	customerDetails: CustomerDetails
}

export type CustomerDetails = {
	ssn: string
	name: string
	cardNumber: string
	country: string
	city: string
	postalCode: string
	address: string
}

export type Receipt = {
	order: Order
	payment: Payment
}

export type Status = keyof typeof STATUS

export const STATUS = {
	CREATED: "CREATED",
	PAYMENT_COMPLETE: "PAYMENT_COMPLETE",
	SHIPPED: "SHIPPED",
	IN_TRANSIT: "IN_TRANSIT",
	DELIVERED: "DELIVERED"
}

export type AppError = {
	code: string
	message: string
}

export type PResult<T, E> = Promise<Result<T, E>>
export type Result<T, E> = [T, null] | [null, E]

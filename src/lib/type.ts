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
	id: number
	created_at: number
	status: Status
	Items: Map<number, OrderItem>
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
	Ssn: string
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

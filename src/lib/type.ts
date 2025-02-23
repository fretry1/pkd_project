export type Product = {
	id: number
	titel: string
	description: string
	price: number
}

export type Order = {
	id: number
	created_at: number
	status: Status
	Items: Map<number, OrderItem>
	total: number
}

export type discount = {
	code: string
	amount: number
}

export type OrderItem = {
	product: number
	quantity: number
	discountCode: string
}

export type Status = keyof typeof STATUS

export const STATUS = {
	CREATED: 'CREATED',
	PLACED: 'PLACED',
	PAYMENT_COMPLETE: 'PAYMENT_COMPLETE',
	SHIPPED: 'SHIPPED',
	IN_TRANSIT: 'IN_TRANSIT',
	DELIVERED: 'DELIVERED'
}

export type Payment = {
	amount: number
	transactionDate: string
}

export type CustomerDetails = {
	SSN: string
	name: string
	cardNumber: string
	country: string
	city: string
	postalCode: string
	address: string
}

export type Receipt = {
	CustomerDetails: CustomerDetails
	Order: Order
	Payment: Payment
}

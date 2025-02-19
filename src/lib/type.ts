export type Product = {
	id: number;
	titel: string;
	description: string;
	price: number;
};

export type Order = {
	id: number;
	created_at: number;
	status: Status;
	products: Product[];
	total: number;
};

export type discount = {
	code: string;
	amount: number;
};

export type OrderItem = {
	product: number;
	quantity: number;
	discountCode: string;
};

export type Status = keyof typeof STATUS;

export const STATUS = {
	PLACED: 'PLACED',
	PAYMENT_COMPLETE: 'PAYMENT_COMPLETE',
	SHIPPED: 'SHIPPED',
	IN_TRANSIT: 'IN_TRANSIT',
	DELIVERED: 'DELIVIRED'
};

export type Payment = {
	amount: number;
	transactionDate: string;
};

export type CustomerDetails = {
	SSN: string;
	name: string;
	cardNumber: string;
	country: string;
	city: string;
	postalCode: string;
	address: string;
};

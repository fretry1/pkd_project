import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt
} from '$lib/type'

function create_empty_order() {}

function modify_order_products() {}

function modify_order_status() {}

function remove_order() {}

const banan: Product = {
	id: 5,
	titel: 'banan',
	description: 'en frukt',
	price: 10
}

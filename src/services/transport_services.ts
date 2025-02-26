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

function initate_transport() {}

function order_shipped() {}

function order_in_transit() {}

function order_delivered() {}

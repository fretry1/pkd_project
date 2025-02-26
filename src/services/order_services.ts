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

function create_empty_order(url: string,): Result{
    //take irl return 

}

async function getOrder (orderID: string)  {
    const [order, err] = await apiCommunicator.get<Order>(`/orders/${orderID}`) 
    if(err) {
    }

    return order
}

async function modifyOrderProducts(url: string, orderID: number, productID: number){
    const [order, err] = await apiCommunicator.put<Order>(`/orders/${orderID}/products/${productID}`) 
    if(err) {        
    }
     
}

function modify_order_status(url: string, ) {}

function remove_order() {}

const banan: Product = {
	id: "5",
	title: "banan",
	description: "en frukt",
	price: 10
}

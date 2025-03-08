import productService, { getAllProducts } from "./product-service"
import orderService from "./order-service"

console.log("Start")

test("Check product list length", async () => {
	const LOfProducts = (await productService.getAllProducts())[0]?.length
	expect(LOfProducts).toStrictEqual(49)
})

test("Create order", async () => {
	const order1 = await orderService.createOrder()
	const ordercopy1 = order1
	expect(ordercopy1[0]).toHaveProperty("createdAt")
})

test("Get all orders", async () => {
	await orderService.createOrder()
	await orderService.createOrder()
	const orders = await orderService.getAllOrders()
	console.log(orders[0]?.length)
	expect(orders[0]).toHaveLength(3)
})

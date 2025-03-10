import productService, { getAllProducts } from "./product-service"
import orderService from "./order-service"
import paymentService from "./payment-service"

console.log("Start")

// The Product list is expected to have 49 products
test("Check product list length", async () => {
	const LOfProducts = (await productService.getAllProducts())[0]?.length
	expect(LOfProducts).toStrictEqual(49)
})

// Create an order, which is expected to have a createdAt property
test("Create order", async () => {
	const order1 = await orderService.createOrder()
	const ordercopy1 = order1
	expect(ordercopy1[0]).toHaveProperty("createdAt")
})

// Get all orders, which is expected to have 3 orders
// (createOrder is called once in the previous test)
// Note: This test requires server reboot to pass
test("Get all orders", async () => {
	await orderService.createOrder()
	await orderService.createOrder()
	const orders = await orderService.getAllOrders()
	console.log(orders[0]?.length)
	expect(orders[0]).toHaveLength(3)
})

test("Remove ALL orders", async () => {
	const DelAll = await orderService.removeOrder("ALL")

	expect(DelAll).toStrictEqual(405) // Method Not Allowed
})

test("Issue Payment", async () => {
	const randomCustomer = {
		ssn: "12345 67890",
		name: "Copilot",
		cardNumber: "1234 5678 1234 5678",
		country: "Sweden",
		city: "UPPSALA",
		postalCode: "10001",
		address: "VSCode"
	}
	const issuePayment = await paymentService.issuePayment("1", randomCustomer)
	const err = {
		code: "OrderNotFound",
		message: "order not found"
	}

	expect(issuePayment[1]).toEqual(err) // Method Not Allowed
})

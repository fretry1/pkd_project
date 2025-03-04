<script lang="ts">
	import * as Order from "../services/order_services"
	import * as Payment from "../services/payment_services"
	import * as Product from "../services/product_services"
	import * as Transport from "../services/transport_services"
	import * as Ware from "../services/warehouse_services"

	// const createOrder = async () => {
	// 	let res = await fetch("http://localhost:8080/orders", {
	// 		method: "POST",
	// 		headers: {
	// 			accept: "application/json"
	// 		}
	// 	})
	// 	console.log(res.status)
	// 	if (!res.ok) {
	// 		json101 = `failed: res ${res.status}`
	// 		return
	// 	}
	// 	const obj = await res.json()
	// 	json101 = JSON.stringify(obj, null, 2)
	// }

	// const getAllOrders = async () => {
	// 	let res = await fetch("http://localhost:8080/orders", {
	// 		method: "GET",
	// 		headers: {
	// 			accept: "application/json"
	// 		}
	// 	})
	// 	console.log(res.status)
	// 	if (!res.ok) {
	// 		json102 = `failed: res ${res.status}`
	// 		return
	// 	}
	// 	const obj = await res.json()
	// 	json102 = JSON.stringify(obj, null, 2)
	// }

	// const DeleteOrder = async () => {
	// 	let res = await fetch(`http://localhost:8080/orders/${delOrderID}`, {
	// 		method: "DELETE",
	// 		headers: {
	// 			accept: "application/json"
	// 		}
	// 	})
	// 	console.log(res.status)
	// 	if (!res.ok) {
	// 		json103 = `failed: res ${res.status}`
	// 		return
	// 	}
	// 	const obj = await res.json()
	// 	json103 = JSON.stringify(obj, null, 2)
	// }

	// const DelALLOrder = async () => {
	// 	let res = await fetch(`http://localhost:8080/orders`, {
	// 		method: "DELETE",
	// 		headers: {
	// 			accept: "application/json"
	// 		}
	// 	})
	// 	console.log(res.status)
	// 	if (!res.ok) {
	// 		json104 = `failed: res ${res.status}`
	// 		return
	// 	}
	// 	const obj = await res.json()
	// 	json104 = JSON.stringify(obj, null, 2)
	// }

	const createEOrder = async () => {
		const order = await Order.createEmptyOrder()
		json101 = JSON.stringify(order, null, 2)
	}
	let json101 = $state("")

	const getAllOrders = async () => {
		const allorders = await Order.getAll()
		json102 = JSON.stringify(allorders, null, 2)
	}
	let json102 = $state("")

	let delOrderID = $state("")
	const DeleteOrder = async () => {
		const delorder = await Order.removeOrder(delOrderID)
		json103 = JSON.stringify(delorder, null, 2)
	}
	let json103 = $state("")

	const DelALLOrder = async () => {
		const delallorder = await Order.removeOrder("ALL")
		json104 = JSON.stringify(delallorder, null, 2)
	}
	let json104 = $state("")

	let json301 = $state("")
</script>

<h1>db.json testing</h1>
<div>
	<div></div>
</div>

<div class="row">
	<div class="column">
		<button onclick={() => createEOrder()}> Create empty order </button>

		<textarea bind:value={json101}></textarea>
	</div>

	<div class="column">
		<button onclick={() => getAllOrders()}> Get all orders </button>

		<textarea bind:value={json102}></textarea>
		<div>
			<button onclick={() => DeleteOrder()}> Delete order </button>
			<input bind:value={delOrderID} />
		</div>
		<button onclick={() => DelALLOrder()}> Delete ALL order </button>
	</div>

	<div class="column">
		<button onclick={() => null}> Create new customer detail </button>

		<textarea bind:value={json301}></textarea>
	</div>
</div>

<style>
	textarea {
		min-height: 300px;
		min-width: 400px;
	}
	.column {
		float: left;
		width: 30%;
	}
</style>

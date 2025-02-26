<script lang="ts">
	import * as Order from "../services/order_services"
	import * as Payment from "../services/payment_services"
	import * as Product from "../services/product_services"
	import * as Transport from "../services/transport_services"
	import * as Ware from "../services/warehouse_services"
	const createOrder = async () => {
		let res = await fetch("http://localhost:8080/orders", {
			method: "POST",
			headers: {
				accept: "application/json"
			}
		})
		console.log(res.status)
		if (!res.ok) {
			json1 = `failed: res ${res.status}`
			return
		}
		const obj = await res.json()
		json1 = JSON.stringify(obj, null, 2)
	}

	let json1 = $state("")

	const getAllOrders = async () => {
		let res = await fetch("http://localhost:8080/orders", {
			method: "GET",
			headers: {
				accept: "application/json"
			}
		})
		console.log(res.status)
		if (!res.ok) {
			json2 = `failed: res ${res.status}`
			return
		}
		const obj = await res.json()
		json2 = JSON.stringify(obj, null, 2)
	}

	let json2 = $state("")

	let deleteInput = ""

	const DeleteOrder = async () => {
		let res = await fetch(`http://localhost:8080/orders/${deleteInput}`, {
			method: "DELETE",
			headers: {
				accept: "application/json"
			}
		})
		console.log(res.status)
		if (!res.ok) {
			json3 = `failed: res ${res.status}`
			return
		}
		const obj = await res.json()
		json3 = JSON.stringify(obj, null, 2)
	}

	let json3 = $state("")

	const DeleteALLOrder = async () => {
		let res = await fetch(`http://localhost:8080/orders/.`, {
			method: "DELETE",
			headers: {
				accept: "application/json"
			}
		})
		console.log(res.status)
		if (!res.ok) {
			json4 = `failed: res ${res.status}`
			return
		}
		const obj = await res.json()
		json4 = JSON.stringify(obj, null, 2)
	}

	let json4 = $state("")
</script>

<h1>db.json testing</h1>
<div>
	<div></div>
</div>

<div class="row">
	<div class="column">
		<button onclick={() => createOrder()}> create order </button>

		<textarea bind:value={json1}></textarea>
	</div>

	<div class="column">
		<button onclick={() => getAllOrders()}> get all orders </button>

		<textarea bind:value={json2}></textarea>
		<div>
			<button onclick={() => DeleteOrder()}> delete order </button>
			<input bind:value={deleteInput} />
		</div>
		<button onclick={() => DeleteALLOrder()}> delete ALL order </button>
	</div>
</div>

<div></div>

<style>
	textarea {
		min-height: 300px;
		min-width: 400px;
	}
</style>

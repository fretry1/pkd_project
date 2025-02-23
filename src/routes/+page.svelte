<script lang="ts">

	const createOrder = async () => {
		let res = await fetch("http://localhost:8080/orders", {
			method: "POST",
			headers: {
				'accept': 'application/json'
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

	let json1 = $state('')

    const getAllOrders = async () => {
		let res = await fetch("http://localhost:8080/orders", {
			method: "GET",
			headers: {
				'accept': 'application/json'
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

	let json2 = $state('')

    let deleteInput = ""

    const DeleteOrder = async () => {
		let res = await fetch(`http://localhost:8080/orders/${deleteInput}`, {
			method: "DELETE",
			headers: {
				'accept': 'application/json'
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

	let json3 = $state('')





</script>

<h1>db.json testing</h1>
<div>
	<div>

	</div>
</div>








<div>

    <button
	    onclick={() => createOrder()}
    >
	    create order
    </button>

    <textarea
	bind:value={json1}
    ></textarea>

</div>

<div>

    <button
	    onclick={() => getAllOrders()}
    >
	    get all orders
    </button>

    <textarea
	bind:value={json2}
    ></textarea>

</div>

<div>
    <button

	onclick={() => DeleteOrder()}
    >
	delete order
    </button>
    <input
    bind:value={deleteInput}
    />   
</div>

















































<style>
    textarea {
      min-height: 300px;
      min-width: 400px;
    }
  </style>







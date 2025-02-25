<script lang="ts">

import type {
	Product,
	Order,
	OrderItem,
	STATUS,
	Payment,
	CustomerDetails,
	Receipt
} from "$lib/type"

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

    const getProductList = async () => {
		let res = await fetch("http://localhost:8080/products", {
			method: "GET",
			headers: {
				'accept': 'application/json'
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

	let json4 = $state('')

    

    let updateOrderInput = ""
    let updateProductsInput = ""

    const updateOrderProducts = async () => {
		let res = await fetch(`http://localhost:8080/orders/${updateOrderInput}/products/${updateProductsInput}`, {
			method: "PUT",
			headers: {
				'accept': 'application/json',
            
			},
            body: JSON.stringify({ quantity: 1 })
            
		})
		console.log(res.status)
		if (!res.ok) {
			json5 = `failed: res ${res.status}`
			return
		}
		const obj = await res.json()
		json5 = JSON.stringify(obj, null, 2)
	}

	let json5 = $state('')

    


</script>

<h1>db.json testing</h1>
<div>
	<div>

	</div>
</div>

<div>

    <p> Create new order</p>

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

    <p> Get all orders / delete order</p>

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

<div>

    <p> Get product list</p>

    <button
	    onclick={() => getProductList()}
    >
	    get products
    </button>

    <textarea
	bind:value={json4}
    ></textarea>

</div>

<div>
    <p> Update order with new products</p>
    
    <input type="text" bind:value={updateProductsInput} 
    placeholder="enter product ID"
    >

    <input type="text" bind:value={updateOrderInput} 
    placeholder="enter Order ID"
    >


    <button

	onclick={() => updateOrderProducts()}
    >
	Execute
    </button>  
 
    
    
    <textarea
	bind:value={json5}
    ></textarea>
</div>



















































<style>
    textarea {
      min-height: 300px;
      min-width: 400px;
    }
  </style>







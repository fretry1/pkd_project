<script lang="ts">

	import ProductService from "$lib/services/product-service"
	import OrderService from "$lib/services/order-service"
	import PaymentService from "$lib/services/payment-service"

	// Do not add any more stateful variables, use these
	let output = $state("")
	let input = $state("")

	const stringify = (obj: any): string => {
		return JSON.stringify(obj, null, 2)
	}

	// TODO: implement later
	const openCustomerDetailsModal = () => {
		// ...
	}

	//Hey Frey
	
</script>



<div class="wrapper">
	<div class="io">
		<textarea
			placeholder="output"
			bind:value={output}
		>
		</textarea>
	</div>

	<div class="input">
		<input
			placeholder="input"
			bind:value={input}
		/>

		<button onclick={async () => {		
			const [products, err] = await ProductService.getAllProducts()
			if (err) {
				output = stringify(err)
			}
			// TODO: sort products, for example by price
			if (products !== null){
			let sortedByPrice = products.sort((a, b) => a.price - b.price)
			output = stringify(sortedByPrice)
			}
		}}>
			Load Products
		</button>

		<button onclick={async () => {
		
		const [orders, err] = await OrderService.getAllOrders()
		if (err) {
			output = stringify(err)
		}
		output = stringify(orders)
		}}>
			Find All Orders
		</button>

		<button onclick={async () => {
		const [order, err] = await OrderService.createOrder()
		if (err) {
			output = stringify(err)
		}
		output = stringify(order)
		}}>
			Create Order
		</button>

		<!-- TODO: implement -->
		<button onclick={async () => {
		
		const [order, err] = await OrderService.setProductOnOrder(input)
		}}>
			Set Product On Order
		</button>

		<!-- TODO: implement -->
		<button onclick={async () => {

		}}>
			Remove Product From Order
		</button>

		<!-- TODO: implement (I (Frey) Will implement a modal window that pops up, prompting the user to enter CustomerDetails-->
		<button onclick={async () => {

		}}>
			Finalize Order
		</button>
	</div>

</div>

<style>
  * {
    box-sizing: border-box;
  }

  input, textarea {
    padding: 0.5rem;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    gap: .5rem;
  }

  .io {
    width: 100%;

    & textarea {
      min-width: 100%;
      max-width: 100%;
      min-height: 500px;
    }
  }

  .input {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: .5rem;

    & * {
      height: 100%;
    }
  }

  input, textarea, button {
    border: solid 1px rgb(198, 198, 198);
    border-radius: 0.5rem;
  }

  button {
    border: none;
    border-radius: 0.5rem;
    background-color: hsl(230, 99%, 65%);
    color: white;

    &:hover {
      background-color: hsl(230, 76%, 59%);
    }
  }
</style>
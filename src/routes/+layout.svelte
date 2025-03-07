<script lang="ts">
	import "../app.css"
	import Header from "$lib/components/Header.svelte"
	import type { AppError, Order, OrderItem, Product, Status } from "$lib/type"
	import ProductService from "$lib/services/product-service"
	import { onMount, setContext } from "svelte"
	import { setOrderStore } from "$lib/state/order-store.svelte.js"
	import { setProductStore } from "$lib/state/product-store.svelte"

	let { children } = $props()

	let error = $state<AppError|null>(null)

	const orderStore = setOrderStore()
	$inspect(orderStore.order)

	const productStore = setProductStore()
	$inspect("productStore: ", productStore.products)

	onMount(async () => {
		console.log("onMount")

		await orderStore.initializeNewOrder()
		const [products, err] = await ProductService.getAllProducts()
		if (err) {
			error = err
			return
		}

		await productStore.loadProducts(products)
		console.log("onMount finished")
	})

	$inspect(orderStore)
</script>


<Header {orderStore}/>
{#if error}
	<div class="error">
		{JSON.stringify(error, null, 2)}
	</div>
{:else}
	{@render children()}
{/if}


<style>
  .error {
    color: red;
    background-color: #ffeeee;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    white-space: pre-wrap;
  }
</style>

<script lang="ts">
	import "../app.css"
	import Header from "$lib/components/Header.svelte"
	import type { Order, OrderItem, Product, Status } from "$lib/type"
	import ProductService from "$lib/services/product-service"
	import { onMount } from "svelte"
	import { setOrderStore } from "$lib/state/order-store.svelte.js"

	let { children } = $props()

	// The current order, held inside a class wrapper to manage state
	const orderStore = setOrderStore()
</script>

<Header {orderStore}/>
{@render children()}

<style>

</style>
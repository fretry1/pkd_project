<script lang="ts">
	import type { AppError, Product } from "$lib/type"
	import { getContext, onMount } from "svelte"
	import ProductService from "$lib/services/product-service"
	import QtySelector from "$lib/components/QtySelector.svelte"
	import { PRODUCT_KEY, ProductStore } from "$lib/state/product-store.svelte"
	import { ORDER_KEY, OrderStore } from "$lib/state/order-store.svelte"
	import Filters from "$lib/components/Filters.svelte"

	let productStore = getContext<ProductStore>(PRODUCT_KEY)
	let orderStore = getContext<OrderStore>(ORDER_KEY)

	let activeFilter = $state("nameAsc")
</script>

<div class="wrapper">

	<Filters {productStore}/>

	<div class="grid">
		{#each productStore.products as product}
			{@render productListing(product)}
		{/each}
	</div>
</div>

{#snippet productListing(p: Product)}
	<div class="product">
		<h3 class="product-title">{p.title}</h3>
		<p class="product-price">BTC {p.price.toFixed(2)}</p>
		<p class="product-description">{p.description}</p>
		<QtySelector
			qty={orderStore.getQuantityInCart(p.id)}
			inc={() => {
				orderStore.incProduct(p.id)
			}}
			dec={() => {

			}}
		/>
	</div>
{/snippet}

<style>
  .wrapper {
    width: 100%;
    height: calc(100vh - 61px);
    padding: 1rem;
    overflow-y: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 1.5rem;
    width: 100%;
  }

  .product {
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    border-radius: 0.5rem;
    padding: 1rem;
    height: 16rem;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }

  .product:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .product-title {
    font-size: 1.2rem;
    margin: 0 0 0.5rem 0;
    color: #37271e;
  }

  .product-price {
    font-weight: bold;
    color: #4a8f29;
    margin: 0 0 0.5rem 0;
  }

  .product-description {
    font-size: 0.9rem;
    color: #555;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
  }
</style>
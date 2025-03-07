<script lang="ts">
	import type { OrderStore } from "$lib/state/order-store.svelte"
	import type { ProductStore } from "$lib/state/product-store.svelte"

	let { productStore }: { productStore: ProductStore } = $props()
</script>

<div class="filters">
	<div class="filter-container">
		<div class="filter-options">
			<button
				class="filter-btn {productStore.activeFilter === 'nameAsc' ? 'active' : ''}"
				onclick={() => productStore.setActiveFilter("nameAsc")}
			>
				Name (A-Z)
			</button>
			<button
				class="filter-btn {productStore.activeFilter === 'nameDesc' ? 'active' : ''}"
				onclick={() => productStore.setActiveFilter('nameDesc')}
			>
				Name (Z-A)
			</button>
			<button
				class="filter-btn {productStore.activeFilter === 'priceLow' ? 'active' : ''}"
				onclick={() => productStore.setActiveFilter('priceLow')}
			>
				Price (Low-High)
			</button>
			<button
				class="filter-btn {productStore.activeFilter === 'priceHigh' ? 'active' : ''}"
				onclick={() => productStore.setActiveFilter('priceHigh')}
			>
				Price (High-Low)
			</button>
		</div>
	</div>
</div>

<style>
  .filters {
    margin-bottom: 1rem;
    background-color: white;
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .filter-container {
    display: flex;
		justify-content: right;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .filter-options {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .filter-btn:hover {
    background-color: #eaeaea;
  }

  .filter-btn.active {
    background-color: #37271e;
    color: white;
    border-color: #37271e;
  }
</style>
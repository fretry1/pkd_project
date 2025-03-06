<script lang="ts">
	let { qty, inc, dec } = $props()
</script>

<div class="qty-selector">
	<button class="qty-btn" onclick={dec} aria-label="Decrease quantity">
		<span class="icon">-</span>
	</button>

	<span class="qty-display">{qty}</span>

	<button class="qty-btn" onclick={inc} aria-label="Increase quantity">
		<span class="icon">+</span>
	</button>
</div>

<style>
  .qty-selector {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    width: 100%;
    height: 36px;
  }

  .qty-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 36px;
    height: 36px;
    background-color: #f2f2f2;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 1.2rem;
    font-weight: bold;
    user-select: none;
  }

  .qty-btn:hover {
    background-color: #e8e8e8;
  }

  .qty-btn:active {
    background-color: #ddd;
  }

  .qty-display {
    display: inline-block;
    min-width: 32px;
    text-align: center;
    font-size: 0.9rem;
    padding: 0 8px;
    user-select: none;
    width: 100%;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
</style>
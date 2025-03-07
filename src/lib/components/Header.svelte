<script lang="ts">
	import type { Order} from "$lib/type.js"
	import type { OrderStore } from "$lib/state/order-store.svelte.js"
	import Button from "$lib/components/std/Button.svelte"
	import { getContext } from "svelte"

	let { orderStore }: { orderStore: OrderStore } = $props()

</script>


<header>
	<div class="container">

		<div class="left">
			<div class="logo">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630">
					<rect width="630" height="630" fill="#f7df1e" />
					<path
						d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z" />
				</svg>
			</div>
			<h2>shop</h2>
		</div>

		<div class="middle">

		</div>

		<div class="right">

			<button aria-label="checkout" onclick={() => {
				console.debug("checkout clicked")
			}}>
				<span class="checkout">
					<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M23.5 20h-14v-3h11.01c2.449 0 4.576-1.697 5.057-4.033l1.411-6.763A1.002 1.002 0 0 0 26 5H7.25l-.66-3.202A1 1 0 0 0 5.61 1H2a1 1 0 0 0 0 2h2.796L7.5 16.103v4.955c-.617.632-1 1.492-1 2.442 0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5a3.46 3.46 0 0 0-.351-1.5h7.202A3.46 3.46 0 0 0 20 23.5c0 1.93 1.57 3.5 3.5 3.5s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5Zm1.27-13-1.16 5.561C23.317 13.974 22.014 15 20.51 15H9.315L7.664 7h17.105ZM11.5 23.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5S9.173 22 10 22s1.5.673 1.5 1.5Zm12 1.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5Z"
							fill="currentColor"></path>
					</svg>
					<span>{orderStore.order.total ?? 0} BTC</span>
				</span>
			</button>
		</div>

	</div>
</header>


<style>
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--clr-bg-def);
    border-bottom: 1px solid var(--clr-gray-300);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem;
  }

  .logo {
    width: 40px;
    margin-right: 0.5rem;
  }

  .left, .middle, .right {
    width: 100%;
  }

  .left {
    display: flex; /* Use flexbox */
    justify-content: flex-start; /* Align items to the left horizontally */
    align-items: flex-end; /* Align items to the bottom vertically */
  }

	.right {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.checkout {
		display: flex;
		flex-direction: row;
		& span {
			margin: auto 1rem;
		}
	}

	button {
		background-color: hsl(53, 93%, 54%);
		border: none;
		padding: 0.5rem;
		border-radius: var(--border-radius-sm);
		&:hover {
      background-color: hsl(52, 92%, 45%);
		}
	}
</style>
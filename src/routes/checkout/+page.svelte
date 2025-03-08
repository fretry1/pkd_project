<script lang="ts">
	import Input from "$lib/components/std/Input.svelte";
	import Button from "$lib/components/std/Button.svelte";
	import type { CustomerDetails, Payment } from "$lib/type"
	import { getContext } from "svelte"
	import { ORDER_KEY, type OrderStore } from "$lib/state/order-store.svelte"
	import PaymentService from "$lib/services/payment-service"
	import { goto, invalidateAll } from "$app/navigation"
	import ReceiptModal from "$lib/components/ReceiptModal.svelte"

	const orderStore = getContext<OrderStore>(ORDER_KEY)

	let receipt = $state<Payment|null>(null)

	const onClose = async () => {
		await orderStore.initializeNewOrder()
		await goto("/products")
		console.debug("navigated to products and invalidated state")
	}

	// Form state
	let input = $state<CustomerDetails>({
		ssn: "",
		name: "",
		cardNumber: "",
		country: "",
		city: "",
		postalCode: "",
		address: ""
	});

	// Field validation
	let errors = $state({
		ssn: "",
		name: "",
		cardNumber: "",
		country: "",
		city: "",
		postalCode: "",
		address: ""
	});

	const imLazy = () => {
		input.ssn = "0011223344"
		input.name = "Foo"
		input.cardNumber = "1111222233334444"
		input.country = "Sweden"
		input.city = "Uppsala"
		input.postalCode = "75432"
		input.address = "Körvelgatan 2"
	}

	// Submit handler
	async function handleSubmit() {
		console.log("Submitting customer details");

		errors.ssn = "";
		errors.name = "";
		errors.cardNumber = "";
		errors.country = "";
		errors.city = "";
		errors.postalCode = "";
		errors.address = "";

		// Basic validation (would be more thorough in a real implementation)
		let hasErrors = false;

		if (input.name.length < 1 || input.name.length > 255) {
			errors.name = "Enter a valid name"
			hasErrors = true;
		}

		if (input.ssn.length != 10) {
			errors.ssn = "Enter a 10 digit ssn"
			hasErrors = true;
		}

		if (input.cardNumber.length != 16) {
			errors.cardNumber = "Enter a 16 digit card number"
			hasErrors = true;
		}

		if (input.country.length < 3) {
			errors.country = "Enter a country"
			hasErrors = true;
		}

		if (input.city.length < 3) {
			errors.city = "Enter a city"
			hasErrors = true;
		}

		if (input.postalCode.length < 5) {
			errors.postalCode = "Enter a 5 digit postal code"
			hasErrors = true;
		}

		if (input.address.length < 5) {
			errors.address = "Enter a valid address"
			hasErrors = true;
		}

		if (hasErrors) {
			return
		}

		console.log("Form is valid, processing order");
		const orderId = orderStore.order.id
		const details = $state.snapshot<CustomerDetails>(input)
		const [rec, err] = await PaymentService.issuePayment(orderId, details)
		if (err) {
			console.error("Failed to issue payment:", err)
			return
		}
		receipt = rec
	}
</script>

{#if receipt}
	<ReceiptModal {receipt} {onClose}/>
{/if}

<div class="checkout-container">
	<h1 class="checkout-title">Checkout</h1>

	<div class="checkout-content">
		<div class="checkout-form">
			<h2 onclick={imLazy}>Personal Information</h2>

			<div class="form-row">
				<div class="form-group">
					<label for="name">Full Name</label>
					<Input
						id="name"
						size="lg"
						bind:value={input.name}
						placeholder="Enter your full name"
						feedback={errors.name}
					/>
				</div>

				<div class="form-group">
					<label for="ssn">Social Security Number</label>
					<Input
						id="ssn"
						size="lg"
						bind:value={input.ssn}
						placeholder="Enter your SSN"
						feedback={errors.ssn}
					/>
				</div>
			</div>

			<h2>Payment Information</h2>
			<div class="form-group">
				<label for="cardNumber">Card Number</label>
				<Input
					id="cardNumber"
					size="lg"
					bind:value={input.cardNumber}
					placeholder="Enter your card number"
					feedback={errors.cardNumber}
				/>
			</div>

			<h2>Shipping Address</h2>
			<div class="form-row">
				<div class="form-group">
					<label for="country">Country</label>
					<Input
						id="country"
						size="lg"
						bind:value={input.country}
						placeholder="Country"
						feedback={errors.country}
					/>
				</div>

				<div class="form-group">
					<label for="city">City</label>
					<Input
						id="city"
						size="lg"
						bind:value={input.city}
						placeholder="City"
						feedback={errors.city}
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="postalCode">Postal Code</label>
					<Input
						id="postalCode"
						size="lg"
						bind:value={input.postalCode}
						placeholder="Postal Code"
						feedback={errors.postalCode}
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="address">Street Address</label>
				<Input
					id="address"
					size="lg"
					bind:value={input.address}
					placeholder="Street Address"
					feedback={errors.address}
				/>
			</div>
		</div>

		<div>
			<div class="card">
				<h2>Products</h2>
				<div class="product-list">
					{#each orderStore.order.items as [key, item]}
						<div class="product">
							<div class="left">
								<span>{item.quantity}</span>
								<span>{item.product.title}</span>
							</div>
								<div class="right">
									<span>{(item.product.price * item.quantity).toFixed(2)}</span>
								</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="card">
				<h2>Order Summary</h2>
				<div class="summary-content">
					<div class="summary-row">
						<span>Subtotal</span>
						<span>{orderStore.order.total.toFixed(2)}</span>
					</div>
					<div class="summary-row">
						<span>Shipping</span>
						<span>free</span>
					</div>
					<div class="summary-row">
						<span>Tax</span>
						<span>{(orderStore.order.total / 12.5).toFixed(2)}</span>
					</div>
					<div class="summary-divider"></div>
					<div class="summary-row total">
						<span>Total</span>
						<span>{orderStore.order.total.toFixed(2)} BTC</span>
					</div>
				</div>

				<div class="actions">
					<Button width="100%" size="lg" variant="primary" onclick={handleSubmit}>
						Complete Purchase
					</Button>
				</div>
			</div>
		</div>

	</div>
</div>

<style>
  .checkout-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .checkout-title {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .checkout-content {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 2rem;
  }

  .checkout-form {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .checkout-form h2 {
    font-size: 1.25rem;
    margin: 1.5rem 0 1rem;
    color: #333;
  }

  .checkout-form h2:first-of-type {
    margin-top: 0;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    gap: 1rem;
  }

  .card {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    align-self: start;
		margin-bottom: 2rem;
  }

  .card h2 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  .summary-content {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.95rem;
  }

  .summary-divider {
    height: 1px;
    background-color: #eaeaea;
    margin: 0.5rem 0;
  }

  .total {
    font-weight: 700;
    font-size: 1.1rem;
    padding-top: 0.5rem;
  }

	.product {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-bottom: 0.25rem;
	}

  @media (max-width: 900px) {
    .checkout-content {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
<script lang="ts">
	import Input from "$lib/components/std/Input.svelte";
	import Button from "$lib/components/std/Button.svelte";
	import type { CustomerDetails } from "$lib/type";

	// Form state
	let customerDetails = $state<CustomerDetails>({
		Ssn: "",
		name: "",
		cardNumber: "",
		country: "",
		city: "",
		postalCode: "",
		address: ""
	});

	// Field validation
	let formErrors = $state({
		Ssn: false,
		name: false,
		cardNumber: false,
		country: false,
		city: false,
		postalCode: false,
		address: false
	});

	// Submit handler
	function handleSubmit() {
		console.log("Submitting customer details:", customerDetails);

		// Basic validation (would be more thorough in a real implementation)
		let hasErrors = false;
		for (const [key, value] of Object.entries(customerDetails)) {
			const isEmpty = !value.trim();
			formErrors[key as keyof typeof formErrors] = isEmpty;
			if (isEmpty) hasErrors = true;
		}

		if (!hasErrors) {
			console.log("Form is valid, processing order");
			// Here you would call your order processing function
		} else {
			console.log("Form has errors, please correct them");
		}
	}

	// Input change handler helper
	function handleInput(field: keyof CustomerDetails, value: string) {
		customerDetails[field] = value;
		formErrors[field] = false; // Clear error when user types
		console.log(`Updated ${field}:`, value);
	}
</script>

<div class="checkout-container">
	<h1 class="checkout-title">Checkout</h1>

	<div class="checkout-content">
		<div class="checkout-form">
			<h2>Personal Information</h2>

			<div class="form-row">
				<div class="form-group">
					<label for="name">Full Name</label>
					<Input
						id="name"
						size="lg"
						value={customerDetails.name}
						placeholder="Enter your full name"
						feedback={formErrors.name}
					/>
				</div>

				<div class="form-group">
					<label for="ssn">Social Security Number</label>
					<Input
						id="ssn"
						size="lg"
						value={customerDetails.Ssn}
						placeholder="Enter your SSN"
						feedback={formErrors.Ssn}
					/>
				</div>
			</div>

			<h2>Payment Information</h2>
			<div class="form-group">
				<label for="cardNumber">Card Number</label>
				<Input
					id="cardNumber"
					size="lg"
					value={customerDetails.cardNumber}
					placeholder="Enter your card number"
					feedback={formErrors.cardNumber}
				/>
			</div>

			<h2>Shipping Address</h2>
			<div class="form-row">
				<div class="form-group">
					<label for="country">Country</label>
					<Input
						id="country"
						size="lg"
						value={customerDetails.country}
						placeholder="Country"
						feedback={formErrors.country}
					/>
				</div>

				<div class="form-group">
					<label for="city">City</label>
					<Input
						id="city"
						size="lg"
						value={customerDetails.city}
						placeholder="City"
						feedback={formErrors.city}
					/>
				</div>
			</div>

			<div class="form-row">
				<div class="form-group">
					<label for="postalCode">Postal Code</label>
					<Input
						id="postalCode"
						size="lg"
						value={customerDetails.postalCode}
						placeholder="Postal Code"
						feedback={formErrors.postalCode}
					/>
				</div>
			</div>

			<div class="form-group">
				<label for="address">Street Address</label>
				<Input
					id="address"
					size="lg"
					value={customerDetails.address}
					placeholder="Street Address"
					feedback={formErrors.address}
				/>
			</div>

			<div class="actions">
				<Button size="lg" variant="secondary" onclick={() => console.log("Cancel clicked")}>
					Back to Cart
				</Button>
				<Button size="lg" variant="primary" onclick={handleSubmit}>
					Complete Purchase
				</Button>
			</div>
		</div>

		<div class="order-summary">
			<h2>Order Summary</h2>
			<div class="summary-content">
				<div class="summary-row">
					<span>Subtotal</span>
					<span>$149.99</span>
				</div>
				<div class="summary-row">
					<span>Shipping</span>
					<span>$9.99</span>
				</div>
				<div class="summary-row">
					<span>Tax</span>
					<span>$15.00</span>
				</div>
				<div class="summary-divider"></div>
				<div class="summary-row total">
					<span>Total</span>
					<span>$174.98</span>
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

  .order-summary {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    align-self: start;
  }

  .order-summary h2 {
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

  @media (max-width: 900px) {
    .checkout-content {
      grid-template-columns: 1fr;
    }

    .form-row {
      grid-template-columns: 1fr;
    }
  }
</style>
<script lang="ts">
	import Input from "$lib/components/std/Input.svelte";
	import Button from "$lib/components/std/Button.svelte";
	import type { CustomerDetails } from "$lib/type";

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

	// Submit handler
	function handleSubmit() {
		console.log("Submitting customer details:", input);

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

		if (!hasErrors) {
			console.log("Form is valid, processing order");
			// Here you would call your order processing function
		} else {
			console.log("Form has errors, please correct them");
		}
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

			<div class="actions">
				<Button size="lg" variant="secondary" onclick={() => console.log("Cancel clicked")}>
					Back to Cart
				</Button>
				<Button size="lg" variant="primary" onclick={handleSubmit}>
					Complete Purchase
				</Button>
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
<script lang="ts">
	import type { Receipt } from "$lib/type"
	import Button from "$lib/components/std/Button.svelte"

	const { receipt, onClose }: { receipt: Receipt, onClose: () => void } = $props()

	const printReceipt = () => console.log("Receipt:\n", $state.snapshot(receipt))
</script>

<div class="modal-backdrop">
	<div class="modal-container">
		<div class="modal-content">
			<div class="modal-header">
				<h2>Payment Receipt</h2>
				<button class="close-button" onclick={onClose}>×</button>
			</div>

			<div class="receipt-container">
				<div class="receipt-header">
					<div class="company-logo">
						<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect width="24" height="24" rx="12" fill="#37271E" />
							<path d="M7 12H17M17 12L13 8M17 12L13 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="company-name">Your Store Name</div>
				</div>

				<div class="receipt-info">
					<div class="info-row">
						<div class="info-label">Payment ID</div>
						<div class="info-value id-value">{receipt.payment.id}</div>
					</div>

					<div class="info-row">
						<div class="info-label">Order ID</div>
						<div class="info-value id-value">{receipt.payment.orderId}</div>
					</div>

					<div class="info-row">
						<div class="info-label">Date</div>
						<div class="info-value">{receipt.payment.issuedAt}</div>
					</div>

					<div class="info-row payment-row">
						<div class="info-label">Amount</div>
						<div class="info-value amount-value">{(receipt.payment.amount).toFixed(2)} BTC</div>
					</div>
				</div>

				<div class="receipt-details">
					<h3>Customer Details</h3>
					<div class="details-content">
						<div class="details-row">
							<div class="details-label">Name:</div>
							<div class="details-value">{receipt.payment.customerDetails.name}</div>
						</div>

						<div class="details-row">
							<div class="details-label">Address:</div>
							<div class="details-value">
								{receipt.payment.customerDetails.address},
								{receipt.payment.customerDetails.city},
								{receipt.payment.customerDetails.postalCode},
								{receipt.payment.customerDetails.country}
							</div>
						</div>
					</div>
				</div>

				<div class="receipt-footer">
					<div class="thank-you">Thank you for your purchase!</div>
					<div class="receipt-id">Receipt #{receipt.payment.id.substring(0, 8)}</div>
				</div>
			</div>

			<div class="modal-actions">
				<Button variant="secondary" onclick={() => printReceipt()}>
					Print Receipt
				</Button>
				<Button variant="primary" onclick={onClose}>
					Close
				</Button>
			</div>
		</div>
	</div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-container {
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 550px;
    max-height: 90vh;
    overflow-y: auto;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .modal-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #37271E;
    margin: 0;
  }

  .close-button {
    background: none;
    border: none;
    font-size: 1.75rem;
    cursor: pointer;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
</style>
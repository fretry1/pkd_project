<script lang="ts">

	const createOrder = async () => {
		let res = await fetch("http://localhost:8080/orders", {
			method: "POST",
			headers: {
				'accept': 'application/json'
			}
		})
		console.log(res.status)
		if (!res.ok) {
			json = `failed: res ${res.status}`
			return
		}
		const obj = await res.json()
		json = JSON.stringify(obj, null, 2)
	}

	let json = $state('')

</script>

<h1>db.json testing</h1>
<div>
	<div>

	</div>
</div>

<button
	onclick={() => createOrder()}
>
	send fetch request
</button>

<textarea
	bind:value={json}
></textarea>


<style>
  textarea {
    min-height: 300px;
    min-width: 400px;
  }
</style>
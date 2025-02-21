<script>

	const sendFetch = () => {
			// implement fetch
		json = "this will be the fetched json"
	}

	let json = $state("")

</script>

<h1>db.json testing</h1>

<button
	onclick={sendFetch}
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
<script lang="ts"> 

	const sendFetch = async () => {
        console.debug("inside")
			// implement fetch
        let res = await fetch("https://my-json-server.typicode.com/fretry1/pkd_project/example", {
            method: "GET",
            headers: {
                "accept" : "application/json"
            }
        })
        if (!res.ok) {             
            json = `failed: res ${res.status}` 
            return      
        }

        console.debug("afterRes")

        const obj = await res.json

        console.debug("afterObj")

        

            
        
		json = JSON.stringify(obj)
	}

	let json = $state("")

</script>

<h1>db.json testing</h1>

<button
	onclick={() => sendFetch()}
    
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
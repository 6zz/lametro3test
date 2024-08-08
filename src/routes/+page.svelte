<script lang="ts">
	let refForm: HTMLFormElement;
	/**
	 *
	 * @param e
	 */
	async function handleFile(e) {
		const formData = new FormData(refForm);
        try {
            const response = await fetch('http://localhost:8888/api/upload', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('File upload failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }        
	}
</script>

<h1>Test Netlify blob</h1>
<form bind:this={refForm} method="post" action="/api/upload" enctype="multipart/form-data">
	<div>
		<label for="file"
			>Choose file to upload
			<input type="file" id="file" name="file" />
		</label>
	</div>
	<div>
		<button on:click|preventDefault={handleFile}>Submit</button>
	</div>
</form>

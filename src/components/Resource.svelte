<script>
	export let title = "Default Title";
	export let icon;
	export let open = false;

	function handleClick() {
		open = !open;
	}
</script>

<div>
	<!-- Slot allows you to pass HTML content to the component -->
	<slot></slot>

	<h2>{title}</h2>
	<h3>isopen: {open}</h3>
	<button on:click={handleClick}>Click Me</button>
</div>

<style>
    h2 {
        color: green;
    }
    button {
        background-color: orange;
        border: none;
        padding: 10px;
    }
</style>

<template>
	<div class="tool-selector">
		<span class="tool-icon"><b-icon-pencil-fill /></span>
		<span class="tool-icon"><b-icon-eraser-fill /></span>
		<span class="tool-icon"><b-icon-paint-bucket /></span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'ToolSelector',
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tool-selector {
	position: absolute;

	margin: 0 auto;
	right: 0;
	left: 0;
	bottom: 50px;
	width: fit-content;

	background-color: white;
	border: 1px solid black;
	border-radius: 1rem;
	z-index: 1;
}

.tool-icon {
	font-size: 2rem;
	padding: 1rem;
}

.tool-icon:hover {
	color: lightblue;
	cursor: pointer;
}
</style>

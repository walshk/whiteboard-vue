<template></template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'BaseWhiteboard',
	data() {
		return {
			currentDrawing: undefined,
		};
	},
	methods: {
		beginDrawing(): void {
			// TODO beginDrawing
		},
		stopDrawing(): void {
			// TODO stopDrawing
		},
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

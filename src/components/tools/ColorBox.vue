<template>
	<div class="color-box" :style="{ '--color': color }" @click="onClick"></div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'ColorBox',
	props: {
		color: String,
	},
	methods: {
		onClick() {
			this.$emit('selectColor');
		},
	},
	computed: {},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.color-box {
	width: 2rem;
	height: 2rem;
	border-radius: 0.25rem;
	background-color: var(--color);
	border: 0px solid black;
	transition: all 0.2s ease-in-out;
}

.color-box:hover {
	cursor: pointer;
	filter: opacity(50%);
}
</style>

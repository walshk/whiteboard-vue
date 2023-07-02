<template>
	<canvas ref="canvas"></canvas>
</template>

<script lang="ts">
import Vue from 'vue';
import { Canvas } from '../../classes/canvas';
import { Drawing } from '../../classes/drawing';

export default Vue.extend({
	name: 'BaseWhiteboard',
	data() {
		return {
			canvas: undefined as any,
			currentDrawing: undefined,
		};
	},
	mounted() {
		if (this.canvasContext instanceof CanvasRenderingContext2D) {
			this.canvas = new Canvas(this.canvasContext);
		}
	},
	methods: {
		beginDrawing(): void {
			// TODO beginDrawing
		},
		stopDrawing(): void {
			// TODO stopDrawing
		},
	},
	computed: {
		canvasContext(): CanvasRenderingContext2D | null {
			const canvas = this.$refs.canvas as HTMLCanvasElement;
			return canvas.getContext('2d');
		},
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

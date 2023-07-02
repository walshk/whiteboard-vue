<template>
	<div class="base-whiteboard">
		<h1>Whiteboard</h1>
		<canvas @click="testDraw" id="canvas" ref="canvas"></canvas>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Canvas } from '../../classes/canvas';
import { Drawing } from '../../classes/drawing';
import { Point } from '../../classes/point';

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
		testDraw(event: PointerEvent): void {
			// testing draw
			console.log('received event', event);
			const canvas = this.canvas as Canvas;
			const point = new Point(event.pageX, event.pageY);
			const drawing = new Drawing(0, 20, 'blue');
			drawing.points = [point];
			canvas.drawings = [drawing];
			canvas.redraw();
		},
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
<style scoped>
#canvas {
	background-color: lightgrey;
	width: 90%;
	height: 90%;
}
</style>

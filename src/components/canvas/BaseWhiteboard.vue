<template>
	<div class="base-whiteboard" ref="whiteboard">
		<canvas
			class="canvas"
			ref="canvas"
			:width="canvasDimensions.width"
			:height="canvasDimensions.height"
			@mousedown="onMouseDown"
			@mousemove="onMouseMove"
			@mouseup="onMouseUp"
		></canvas>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Canvas } from '../../classes/canvas';
import { CanvasSettings } from '@/interfaces/canvasSettings';

export default Vue.extend({
	name: 'BaseWhiteboard',
	data() {
		return {
			canvas: null as Canvas | null,
			canvasDimensions: {
				width: 0,
				height: 0,
			},
			mouseButtons: {
				LEFT: 0,
				MIDDLE: 1,
				RIGHT: 2,
			},
			isDrawing: false,
			isErasing: false,
		};
	},
	mounted() {
		this.$nextTick(() => {
			if (this.canvasContext instanceof CanvasRenderingContext2D) {
				this.canvas = new Canvas(this.canvasContext, this.canvasSettings);
			}

			window.addEventListener('resize', this.resizeCanvas);
			this.resizeCanvas();
		});
	},
	updated() {
		this.canvas?.clear();
		this.canvas?.redraw();
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeCanvas); // same function reference
	},
	methods: {
		onMouseDown(event: MouseEvent): void {
			// TODO change to use currentTool as switch instead of button type
			switch (event.button) {
				case this.mouseButtons.LEFT:
					this.beginDrawing(event);
					break;
				case this.mouseButtons.MIDDLE:
					event.preventDefault();
					this.beginErasing(event);
					break;
				default:
					return;
			}
		},
		onMouseMove(event: MouseEvent): void {
			if (this.isDrawing) {
				this.continueDrawing(event);
			} else if (this.isErasing) {
				this.beginErasing(event);
			}
		},
		onMouseUp(event: MouseEvent): void {
			// TODO change to use currentTool as switch instead of button type
			switch (event.button) {
				case this.mouseButtons.LEFT:
					if (this.isDrawing) {
						this.stopDrawing();
					}
					break;
				case this.mouseButtons.MIDDLE:
					if (this.isErasing) {
						this.stopErasing();
					}
					break;
				default:
					return;
			}
		},
		beginDrawing(event: MouseEvent): void {
			this.isDrawing = true;
			this.canvas?.startNewDrawing();
			this.canvas?.addPointToCurrentDrawing(event.x, event.y);
		},
		continueDrawing(event: MouseEvent): void {
			this.canvas?.addPointToCurrentDrawing(event.x, event.y);
		},
		stopDrawing(): void {
			if (!this.isDrawing) return;
			this.isDrawing = false;
			this.canvas?.saveCurrentDrawing();
		},
		beginErasing(event: MouseEvent): void {
			this.isErasing = true;
			this.canvas?.eraseAt(event.x, event.y);
		},
		stopErasing(): void {
			this.isErasing = false;
		},
		resizeCanvas(): void {
			const whiteboard = this.$refs.whiteboard as HTMLElement;
			this.canvasDimensions.width = whiteboard.offsetWidth;
			this.canvasDimensions.height = whiteboard.offsetHeight;
		},
	},
	computed: {
		canvasContext(): CanvasRenderingContext2D {
			const canvas = this.$refs.canvas as HTMLCanvasElement;
			return canvas.getContext('2d', {
				willReadFrequently: true,
			}) as CanvasRenderingContext2D;
		},
		canvasSettings(): CanvasSettings {
			return this.$store.getters.settings;
		},
	},
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.base-whiteboard {
	width: 100%;
	height: 100%;
}

.canvas {
	position: absolute;
	background-color: lightblue;
	height: 100%;
	width: 100%;
	z-index: 0;
}
</style>

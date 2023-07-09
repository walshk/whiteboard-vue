<template>
	<div class="base-whiteboard" ref="whiteboard">
		<canvas
			class="canvas"
			ref="canvas"
			:style="canvasStyles"
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
import { mapGetters } from 'vuex';

import { Canvas } from '../../classes/canvas';
import { CanvasSettings } from '@/interfaces/canvasSettings';
import { WhiteboardTool } from '@/enums/whiteboardTool';
import { StyleValue } from 'vue/types/jsx';

export default Vue.extend({
	name: 'BaseWhiteboard',
	data() {
		return {
			canvas: null as Canvas | null,
			canvasDimensions: {
				width: 0,
				height: 0,
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
			switch (this.currentTool) {
				case WhiteboardTool.Draw:
					this.beginDrawing(event);
					break;
				case WhiteboardTool.Erase:
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
		onMouseUp(): void {
			switch (this.currentTool) {
				case WhiteboardTool.Draw:
					if (this.isDrawing) {
						this.stopDrawing();
					}
					break;
				case WhiteboardTool.Erase:
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
		...mapGetters({
			currentTool: 'currentTool',
			backdropColor: 'backdropColor',
		}),
		canvasContext(): CanvasRenderingContext2D {
			const canvas = this.$refs.canvas as HTMLCanvasElement;
			return canvas.getContext('2d', {
				willReadFrequently: true,
			}) as CanvasRenderingContext2D;
		},
		canvasSettings(): CanvasSettings {
			return this.$store.getters.settings;
		},
		canvasStyles(): StyleValue {
			return {
				'--backdrop-color': this.backdropColor,
			};
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
	background-color: var(--backdrop-color);
	height: 100%;
	width: 100%;
	z-index: 0;
}
</style>

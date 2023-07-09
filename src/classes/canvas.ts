import { v4 as uuidv4 } from 'uuid';

import { CanvasSettings } from '../interfaces/canvasSettings';
import { Drawing } from './drawing';
import { Point } from './point';
import { NearestDrawingData } from '@/interfaces/nearestDrawingData';

const MAX_ERASE_PROXIMITY = 10;
export class Canvas {
	constructor(ctx: CanvasRenderingContext2D, settings: CanvasSettings) {
		this.canvasId = uuidv4(); // use as prefix for drawing IDs

		this.ctx = ctx;
		this.settings = settings;
		this.drawings = [] as Drawing[];
		this.currentDrawing = new Drawing(
			this.canvasId,
			settings.radius,
			settings.color
		);
		this.boundingRect = ctx.canvas.getBoundingClientRect();
	}

	ctx: CanvasRenderingContext2D;
	drawings: Drawing[];
	currentDrawing: Drawing;
	settings: CanvasSettings;
	canvasId: string;
	boundingRect: DOMRect;

	export(): string {
		return JSON.stringify(this.drawings);
	}

	clear(): void {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	redraw(): void {
		for (let i = 0; i < this.drawings.length; i++) {
			this.drawings[i].draw(this.ctx);
		}
	}

	startNewDrawing(): void {
		this.currentDrawing = new Drawing(
			this.canvasId,
			this.settings.radius,
			this.settings.color
		);
	}

	addPointToCurrentDrawing(x: number, y: number): void {
		const { width, height } = this.ctx.canvas.getBoundingClientRect();
		const point = new Point(x, y, width, height);
		this.currentDrawing.addPoint(this.ctx, point);
	}

	saveCurrentDrawing(): void {
		this.drawings.push(this.currentDrawing);
	}

	eraseAt(x: number, y: number): void {
		if (this.drawings.length === 0) return;

		const { nearestDrawing, nearestDistance } = this.findNearestDrawingTo(x, y);
		if (nearestDistance > MAX_ERASE_PROXIMITY) return;

		const indexToRemove: number = this.drawings.findIndex(
			(drawing: Drawing) => {
				return drawing.id === nearestDrawing.id;
			}
		);

		if (indexToRemove !== -1) {
			this.drawings.splice(indexToRemove, 1);
			this.clear();
			this.redraw();
		}
	}

	findNearestDrawingTo(x: number, y: number): NearestDrawingData {
		const myDrawings = this.drawings.filter((drawing: Drawing) => {
			return drawing.id.startsWith(`${this.canvasId}/`);
		});

		const nearestDrawing = myDrawings.reduce(
			(prev: Drawing, curr: Drawing): Drawing => {
				const distanceToPrev = prev.calculateDistanceFrom(x, y);
				const distanceToCurr = curr.calculateDistanceFrom(x, y);

				return distanceToPrev < distanceToCurr ? prev : curr;
			}
		);
		const nearestDistance = nearestDrawing.calculateDistanceFrom(x, y);
		return {
			nearestDrawing,
			nearestDistance,
		};
	}

	updateSettings(settings: CanvasSettings): void {
		this.settings = settings;
	}
}

import { Drawing } from './drawing';

export class Canvas {
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.drawings = [] as Drawing[];
	}

	ctx: CanvasRenderingContext2D;
	drawings: Drawing[];

	clear(): void {
		this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	redraw(): void {
		for (let i = 0; i < this.drawings.length; i++) {
			this.drawings[i].draw(this.ctx);
		}
	}

	eraseAt(x: number, y: number): void {
		const nearestDrawing: Drawing = this.findNearestDrawingTo(x, y);
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

	findNearestDrawingTo(x: number, y: number): Drawing {
		const closestDrawing = this.drawings.reduce(
			(prev: Drawing, curr: Drawing): Drawing => {
				const distanceToPrev = prev.calculateDistanceFrom(x, y);
				const distanceToCurr = curr.calculateDistanceFrom(x, y);

				return distanceToPrev < distanceToCurr ? prev : curr;
			}
		);
		return closestDrawing;
	}
}

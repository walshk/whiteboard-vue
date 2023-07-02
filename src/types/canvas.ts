import { Drawing } from './drawing';

export class Canvas {
	constructor(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.drawings = [] as Drawing[];
	}

	ctx: CanvasRenderingContext2D;
	drawings: Drawing[];
}

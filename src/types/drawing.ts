import { Point } from './point';

export class Drawing {
	constructor() {
		this.points = [] as Point[];
	}

	points: Point[];

	draw(ctx: CanvasRenderingContext2D, radius: number, color?: string): void {
		for (let i = 0; i < this.points.length; i++) {
			this.points[i].render(ctx, radius, color);
		}
	}
}
